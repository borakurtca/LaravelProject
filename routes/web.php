<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Müşteri Tarafı (Storefront)
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/urunler', [ProductController::class, 'index'])->name('products.index');
Route::get('/urunler/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/sepet', [CartController::class, 'index'])->name('cart.index');
Route::post('/sepet/{product}', [CartController::class, 'add'])->name('cart.add');
Route::patch('/sepet/{product}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/sepet/{product}', [CartController::class, 'remove'])->name('cart.remove');

/*
|--------------------------------------------------------------------------
| Giriş Gerektiren Müşteri İşlemleri
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/odeme', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/odeme', [OrderController::class, 'store'])->name('orders.store');

    Route::get('/siparislerim', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/siparislerim/{order}', [OrderController::class, 'show'])->name('orders.show');

    Route::get('/profil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Paneli
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::resource('kategoriler', AdminCategoryController::class)
        ->parameters(['kategoriler' => 'category'])
        ->names('categories');

    Route::resource('urunler', AdminProductController::class)
        ->parameters(['urunler' => 'product'])
        ->names('products');

    Route::get('siparisler', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('siparisler/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('siparisler/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
});

require __DIR__.'/auth.php';
