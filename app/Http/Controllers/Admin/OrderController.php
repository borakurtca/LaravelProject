<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Tüm siparişlerin listesi (admin).
     */
    public function index(Request $request)
    {
        $query = Order::with('user')->withCount('items');

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('shipping_name', 'like', "%{$search}%");
            });
        }

        $orders = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'statuses' => Order::STATUSES,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Sipariş detayı (admin).
     */
    public function show(Order $order)
    {
        $order->load('items.product', 'user');

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'statuses' => Order::STATUSES,
        ]);
    }

    /**
     * Sipariş durumunu güncelle.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        return back()->with('success', 'Sipariş durumu güncellendi.');
    }
}
