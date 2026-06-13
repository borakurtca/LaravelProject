import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatPrice } from '@/Utils/currency';
import { CheckCircle2, Package } from 'lucide-react';

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

const STEPS = ['pending', 'processing', 'shipped', 'delivered'];

export default function Show({ order }) {
    const currentStep = STEPS.indexOf(order.status);

    return (
        <AppLayout>
            <Head title={`Sipariş ${order.order_number}`} />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-2 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-ink-900">{order.order_number}</h1>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${STATUS_COLORS[order.status] || 'bg-stone-50 text-ink-700 ring-stone-200'}`}>
                        {STATUS_LABELS[order.status] || order.status}
                    </span>
                </div>
                <p className="mb-8 text-sm text-ink-700">
                    {new Date(order.created_at).toLocaleDateString('tr-TR', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                </p>

                {/* Durum takibi */}
                {order.status !== 'cancelled' && (
                    <div className="mb-8 flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                        {STEPS.map((step, idx) => (
                            <div key={step} className="flex flex-1 items-center">
                                <div className="flex flex-col items-center gap-1">
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${idx <= currentStep ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-400'}`}>
                                        {idx < currentStep ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                                    </div>
                                    <span className="hidden text-xs text-ink-700 sm:block">{STATUS_LABELS[step]}</span>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-2 ${idx < currentStep ? 'bg-brand-400' : 'bg-stone-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Ürünler */}
                <div className="mb-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
                    <div className="border-b border-stone-200 px-6 py-4">
                        <h2 className="font-bold text-ink-900">Ürünler</h2>
                    </div>
                    <div className="divide-y divide-stone-100">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 px-6 py-4">
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
                    <div className="flex items-center justify-between border-t border-stone-200 px-6 py-4">
                        <span className="font-bold text-ink-900">Toplam</span>
                        <span className="text-xl font-extrabold text-brand-500">{formatPrice(order.total)}</span>
                    </div>
                </div>

                {/* Teslimat Bilgileri */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 font-bold text-ink-900">Teslimat Bilgileri</h2>
                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <InfoRow label="Ad Soyad" value={order.shipping_name} />
                        <InfoRow label="Telefon" value={order.shipping_phone} />
                        <InfoRow label="Ödeme Yöntemi" value={order.payment_method} />
                        <InfoRow label="Adres" value={order.shipping_address} className="sm:col-span-2" />
                        {order.notes && <InfoRow label="Not" value={order.notes} className="sm:col-span-2" />}
                    </div>
                </div>

                <div className="mt-6">
                    <Link href={route('orders.index')} className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                        ← Siparişlerime Dön
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

function InfoRow({ label, value, className = '' }) {
    return (
        <div className={className}>
            <span className="block text-xs font-semibold uppercase tracking-wide text-ink-700">{label}</span>
            <span className="mt-0.5 block text-ink-900">{value || '—'}</span>
        </div>
    );
}
