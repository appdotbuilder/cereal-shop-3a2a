<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CerealController;
use App\Http\Controllers\CheckoutController;
use App\Models\Cereal;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    $featuredCereals = Cereal::featured()->take(3)->get();
    
    return Inertia::render('welcome', [
        'featuredCereals' => $featuredCereals,
    ]);
})->name('home');

// E-commerce routes
Route::get('/shop', [CerealController::class, 'index'])->name('shop.index');
Route::get('/product/{cereal}', [CerealController::class, 'show'])->name('product.show');

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

// Checkout routes
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
