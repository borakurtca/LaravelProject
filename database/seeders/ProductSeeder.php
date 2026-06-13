<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Telefon
            ['cat' => 'Telefon', 'name' => 'Galaxy Nova X12', 'price' => 32999.00, 'stock' => 25, 'desc' => '6.7" AMOLED ekran, 256GB depolama, üçlü kamera sistemi ile yüksek performans sunan amiral gemisi telefon.'],
            ['cat' => 'Telefon', 'name' => 'Phonix Lite 5', 'price' => 14999.00, 'stock' => 40, 'desc' => 'Uygun fiyatlı, 5000mAh batarya ve 128GB depolama alanına sahip günlük kullanım telefonu.'],
            ['cat' => 'Telefon', 'name' => 'Aero Pro 9', 'price' => 47999.00, 'stock' => 12, 'desc' => 'Titanyum kasa, 120Hz ekran ve gelişmiş yapay zeka destekli kamera özellikleri.'],

            // Bilgisayar
            ['cat' => 'Bilgisayar', 'name' => 'UltraBook Air 14', 'price' => 38999.00, 'stock' => 18, 'desc' => '14 inç, 16GB RAM, 512GB SSD, ince ve hafif tasarımıyla taşınabilirlik sağlar.'],
            ['cat' => 'Bilgisayar', 'name' => 'GameMax Tower RTX', 'price' => 64999.00, 'stock' => 8, 'desc' => 'Yüksek performanslı oyun bilgisayarı, gelişmiş ekran kartı ve sıvı soğutma sistemi.'],
            ['cat' => 'Bilgisayar', 'name' => 'Workstation Pro 16', 'price' => 52999.00, 'stock' => 10, 'desc' => '16 inç 4K ekran, profesyonel tasarım ve video düzenleme için optimize edilmiş işlemci.'],

            // Kulaklık
            ['cat' => 'Kulaklık', 'name' => 'SoundWave ANC Pro', 'price' => 4999.00, 'stock' => 60, 'desc' => 'Aktif gürültü engelleme özellikli kablosuz kulak içi kulaklık, 30 saat pil ömrü.'],
            ['cat' => 'Kulaklık', 'name' => 'StudioFit Over-Ear', 'price' => 3499.00, 'stock' => 35, 'desc' => 'Konforlu kafa bantlı tasarım, zengin bas performansı ile müzik dinleme deneyimi.'],
            ['cat' => 'Kulaklık', 'name' => 'PocketBuds Mini', 'price' => 1799.00, 'stock' => 75, 'desc' => 'Kompakt taşınabilir kablosuz kulaklık, hızlı şarj özelliği ile uzun süreli kullanım.'],

            // Giyilebilir Teknoloji
            ['cat' => 'Giyilebilir Teknoloji', 'name' => 'FitTrack Watch S3', 'price' => 6999.00, 'stock' => 30, 'desc' => 'Nabız, uyku ve aktivite takibi özellikleriyle sağlıklı yaşam asistanı akıllı saat.'],
            ['cat' => 'Giyilebilir Teknoloji', 'name' => 'PulseBand Lite', 'price' => 2299.00, 'stock' => 45, 'desc' => 'Hafif ve su geçirmez akıllı bileklik, adım ve kalori takibi sunar.'],

            // Aksesuar
            ['cat' => 'Aksesuar', 'name' => 'PowerCharge GaN 65W', 'price' => 1299.00, 'stock' => 100, 'desc' => 'Küçük boyutlu, hızlı şarj teknolojisine sahip GaN adaptör, çoklu cihaz desteği.'],
            ['cat' => 'Aksesuar', 'name' => 'FlexCable USB-C 2m', 'price' => 399.00, 'stock' => 150, 'desc' => 'Dayanıklı örgülü kablo yapısı ile hızlı veri aktarımı ve şarj imkanı sunar.'],
            ['cat' => 'Aksesuar', 'name' => 'GuardCase Shockproof', 'price' => 799.00, 'stock' => 90, 'desc' => 'Darbe emici malzeme ile telefonunuzu düşmelere karşı koruyan kılıf.'],

            // Ev Elektroniği
            ['cat' => 'Ev Elektroniği', 'name' => 'SmartHub Mini Speaker', 'price' => 3299.00, 'stock' => 28, 'desc' => 'Sesli komut destekli akıllı ev hoparlörü, ev otomasyonu için merkezi kontrol noktası.'],
            ['cat' => 'Ev Elektroniği', 'name' => 'EcoLight Smart Bulb (2li Set)', 'price' => 899.00, 'stock' => 70, 'desc' => 'Renk değiştirebilen, uygulamadan kontrol edilen enerji tasarruflu akıllı ampul seti.'],
        ];

        foreach ($products as $product) {
            $category = Category::where('name', $product['cat'])->first();

            Product::create([
                'category_id' => $category->id,
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['desc'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'image' => null,
                'is_active' => true,
            ]);
        }
    }
}
