<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Anasayfa - öne çıkan ürünler ve kategoriler.
     */
    public function index()
    {
        $categories = Category::withCount('products')->get();

        $featuredProducts = Product::with('category')
            ->active()
            ->where('stock', '>', 0)
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
