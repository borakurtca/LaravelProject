#

Müşteri Tarafı (Storefront)
-  Anasayfa — öne çıkan ürünler ve kategori navigasyonu
-  Ürün Listesi — kategori filtresi, arama ve sıralama
-  Ürün Detay — stok bilgisi, benzer ürünler
-  Sepet — session tabanlı, gerçek zamanlı adet güncelleme
-  Checkout — teslimat formu, ödeme yöntemi seçimi
-  Sipariş Takibi — durum timeline'ı
-  Profil Yönetimi

**Admin Paneli**
-  Dashboard — satış grafikleri (BarChart + PieChart), istatistik kartları
-  Kategori CRUD — oluştur, düzenle, sil
-  Ürün CRUD — görsel yükleme, stok yönetimi, aktif/pasif
-  Sipariş Yönetimi — durum güncelleme, detay görüntüleme


##  Demo Hesaplar

| Rol | E-posta | Şifre |
|-----|---------|-------|
| **Admin** | admin@borakurtca.com | admin123 |
| **Müşteri** | musteri@borakurtca.com | musteri123 |

---

## Proje Yapısı

```
borakurtca/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Admin paneli controller'ları
│   │   │   ├── Auth/           # Kimlik doğrulama controller'ları
│   │   │   ├── CartController.php
│   │   │   ├── HomeController.php
│   │   │   ├── OrderController.php
│   │   │   ├── ProductController.php
│   │   │   └── ProfileController.php
│   │   └── Middleware/
│   │       ├── EnsureUserIsAdmin.php
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── Category.php
│       ├── Order.php
│       ├── OrderItem.php
│       ├── Product.php
│       └── User.php
│
├── database/
│   ├── migrations/             # Veritabanı şeması
│   └── seeders/                # Demo veri
│
├── resources/
│   └── js/
│       ├── Layouts/
│       │   ├── AppLayout.jsx   # Müşteri tarafı layout (header, footer)
│       │   ├── AdminLayout.jsx # Admin paneli sidebar layout
│       │   └── GuestLayout.jsx # Giriş/kayıt sayfaları
│       ├── Pages/
│       │   ├── Home.jsx
│       │   ├── Products/
│       │   │   ├── Index.jsx
│       │   │   └── Show.jsx
│       │   ├── Cart/
│       │   │   └── Index.jsx
│       │   ├── Orders/
│       │   │   ├── Create.jsx  # Checkout
│       │   │   ├── Index.jsx
│       │   │   └── Show.jsx
│       │   ├── Auth/
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   └── Admin/
│       │       ├── Dashboard.jsx
│       │       ├── Categories/ (Index, Create, Edit)
│       │       ├── Products/   (Index, Create, Edit)
│       │       └── Orders/     (Index, Show)
│       └── Components/
│
└── routes/
    ├── web.php                 # Tüm route tanımları
    └── auth.php                # Kimlik doğrulama rotaları
```

---

##  Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Backend | Laravel 11 · Laravel Sanctum |
| Frontend | React 18 · Inertia.js · Tailwind CSS |
| Build | Vite 5 |
| Veritabanı | SQLite (geliştirme) |
| Auth | Laravel Breeze (Inertia stack) |
| Grafikler | Recharts |
| İkonlar | Lucide React |
