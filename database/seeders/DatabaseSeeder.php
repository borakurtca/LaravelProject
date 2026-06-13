<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin kullanıcı
        User::factory()->admin()->create([
            'name' => 'Bora Kurtça',
            'email' => 'admin@borakurtca.com',
            'password' => bcrypt('admin123'),
        ]);

        // Normal müşteri (test için)
        User::factory()->create([
            'name' => 'Test Müşteri',
            'email' => 'musteri@borakurtca.com',
            'password' => bcrypt('musteri123'),
        ]);

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
