<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::where('email', 'musteri@borakurtca.com')->first();
        $products = Product::all();

        $statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

        foreach (range(1, 5) as $i) {
            $items = $products->random(rand(1, 3));
            $total = 0;

            $order = Order::create([
                'user_id' => $customer->id,
                'order_number' => 'BK-'.now()->subDays($i)->format('Ymd').'-'.Str::upper(Str::random(5)),
                'status' => $statuses[array_rand($statuses)],
                'total' => 0,
                'shipping_name' => $customer->name,
                'shipping_address' => $customer->address,
                'shipping_phone' => $customer->phone,
                'payment_method' => 'Kapıda Ödeme',
                'created_at' => now()->subDays($i),
                'updated_at' => now()->subDays($i),
            ]);

            foreach ($items as $product) {
                $qty = rand(1, 2);
                $subtotal = $product->price * $qty;
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $qty,
                ]);
            }

            $order->update(['total' => $total]);
        }
    }
}
