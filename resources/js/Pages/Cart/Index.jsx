import { Head, Link, router, usePage } from '@inertiajs/react';
import { ImageOff, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { formatPrice } from '@/Utils/currency';

export default function Index({ items, total }) {
    const { auth } = usePage().props;

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        router.patch(route('cart.update', productId), { quantity }, { preserveScroll: true });
    };

    const removeItem = (productId) => {
        router.delete(route('cart.remove', productId), { preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title="Sepetim" />

            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-extrabold text-ink-900">Sepetim</h1>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-16 text-center">
                        <ShoppingBag className="h-12 w-12 text-stone-300" />
                        <p className="text-ink-700">Sepetiniz şu anda boş.</p>
                        <Link href={route('products.index')}>
                            <PrimaryButton>Alışverişe Başla</PrimaryButton>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <div className="flex-1 space-y-4">
                            {items.map(({ product, quantity, subtotal }) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-stone-100">
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="h-full w-full rounded-xl object-cover"
                                            />
                                        ) : (
                                            <ImageOff className="h-6 w-6 text-stone-300" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Link
                                            href={route('products.show', product.slug)}
                                            className="font-semibold text-ink-900 hover:text-brand-500"
                                        >
                                            {product.name}
                                        </Link>
                                        <p className="mt-1 text-sm text-ink-700">{formatPrice(product.price)}</p>
                                    </div>

                                    <div className="flex items-center rounded-lg border border-stone-300">
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity - 1)}
                                            className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-stone-50"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-semibold text-ink-900">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity + 1)}
                                            disabled={quantity >= product.stock}
                                            className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-stone-50 disabled:opacity-30"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    <div className="w-24 text-right font-bold text-ink-900">
                                        {formatPrice(subtotal)}
                                    </div>

                                    <button
                                        onClick={() => removeItem(product.id)}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 transition hover:bg-red-50 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Özet */}
                        <div className="w-full shrink-0 lg:w-80">
                            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-bold text-ink-900">Sipariş Özeti</h2>

                                <div className="flex items-center justify-between text-sm text-ink-700">
                                    <span>Ara Toplam</span>
                                    <span className="font-semibold text-ink-900">{formatPrice(total)}</span>
                                </div>
                                <div className="my-4 border-t border-stone-200" />
                                <div className="flex items-center justify-between text-base font-bold text-ink-900">
                                    <span>Toplam</span>
                                    <span>{formatPrice(total)}</span>
                                </div>

                                {auth?.user ? (
                                    <Link href={route('orders.create')} className="mt-6 block">
                                        <PrimaryButton className="w-full">Siparişi Tamamla</PrimaryButton>
                                    </Link>
                                ) : (
                                    <Link href={route('login')} className="mt-6 block">
                                        <PrimaryButton className="w-full">
                                            Sipariş İçin Giriş Yap
                                        </PrimaryButton>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
