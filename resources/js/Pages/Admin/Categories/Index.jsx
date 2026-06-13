import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Index({ categories }) {
    const deleteCategory = (category) => {
        if (confirm(`"${category.name}" kategorisini silmek istediğinize emin misiniz?`)) {
            router.delete(route('admin.categories.destroy', category.id));
        }
    };

    return (
        <AdminLayout title="Kategoriler">
            <Head title="Kategoriler" />

            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-ink-700">{categories.total} kategori</p>
                <Link
                    href={route('admin.categories.create')}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
                >
                    <Plus className="h-4 w-4" />
                    Yeni Kategori
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-stone-200 text-sm">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-3.5 text-left font-semibold text-ink-900">Kategori</th>
                            <th className="px-6 py-3.5 text-left font-semibold text-ink-900">Slug</th>
                            <th className="px-6 py-3.5 text-center font-semibold text-ink-900">Ürün Sayısı</th>
                            <th className="px-6 py-3.5 text-right font-semibold text-ink-900">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {categories.data.map((category) => (
                            <tr key={category.id} className="transition hover:bg-stone-50">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-ink-900">{category.name}</p>
                                    {category.description && (
                                        <p className="mt-0.5 text-xs text-ink-700 line-clamp-1">{category.description}</p>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-ink-700">{category.slug}</td>
                                <td className="px-6 py-4 text-center font-semibold text-ink-900">{category.products_count}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.categories.edit', category.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-ink-700 transition hover:border-brand-300 hover:text-brand-500"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Link>
                                        <button
                                            onClick={() => deleteCategory(category)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-ink-700 transition hover:border-red-300 hover:text-red-500"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {categories.data.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-ink-700">
                                    Henüz kategori yok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {categories.links.length > 3 && (
                    <div className="flex flex-wrap gap-2 border-t border-stone-200 p-4">
                        {categories.links.map((link, idx) => (
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
