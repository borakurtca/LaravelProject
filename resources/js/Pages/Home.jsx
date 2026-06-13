import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function Home({ categories, featuredProducts }) {
    return (
        <AppLayout>
            <Head title="Anasayfa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-50 via-stone-50 to-stone-50">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
                    <div>
                        <span className="inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-600">
                            2026 Bahar Koleksiyonu
                        </span>
                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                            Teknolojiyi <span className="text-brand-500">Borakurtça</span> ile keşfedin
                        </h1>
                        <p className="mt-4 max-w-md text-lg text-ink-700">
                            Telefon, bilgisayar, kulaklık ve daha fazlası — güvenilir fiyatlarla, hızlı
                            teslimat ile kapınıza geliyor.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={route('products.index')}
                                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
                            >
                                Alışverişe Başla
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {categories.slice(0, 4).map((category) => (
                            <Link
                                key={category.id}
                                href={route('products.index', { category: category.id })}
                                className="group flex flex-col justify-between rounded-2xl bg-white p-5 shadow-soft ring-1 ring-stone-200 transition hover:-translate-y-1"
                            >
                                <span className="text-sm font-semibold text-ink-900">{category.name}</span>
                                <span className="mt-2 text-xs text-ink-700">
                                    {category.products_count} ürün
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Özellikler */}
            <section className="border-y border-stone-200 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
                    <Feature icon={Truck} title="Hızlı Teslimat" desc="Siparişleriniz en kısa sürede kapınızda." />
                    <Feature icon={ShieldCheck} title="Güvenli Alışveriş" desc="Verileriniz ve ödemeleriniz güvende." />
                    <Feature icon={RefreshCcw} title="Kolay İade" desc="14 gün içinde sorunsuz iade hakkı." />
                </div>
            </section>

            {/* Öne çıkan ürünler */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-ink-900">Öne Çıkan Ürünler</h2>
                    <Link
                        href={route('products.index')}
                        className="text-sm font-semibold text-brand-500 hover:text-brand-600"
                    >
                        Tümünü Gör →
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}

function Feature({ icon: Icon, title, desc }) {
    return (
        <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <Icon className="h-6 w-6" />
            </span>
            <div>
                <h3 className="font-semibold text-ink-900">{title}</h3>
                <p className="text-sm text-ink-700">{desc}</p>
            </div>
        </div>
    );
}
