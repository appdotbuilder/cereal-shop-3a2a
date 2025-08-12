<?php

namespace Database\Factories;

use App\Models\CartItem;
use App\Models\Cereal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_id' => $this->faker->uuid(),
            'cereal_id' => Cereal::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }
}