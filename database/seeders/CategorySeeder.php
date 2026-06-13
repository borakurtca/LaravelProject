<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Telefon', 'description' => 'Akıllı telefonlar ve aksesuarları'],
            ['name' => 'Bilgisayar', 'description' => 'Dizüstü ve masaüstü bilgisayarlar'],
            ['name' => 'Kulaklık', 'description' => 'Kablolu ve kablosuz kulaklıklar'],
            ['name' => 'Giyilebilir Teknoloji', 'description' => 'Akıllı saatler ve bilekler'],
            ['name' => 'Aksesuar', 'description' => 'Şarj cihazları, kablolar ve daha fazlası'],
            ['name' => 'Ev Elektroniği', 'description' => 'Akıllı ev ürünleri'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}
