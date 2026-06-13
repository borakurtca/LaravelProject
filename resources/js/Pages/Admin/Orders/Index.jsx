import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Search, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/Utils/currency';

const STATUS_COLORS = {
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
    processing: 'bg-blue-50 text-blue-700 ring-blue-200',
    shipped: 'bg-purple-50 text-purple-700 ring-purple-200',
    delivered: 'bg-green-50 text-green-700 ring-green-200',
    cancelled: 'bg-red-50 text-red-700 ring-red-200',
};

export default function Index({ orders, statuses, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (newFilters) => {
        router.get(route('admin.orders.index'), { ...filters, ...newFilters }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Siparişler">
            <Head title="Siparişler" />

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <form onSubmit={(e) => { e.preventDefault(); applyFilter({ search }); }} className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Sipariş no veya isim..."
                        className="rounded-lg border-stone-300 pl-9 text-sm focus:border-brand-400 focus:ring-brand-400" />
                </form>

                <select value={filters.status || ''} onChange={(e) => applyFilter({ status: e.target.value })}
                    className="rounded-lg border-stone-300 text-sm focus:border-brand-400 focus:ring-brand-400">
                    <option value="">Tüm Durumlar</option>
                    {Object.entries(statuses).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-stone-200 text-sm">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-3.5 text-left font-semibold text-ink-900">Sipariş No</th>
                            <th className="px-6 py-3.5 text-left font-semibold text-ink-900">Müşteri</th>
                            <th className="px-6 py-3.5 text-center font-semibold text-ink-900">Ürün</th>
                            <th className="px-6 py-3.5 text-right font-semibold text-ink-900">Tutar</th>
                            <th className="px-6 py-3.5 text-center font-semibold text-ink-900">Durum</th>
                            <th className="px-6 py-3.5 text-right font-semibold text-ink-900">Tarih</th>
                            <th className="w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {orders.data.map((order) => (
                            <tr key={order.id} className="transition hover:bg-stone-50">
                                <td className="px-6 py-4 font-medium text-ink-900">{order.order_number}</td>
                                <td className="px-6 py-4 text-ink-700">{order.user?.name || '—'}</td>
                                <td className="px-6 py-4 text-center text-ink-700">{order.items_count}</td>
                                <td className="px-6 py-4 text-right font-semibold text-ink-900">{formatPrice(order.total)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${STATUS_COLORS[order.status] || 'bg-stone-50 text-ink-700 ring-stone-200'}`}>
                                        {statuses[order.status] || order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-ink-700">
                                    {new Date(order.created_at).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="pr-4">
                                    <Link href={route('admin.orders.show', order.id)}
                                        className="flex items-center justify-center text-stone-400 hover:text-brand-500">
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {orders.data.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-ink-700">
                                    Sipariş bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {orders.links.length > 3 && (
                    <div className="flex flex-wrap gap-2 border-t border-stone-200 p-4">
                        {orders.links.map((link, idx) => (
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
