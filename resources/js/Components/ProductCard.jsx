import { Link, router } from '@inertiajs/react';
import { ShoppingCart, ImageOff } from 'lucide-react';
import { formatPrice } from '@/Utils/currency';

export default function ProductCard({ product }) {
    const addToCart = (e) => {
        e.preventDefault();
        router.post(route('cart.add', product.id), {}, { preserveScroll: true });
    };

    return (
        <Link
            href={route('products.show', product.slug)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
        >
            <div className="flex aspect-square items-center justify-center bg-stone-100">
                {product.image ? (
                    <img
                        src={`/storage/${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <ImageOff className="h-10 w-10 text-stone-300" />
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                {product.category && (
                    <span className="text-xs font-medium uppercase tracking-wide text-brand-500">
                        {product.category.name}
                    </span>
                )}

                <h3 className="line-clamp-2 font-semibold text-ink-900">{product.name}</h3>

                <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-lg font-bold text-ink-900">
                        {formatPrice(product.price)}
                    </span>

                    <button
                        onClick={addToCart}
                        disabled={product.stock <= 0}
                        title="Sepete Ekle"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition hover:bg-brand-500 hover:text-white disabled:opacity-40"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>

                {product.stock <= 0 && (
                    <span className="text-xs font-medium text-red-500">Stokta Yok</span>
                )}
            </div>
        </Link>
    );
}
