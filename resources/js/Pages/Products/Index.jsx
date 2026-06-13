import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (newFilters) => {
        router.get(route('products.index'), { ...filters, ...newFilters }, { preserveState: true, replace: true });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        applyFilter({ search });
    };

    return (
        <AppLayout>
            <Head title="Ürünler" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-extrabold text-ink-900">Ürünler</h1>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Filtreler */}
                    <aside className="w-full shrink-0 lg:w-64">
                        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                            <form onSubmit={submitSearch} className="mb-5">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Ürün ara..."
                                        className="w-full rounded-lg border-stone-300 pl-9 text-sm focus:border-brand-400 focus:ring-brand-400"
                                    />
                                </div>
                            </form>

                            <div className="mb-5">
                                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-900">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Kategoriler
                                </h3>
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => applyFilter({ category: '' })}
                                        className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                                            !filters.category ? 'bg-brand-50 font-semibold text-brand-600' : 'text-ink-700 hover:bg-stone-50'
                                        }`}
                                    >
                                        Tümü
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => applyFilter({ category: cat.id })}
                                            className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                                                String(filters.category) === String(cat.id)
                                                    ? 'bg-brand-50 font-semibold text-brand-600'
                                                    : 'text-ink-700 hover:bg-stone-50'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-ink-900">Sıralama</h3>
                                <select
                                    value={filters.sort || 'newest'}
                                    onChange={(e) => applyFilter({ sort: e.target.value })}
                                    className="w-full rounded-lg border-stone-300 text-sm focus:border-brand-400 focus:ring-brand-400"
                                >
                                    <option value="newest">En Yeni</option>
                                    <option value="price_asc">Fiyat: Artan</option>
                                    <option value="price_desc">Fiyat: Azalan</option>
                                    <option value="name">İsme Göre</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Ürün listesi */}
                    <div className="flex-1">
                        {products.data.length === 0 ? (
                            <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center text-ink-700">
                                Aramanıza uygun ürün bulunamadı.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {products.data.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.links.length > 3 && (
                                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                        {products.links.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                href={link.url || '#'}
                                                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                                                    link.active
                                                        ? 'bg-brand-500 text-white'
                                                        : link.url
                                                        ? 'border border-stone-200 text-ink-700 hover:bg-stone-50'
                                                        : 'cursor-not-allowed text-stone-300'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
