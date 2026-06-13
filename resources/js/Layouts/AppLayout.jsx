import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingBag, ShoppingCart, User, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import FlashMessages from '@/Components/FlashMessages';

export default function AppLayout({ children }) {
    const { auth, cart_count } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: 'Anasayfa', href: route('home') },
        { name: 'Ürünler', href: route('products.index') },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-stone-50">
            <FlashMessages />

            <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
                            <ShoppingBag className="h-5 w-5" />
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-ink-900">
                            Borakurtça
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-ink-700 transition hover:text-brand-500"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href={route('cart.index')}
                            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink-700 transition hover:border-brand-300 hover:text-brand-500"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cart_count > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                                    {cart_count}
                                </span>
                            )}
                        </Link>

                        {auth?.user ? (
                            <div className="flex items-center gap-2">
                                {auth.user.is_admin && (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-500"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Admin
                                    </Link>
                                )}
                                <Link
                                    href={route('orders.index')}
                                    className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-500"
                                >
                                    Siparişlerim
                                </Link>
                                <Link
                                    href={route('profile.edit')}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink-700 transition hover:border-brand-300 hover:text-brand-500"
                                >
                                    <User className="h-5 w-5" />
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-ink-700 transition hover:border-red-300 hover:text-red-500"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-ink-700 transition hover:text-brand-500"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
                                >
                                    Kayıt Ol
                                </Link>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 md:hidden"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} className="text-sm font-medium text-ink-700">
                                    {link.name}
                                </Link>
                            ))}
                            <Link href={route('cart.index')} className="text-sm font-medium text-ink-700">
                                Sepetim {cart_count > 0 ? `(${cart_count})` : ''}
                            </Link>
                            {auth?.user ? (
                                <>
                                    {auth.user.is_admin && (
                                        <Link href={route('admin.dashboard')} className="text-sm font-medium text-ink-700">
                                            Admin Paneli
                                        </Link>
                                    )}
                                    <Link href={route('orders.index')} className="text-sm font-medium text-ink-700">
                                        Siparişlerim
                                    </Link>
                                    <Link href={route('profile.edit')} className="text-sm font-medium text-ink-700">
                                        Profilim
                                    </Link>
                                    <Link href={route('logout')} method="post" as="button" className="text-left text-sm font-medium text-red-500">
                                        Çıkış Yap
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-medium text-ink-700">
                                        Giriş Yap
                                    </Link>
                                    <Link href={route('register')} className="text-sm font-medium text-brand-500">
                                        Kayıt Ol
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-stone-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                                <ShoppingBag className="h-4 w-4" />
                            </span>
                            <span className="font-bold text-ink-900">Borakurtça</span>
                        </div>
                        <p className="text-sm text-ink-700">
                            © {new Date().getFullYear()} Borakurtça — ESOF302 Advanced Web Programming Projesi
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
