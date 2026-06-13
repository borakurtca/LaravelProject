import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatPrice } from '@/Utils/currency';
import { Package } from 'lucide-react';

const STATUS_COLORS = {
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
    processing: 'bg-blue-50 text-blue-700 ring-blue-200',
    shipped: 'bg-purple-50 text-purple-700 ring-purple-200',
    delivered: 'bg-green-50 text-green-700 ring-green-200',
    cancelled: 'bg-red-50 text-red-700 ring-red-200',
};

export default function Show({ order, statuses }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const updateStatus = (e) => {
        e.preventDefault();
        patch(route('admin.orders.update', order.id));
    };

    return (
        <AdminLayout title={`Sipariş: ${order.order_number}`}>
            <Head title={`Sipariş ${order.order_number}`} />

            <div className="max-w-3xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link href={route('admin.orders.index')} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                        ← Siparişlere Dön
                    </Link>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${STATUS_COLORS[order.status] || 'bg-stone-50 text-ink-700 ring-stone-200'}`}>
                        {statuses[order.status] || order.status}
                    </span>
                </div>

                {/* Durum Güncelleme */}
                <form onSubmit={updateStatus} className="mb-6 flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <label className="text-sm font-semibold text-ink-900 shrink-0">Durumu Güncelle:</label>
                    <select value={data.status} onChange={(e) => setData('status', e.target.value)}
                        className="flex-1 rounded-lg border-stone-300 text-sm focus:border-brand-400 focus:ring-brand-400">
                        {Object.entries(statuses).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                    <button type="submit" disabled={processing}
                        className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 disabled:opacity-50">
                        Kaydet
                    </button>
                </form>

                {/* Müşteri ve Teslimat Bilgileri */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 font-bold text-ink-900">Müşteri Bilgileri</h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-medium text-ink-900">{order.user?.name}</p>
                            <p className="text-ink-700">{order.user?.email}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 font-bold text-ink-900">Teslimat Bilgileri</h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-medium text-ink-900">{order.shipping_name}</p>
                            <p className="text-ink-700">{order.shipping_phone}</p>
                            <p className="text-ink-700">{order.shipping_address}</p>
                            <p className="text-ink-700">Ödeme: {order.payment_method}</p>
                        </div>
                    </div>
                </div>

                {/* Sipariş Bilgileri */}
                <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-1 font-bold text-ink-900">Sipariş Bilgileri</h3>
                    <p className="mb-4 text-sm text-ink-700">
                        #{order.order_number} &bull; {new Date(order.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>

                    <div className="divide-y divide-stone-100">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 py-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
                                    <Package className="h-5 w-5 text-stone-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-ink-900">{item.product_name}</p>
                                    <p className="text-sm text-ink-700">{formatPrice(item.price)} × {item.quantity}</p>
                                </div>
                                <span className="font-bold text-ink-900">
                                    {formatPrice(parseFloat(item.price) * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3">
                        <span className="font-bold text-ink-900">Toplam</span>
                        <span className="text-xl font-extrabold text-brand-500">{formatPrice(order.total)}</span>
                    </div>

                    {order.notes && (
                        <div className="mt-3 rounded-lg bg-stone-50 p-3 text-sm text-ink-700">
                            <span className="font-semibold">Not: </span>{order.notes}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
