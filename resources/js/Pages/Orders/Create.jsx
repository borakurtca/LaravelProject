import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { formatPrice } from '@/Utils/currency';

export default function Create({ items, total, user }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_name: user?.name || '',
        shipping_address: user?.address || '',
        shipping_phone: user?.phone || '',
        payment_method: 'Kapıda Ödeme',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <AppLayout>
            <Head title="Siparişi Tamamla" />

            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-extrabold text-ink-900">Siparişi Tamamla</h1>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Teslimat Formu */}
                    <form onSubmit={submit} className="flex-1 space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-ink-900">Teslimat Bilgileri</h2>

                        <div>
                            <InputLabel htmlFor="shipping_name" value="Ad Soyad" />
                            <TextInput
                                id="shipping_name"
                                value={data.shipping_name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('shipping_name', e.target.value)}
                            />
                            <InputError message={errors.shipping_name} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="shipping_phone" value="Telefon" />
                            <TextInput
                                id="shipping_phone"
                                value={data.shipping_phone}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('shipping_phone', e.target.value)}
                            />
                            <InputError message={errors.shipping_phone} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="shipping_address" value="Teslimat Adresi" />
                            <textarea
                                id="shipping_address"
                                value={data.shipping_address}
                                rows={3}
                                className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                                onChange={(e) => setData('shipping_address', e.target.value)}
                            />
                            <InputError message={errors.shipping_address} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="payment_method" value="Ödeme Yöntemi" />
                            <select
                                id="payment_method"
                                value={data.payment_method}
                                className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                                onChange={(e) => setData('payment_method', e.target.value)}
                            >
                                <option value="Kapıda Ödeme">Kapıda Ödeme</option>
                                <option value="Kredi Kartı">Kredi Kartı</option>
                                <option value="Banka Havalesi">Banka Havalesi</option>
                            </select>
                            <InputError message={errors.payment_method} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="notes" value="Sipariş Notu (opsiyonel)" />
                            <textarea
                                id="notes"
                                value={data.notes}
                                rows={2}
                                className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            <InputError message={errors.notes} className="mt-1" />
                        </div>

                        <PrimaryButton className="w-full" disabled={processing}>
                            Siparişi Onayla
                        </PrimaryButton>
                    </form>

                    {/* Sipariş Özeti */}
                    <div className="w-full shrink-0 lg:w-80">
                        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-bold text-ink-900">Sipariş Özeti</h2>

                            <div className="space-y-3">
                                {items.map(({ product, quantity, subtotal }) => (
                                    <div key={product.id} className="flex items-center justify-between text-sm">
                                        <span className="text-ink-700">
                                            {product.name} <span className="text-stone-400">x{quantity}</span>
                                        </span>
                                        <span className="font-semibold text-ink-900">{formatPrice(subtotal)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="my-4 border-t border-stone-200" />

                            <div className="flex items-center justify-between text-base font-bold text-ink-900">
                                <span>Toplam</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
