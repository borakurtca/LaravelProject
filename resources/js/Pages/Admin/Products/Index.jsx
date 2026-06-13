import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { formatPrice } from '@/Utils/currency';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (newFilters) => {
        router.get(route('admin.products.index'), { ...filters, ...newFilters }, { preserveState: true, replace: true });
    };

    const deleteProduct = (product) => {
        if (confirm(`"${product.name}" ürününü silmek istediğinize emin misiniz?`)) {
            router.delete(route('admin.products.destroy', product.id));
        }
    };

    return (
        <AdminLayout title="Ürünler">
            <Head title="Ürünler" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <form onSubmit={(e) => { e.preventDefault(); applyFilter({ search }); }} className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Ürün ara..."
                            className="rounded-lg border-stone-300 pl-9 text-sm focus:border-brand-400 focus:ring-brand-400" />
                    </form>

                    <select value={filters.category || ''} onChange={(e) => applyFilter({ category: e.target.value })}
                        className="rounded-lg border-stone-300 text-sm focus:border-brand-400 focus:ring-brand-400">
                        <option value="">Tüm Kategoriler</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <Link href={route('admin.products.create')}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600">
                    <Plus className="h-4 w-4" />
                    Yeni Ürün
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-stone-200 text-sm">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-3.5 text-left font-semibold text-ink-900">Ürün</th>
                            <th className="px-6 py-3.5 text-left font-semibold text-ink-900">Kategori</th>
                            <th className="px-6 py-3.5 text-right font-semibold text-ink-900">Fiyat</th>
                            <th className="px-6 py-3.5 text-center font-semibold text-ink-900">Stok</th>
                            <th className="px-6 py-3.5 text-center font-semibold text-ink-900">Durum</th>
                            <th className="px-6 py-3.5 text-right font-semibold text-ink-900">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {products.data.map((product) => (
                            <tr key={product.id} className="transition hover:bg-stone-50">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-ink-900 line-clamp-1">{product.name}</p>
                                </td>
                                <td className="px-6 py-4 text-ink-700">{product.category?.name || '—'}</td>
                                <td className="px-6 py-4 text-right font-semibold text-ink-900">{formatPrice(product.price)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-semibold ${product.stock <= 5 ? 'text-red-500' : 'text-ink-900'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${product.is_active ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-ink-700'}`}>
                                        {product.is_active ? 'Aktif' : 'Pasif'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={route('admin.products.edit', product.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-ink-700 transition hover:border-brand-300 hover:text-brand-500">
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Link>
                                        <button onClick={() => deleteProduct(product)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-ink-700 transition hover:border-red-300 hover:text-red-500">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {products.data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-ink-700">
                                    Ürün bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {products.links.length > 3 && (
                    <div className="flex flex-wrap gap-2 border-t border-stone-200 p-4">
                        {products.links.map((link, idx) => (
                            <Link key={idx} href={link.url || '#'}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${link.active ? 'bg-brand-500 text-white' : link.url ? 'border border-stone-200 text-ink-700 hover:bg-stone-50' : 'cursor-not-allowed text-stone-300'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
