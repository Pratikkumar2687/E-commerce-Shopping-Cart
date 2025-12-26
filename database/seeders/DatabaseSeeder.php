<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        // Create regular user
        User::create([
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
        ]);

        // Create products
        Product::create([
            'name' => 'Laptop',
            'description' => 'High-performance laptop for professionals',
            'price' => 1299.99,
            'stock_quantity' => 15,
        ]);

        Product::create([
            'name' => 'Wireless Mouse',
            'description' => 'Ergonomic wireless mouse',
            'price' => 29.99,
            'stock_quantity' => 50,
        ]);

        Product::create([
            'name' => 'Mechanical Keyboard',
            'description' => 'RGB mechanical keyboard with blue switches',
            'price' => 149.99,
            'stock_quantity' => 3,
        ]);

        Product::create([
            'name' => 'Monitor 27"',
            'description' => '4K UHD monitor with HDR support',
            'price' => 499.99,
            'stock_quantity' => 8,
        ]);

        Product::create([
            'name' => 'USB-C Hub',
            'description' => '7-in-1 USB-C hub adapter',
            'price' => 49.99,
            'stock_quantity' => 25,
        ]);
    }
}
