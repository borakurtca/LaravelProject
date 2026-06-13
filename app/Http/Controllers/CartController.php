<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Sepet sayfasını göster.
     */
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        $items = [];
        $total = 0;

        foreach ($cart as $productId => $cartItem) {
            $product = Product::with('category')->find($productId);

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

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $total,
        ]);
    }

    /**
     * Sepete ürün ekle.
     */
    public function add(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => 'nullable|integer|min:1|max:99',
        ]);

        $quantity = $validated['quantity'] ?? 1;

        $cart = $request->session()->get('cart', []);

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $quantity;
        } else {
            $cart[$product->id] = [
                'quantity' => $quantity,
            ];
        }

        // Stok aşımını engelle
        if ($cart[$product->id]['quantity'] > $product->stock) {
            $cart[$product->id]['quantity'] = $product->stock;
        }

        $request->session()->put('cart', $cart);

        return back()->with('success', "{$product->name} sepete eklendi.");
    }

    /**
     * Sepetteki ürün adedini güncelle.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $cart = $request->session()->get('cart', []);

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] = min($validated['quantity'], $product->stock);
            $request->session()->put('cart', $cart);
        }

        return back();
    }

    /**
     * Sepetten ürün kaldır.
     */
    public function remove(Request $request, Product $product)
    {
        $cart = $request->session()->get('cart', []);

        unset($cart[$product->id]);

        $request->session()->put('cart', $cart);

        return back()->with('success', 'Ürün sepetten kaldırıldı.');
    }
}
