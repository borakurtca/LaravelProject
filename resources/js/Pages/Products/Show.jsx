import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ImageOff, Minus, Plus, ShoppingCart, ChevronRight } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';
import PrimaryButton from '@/Components/PrimaryButton';
import { formatPrice } from '@/Utils/currency';

export default function Show({ product, relatedProducts }) {
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        router.post(route('cart.add', product.id), { quantity }, { preserveScroll: true });
    };

    const increment = () => setQuantity((q) => Math.min(q + 1, product.stock));
    const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

    return (
        <AppLayout>
            <Head title={product.name} />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-ink-700">
                    <Link href={route('home')} className="hover:text-brand-500">Anasayfa</Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <Link href={route('products.index')} className="hover:text-brand-500">Ürünler</Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-ink-900">{product.name}</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                    {/* Görsel */}
                    <div className="flex aspect-square items-center justify-center rounded-2xl bg-stone-100">
                        {product.image ? (
                            <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="h-full w-full rounded-2xl object-cover"
                            />
                        ) : (
                            <ImageOff className="h-16 w-16 text-stone-300" />
                        )}
                    </div>

                    {/* Detay */}
                    <div>
                        {product.category && (
                            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                                {product.category.name}
                            </span>
                        )}

                        <h1 className="mt-3 text-3xl font-extrabold text-ink-900">{product.name}</h1>

                        <p className="mt-4 text-3xl font-bold text-brand-500">
                            {formatPrice(product.price)}
                        </p>

                        <p className="mt-6 leading-relaxed text-ink-700">
                            {product.description || 'Bu ürün için açıklama bulunmamaktadır.'}
                        </p>

                        <div className="mt-6">
                            {product.stock > 0 ? (
                                <span className="text-sm font-medium text-green-600">
                                    Stokta {product.stock} adet mevcut
                                </span>
                            ) : (
                                <span className="text-sm font-medium text-red-500">Stokta Yok</span>
                            )}
                        </div>

                        {product.stock > 0 && (
                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <div className="flex items-center rounded-lg border border-stone-300">
                                    <button
                                        onClick={decrement}
                                        className="flex h-11 w-11 items-center justify-center text-ink-700 hover:bg-stone-50"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-semibold text-ink-900">{quantity}</span>
                                    <button
                                        onClick={increment}
                                        className="flex h-11 w-11 items-center justify-center text-ink-700 hover:bg-stone-50"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <PrimaryButton onClick={addToCart} className="gap-2 px-8 py-3">
                                    <ShoppingCart className="h-4 w-4" />
                                    Sepete Ekle
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>

                {/* Benzer Ürünler */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-ink-900">Benzer Ürünler</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
