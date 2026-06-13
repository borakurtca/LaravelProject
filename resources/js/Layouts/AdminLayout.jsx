import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Tags,
    Package,
    ShoppingBag,
    ClipboardList,
    LogOut,
    Menu,
    X,
    ArrowLeftCircle,
} from 'lucide-react';
import FlashMessages from '@/Components/FlashMessages';

const navItems = [
    { name: 'Dashboard', href: 'admin.dashboard', icon: LayoutDashboard },
    { name: 'Kategoriler', href: 'admin.categories.index', icon: Tags },
    { name: 'Ürünler', href: 'admin.products.index', icon: Package },
    { name: 'Siparişler', href: 'admin.orders.index', icon: ClipboardList },
];

export default function AdminLayout({ children, title }) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (routeName) => {
        try {
            return route().current(routeName) || route().current(routeName + '.*');
        } catch {
            return false;
        }
    };

    return (
        <div className="flex min-h-screen bg-stone-50">
            <FlashMessages />

            {/* Sidebar - desktop */}
            <aside className="hidden w-64 flex-col border-r border-stone-200 bg-white lg:flex">
                <SidebarContent isActive={isActive} />
            </aside>

            {/* Sidebar - mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative flex w-64 flex-col bg-white">
                        <SidebarContent isActive={isActive} onNavigate={() => setSidebarOpen(false)} />
                    </aside>
                </div>
            )}

            <div className="flex flex-1 flex-col">
                <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-4 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <h1 className="text-xl font-bold text-ink-900">{title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-ink-700 sm:inline">
                            {props.auth?.user?.name}
                        </span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-ink-700 transition hover:border-red-300 hover:text-red-500"
                        >
                            <LogOut className="h-4 w-4" />
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

function SidebarContent({ isActive, onNavigate }) {
    return (
        <>
            <div className="flex items-center gap-2 border-b border-stone-200 px-6 py-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
                    <ShoppingBag className="h-5 w-5" />
                </span>
                <div>
                    <p className="text-sm font-extrabold text-ink-900">Borakurtça</p>
                    <p className="text-xs text-ink-700">Admin Paneli</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={route(item.href)}
                            onClick={onNavigate}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                active
                                    ? 'bg-brand-50 text-brand-600'
                                    : 'text-ink-700 hover:bg-stone-100'
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-stone-200 p-3">
                <Link
                    href={route('home')}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-stone-100"
                >
                    <ArrowLeftCircle className="h-4 w-4" />
                    Mağazaya Dön
                </Link>
            </div>
        </>
    );
}
