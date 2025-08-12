<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cereals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->string('flavor')->nullable();
            $table->json('health_benefits')->nullable();
            $table->json('ingredients');
            $table->json('recipes')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('stock_quantity')->default(0);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('flavor');
            $table->index('price');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cereals');
    }
};