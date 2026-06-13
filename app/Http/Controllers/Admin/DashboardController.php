<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Admin paneli - genel istatistikler ve grafikler.
     */
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'total_orders' => Order::count(),
            'total_users' => User::where('is_admin', false)->count(),
            'total_revenue' => Order::where('status', '!=', 'cancelled')->sum('total'),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'low_stock_products' => Product::where('stock', '<=', 5)->count(),
        ];

        // Son 7 günün sipariş ve gelir grafiği
        $salesChart = collect(range(6, 0))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo);

            return [
                'date' => $date->format('d.m'),
                'orders' => Order::whereDate('created_at', $date)->count(),
                'revenue' => (float) Order::whereDate('created_at', $date)
                    ->where('status', '!=', 'cancelled')
                    ->sum('total'),
            ];
        })->values();

        // Sipariş durumuna göre dağılım
        $orderStatusChart = Order::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(fn ($row) => [
                'status' => Order::STATUSES[$row->status] ?? $row->status,
                'count' => $row->count,
            ]);

        // En çok satılan ürünler
        $topProducts = DB::table('order_items')
            ->select('product_name', DB::raw('SUM(quantity) as total_sold'), DB::raw('SUM(price * quantity) as total_revenue'))
            ->groupBy('product_name')
            ->orderByDesc('total_sold')
            ->take(5)
            ->get();

        $recentOrders = Order::with('user')->latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'salesChart' => $salesChart,
            'orderStatusChart' => $orderStatusChart,
            'topProducts' => $topProducts,
            'recentOrders' => $recentOrders,
        ]);
    }
}
