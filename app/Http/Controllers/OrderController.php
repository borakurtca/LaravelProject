<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Checkout (sipariş oluşturma) formu.
     */
    public function create(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Sepetiniz boş.');
        }

        $items = [];
        $total = 0;

        foreach ($cart as $productId => $cartItem) {
            $product = Product::find($productId);

            if (! $product) {
                continue;
            }

            $subtotal = $product->price * $cartItem['quantity'];
            $total += $subtotal;

            $items[] = [
                'product' => $product,
                'quantity' => $cartItem['quantity'],
                'subtotal' => $subtotal,
            ];
        }

        return Inertia::render('Orders/Create', [
            'items' => $items,
            'total' => $total,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Sipariş oluştur (checkout işlemi).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_name' => 'required|string|max:255',
            'shipping_address' => 'required|string|max:1000',
            'shipping_phone' => 'required|string|max:50',
            'payment_method' => 'required|string|in:Kapıda Ödeme,Kredi Kartı,Banka Havalesi',
            'notes' => 'nullable|string|max:1000',
        ]);

        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Sepetiniz boş.');
        }

        $order = DB::transaction(function () use ($cart, $validated, $request) {
            $total = 0;
            $orderItemsData = [];

            foreach ($cart as $productId => $cartItem) {
                $product = Product::find($productId);

                if (! $product) {
                    continue;
                }

                $quantity = min($cartItem['quantity'], $product->stock);

                if ($quantity <= 0) {
                    continue;
                }

                $subtotal = $product->price * $quantity;
                $total += $subtotal;

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $quantity,
                ];

                $product->decrement('stock', $quantity);
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'order_number' => 'BK-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'status' => 'pending',
                'total' => $total,
                'shipping_name' => $validated['shipping_name'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_phone' => $validated['shipping_phone'],
                'payment_method' => $validated['payment_method'],
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            return $order;
        });

        $request->session()->forget('cart');

        return redirect()->route('orders.show', $order)->with('success', 'Siparişiniz başarıyla oluşturuldu!');
    }

    /**
     * Kullanıcının kendi siparişlerinin listesi.
     */
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->withCount('items')
            ->latest()
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Sipariş detayı.
     */
    public function show(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id && ! $request->user()->is_admin) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }
}
