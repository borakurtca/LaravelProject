import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatPrice } from '@/Utils/currency';
import { ClipboardList, ChevronRight } from 'lucide-react';

const STATUS_COLORS = {
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
    processing: 'bg-blue-50 text-blue-700 ring-blue-200',
    shipped: 'bg-purple-50 text-purple-700 ring-purple-200',
    delivered: 'bg-green-50 text-green-700 ring-green-200',
    cancelled: 'bg-red-50 text-red-700 ring-red-200',
};

const STATUS_LABELS = {
    pending: 'Onay Bekliyor',
    processing: 'Hazırlanıyor',
    shipped: 'Kargoya Verildi',
    delivered: 'Teslim Edildi',
    cancelled: 'İptal Edildi',
};

export default function Index({ orders }) {
    return (
        <AppLayout>
            <Head title="Siparişlerim" />

            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-extrabold text-ink-900">Siparişlerim</h1>

                {orders.data.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-16 text-center">
                        <ClipboardList className="h-12 w-12 text-stone-300" />
                        <p className="text-ink-700">Henüz siparişiniz yok.</p>
                        <Link href={route('products.index')} className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                            Alışverişe Başla →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <Link
                                key={order.id}
                                href={route('orders.show', order.id)}
                                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-soft"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-ink-900">{order.order_number}</span>
                                    <span className="text-sm text-ink-700">
                                        {order.items_count} ürün &bull;{' '}
                                        {new Date(order.created_at).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="hidden font-bold text-ink-900 sm:inline">
                                        {formatPrice(order.total)}
                                    </span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[order.status] || 'bg-stone-50 text-ink-700 ring-stone-200'}`}>
                                        {STATUS_LABELS[order.status] || order.status}
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-stone-400" />
                                </div>
                            </Link>
                        ))}

                        {/* Pagination */}
                        {orders.links.length > 3 && (
                            <div className="flex flex-wrap justify-center gap-2 pt-4">
                                {orders.links.map((link, idx) => (
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
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
