<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cereal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CerealController extends Controller
{
    /**
     * Display a listing of the cereals for the shop page.
     */
    public function index(Request $request)
    {
        $query = Cereal::query();

        // Filter by flavor
        if ($request->filled('flavor')) {
            $query->where('flavor', $request->flavor);
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sort
        $sortBy = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');
        
        if (in_array($sortBy, ['name', 'price', 'flavor'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $cereals = $query->paginate(12);

        // Get unique flavors for filter dropdown
        $flavors = Cereal::distinct('flavor')->pluck('flavor')->filter()->sort()->values();

        return Inertia::render('shop', [
            'cereals' => $cereals,
            'flavors' => $flavors,
            'filters' => [
                'flavor' => $request->flavor,
                'min_price' => $request->min_price,
                'max_price' => $request->max_price,
                'sort' => $sortBy,
                'direction' => $sortDirection,
            ]
        ]);
    }

    /**
     * Display the specified cereal product page.
     */
    public function show(Cereal $cereal)
    {
        return Inertia::render('product', [
            'cereal' => $cereal
        ]);
    }
}