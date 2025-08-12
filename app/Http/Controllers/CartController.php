<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Cereal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index(Request $request)
    {
        $sessionId = $request->session()->getId();
        
        $cartItems = CartItem::with('cereal')
            ->where('session_id', $sessionId)
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->cereal->price;
        });

        return Inertia::render('cart', [
            'cartItems' => $cartItems,
            'total' => $total
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cereal_id' => 'required|exists:cereals,id',
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        $sessionId = $request->session()->getId();

        $cartItem = CartItem::where('session_id', $sessionId)
            ->where('cereal_id', $request->cereal_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'session_id' => $sessionId,
                'cereal_id' => $request->cereal_id,
                'quantity' => $request->quantity
            ]);
        }

        return redirect()->back()->with('success', 'Item added to cart!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        // Ensure user can only update their own cart items
        if ($cartItem->session_id !== $request->session()->getId()) {
            abort(403);
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return redirect()->back()->with('success', 'Cart updated!');
    }

    /**
     * Remove item from cart.
     */
    public function destroy(Request $request, CartItem $cartItem)
    {
        // Ensure user can only remove their own cart items
        if ($cartItem->session_id !== $request->session()->getId()) {
            abort(403);
        }

        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }
}