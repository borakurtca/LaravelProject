import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
            <Link href={route('home')} className="mb-6 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
                    <ShoppingBag className="h-5 w-5" />
                </span>
                <span className="text-xl font-extrabold tracking-tight text-ink-900">
                    Borakurtça
                </span>
            </Link>

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft ring-1 ring-stone-200">
                {children}
            </div>
        </div>
    );
}
