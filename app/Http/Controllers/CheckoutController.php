<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index(Request $request)
    {
        $sessionId = $request->session()->getId();
        
        $cartItems = CartItem::with('cereal')
            ->where('session_id', $sessionId)
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->cereal->price;
        });

        // Simple delivery calculation
        $baseDelivery = 4.99; // Base rate for within 3km
        $extendedDelivery = 8.99; // Rate for longer distances

        return Inertia::render('checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'baseDelivery' => $baseDelivery,
            'extendedDelivery' => $extendedDelivery
        ]);
    }

    /**
     * Process the checkout.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'delivery_option' => 'required|in:base,extended',
        ]);

        // In a real app, you would:
        // 1. Create an order record
        // 2. Process payment
        // 3. Send confirmation email
        // 4. Clear the cart

        $sessionId = $request->session()->getId();
        CartItem::where('session_id', $sessionId)->delete();

        return redirect()->route('welcome')->with('success', 'Order placed successfully! You will receive a confirmation email shortly.');
    }
}