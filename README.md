# 🛍️ Borakurtça — E-Ticaret Projesi

> **ESOF302 Advanced Web Programming** — Fullstack E-Commerce Project  
> **Tech Stack:** Laravel 11 · React 18 · Inertia.js · Tailwind CSS · SQLite · Vite

---

## 📋 Proje Hakkında

Borakurtça, ESOF302 dersi kapsamında geliştirilen tam fonksiyonlu bir e-ticaret web uygulamasıdır.
Ders konuları her hafta projeye doğrudan uygulanmış; müşteri vitrinini ve idari yönetim panelini kapsamaktadır.

### Özellikler

**Müşteri Tarafı (Storefront)**
- 🏠 Anasayfa — öne çıkan ürünler ve kategori navigasyonu
- 📦 Ürün Listesi — kategori filtresi, arama ve sıralama
- 🔍 Ürün Detay — stok bilgisi, benzer ürünler
- 🛒 Sepet — session tabanlı, gerçek zamanlı adet güncelleme
- ✅ Checkout — teslimat formu, ödeme yöntemi seçimi
- 📋 Sipariş Takibi — durum timeline'ı
- 👤 Profil Yönetimi

**Admin Paneli**
- 📊 Dashboard — satış grafikleri (BarChart + PieChart), istatistik kartları
- 🏷️ Kategori CRUD — oluştur, düzenle, sil
- 📦 Ürün CRUD — görsel yükleme, stok yönetimi, aktif/pasif
- 🚚 Sipariş Yönetimi — durum güncelleme, detay görüntüleme

---

## ⚡ Kurulum

### Gereksinimler

- PHP >= 8.2
- Composer
- Node.js >= 18
- SQLite (PHP extension)

### Adımlar

```bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/borakurtca.git
cd borakurtca

# 2. PHP bağımlılıklarını yükle
composer install

# 3. Ortam dosyasını oluştur
cp .env.example .env
php artisan key:generate

# 4. SQLite veritabanını oluştur
touch database/database.sqlite

# 5. Migrasyonları çalıştır ve seed verisini yükle
php artisan migrate --seed

# 6. Storage linkini oluştur (ürün görselleri için)
php artisan storage:link

# 7. Node bağımlılıklarını yükle ve asset'leri derle
npm install
npm run build

# 8. Sunucuyu başlat
php artisan serve
```

Tarayıcıda `http://localhost:8000` adresine gidin.

---

## 🔑 Demo Hesaplar

| Rol | E-posta | Şifre |
|-----|---------|-------|
| **Admin** | admin@borakurtca.com | admin123 |
| **Müşteri** | musteri@borakurtca.com | musteri123 |

---

## 📁 Proje Yapısı

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

## 🛠️ Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Backend | Laravel 11 · Laravel Sanctum |
| Frontend | React 18 · Inertia.js · Tailwind CSS |
| Build | Vite 5 |
| Veritabanı | SQLite (geliştirme) |
| Auth | Laravel Breeze (Inertia stack) |
| Grafikler | Recharts |
| İkonlar | Lucide React |
