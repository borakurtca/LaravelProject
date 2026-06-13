import { Head } from '@inertiajs/react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from 'recharts';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatPrice } from '@/Utils/currency';
import { Package, Tags, ShoppingBag, Users, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

const PIE_COLORS = ['#e8771a', '#3b82f6', '#8b5cf6', '#22c55e', '#ef4444'];

export default function Dashboard({ stats, salesChart, orderStatusChart, topProducts, recentOrders }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
                <StatCard icon={ShoppingBag} label="Toplam Sipariş" value={stats.total_orders} />
                <StatCard icon={TrendingUp} label="Toplam Gelir" value={formatPrice(stats.total_revenue)} color="brand" />
                <StatCard icon={Package} label="Toplam Ürün" value={stats.total_products} />
                <StatCard icon={Users} label="Müşteri" value={stats.total_users} />
            </div>

            {/* Uyarı Kartları */}
            <div className="mb-8 flex flex-wrap gap-3">
                {stats.pending_orders > 0 && (
                    <div className="flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-700 ring-1 ring-yellow-200">
                        <Clock className="h-4 w-4" />
                        {stats.pending_orders} bekleyen sipariş
                    </div>
                )}
                {stats.low_stock_products > 0 && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
                        <AlertTriangle className="h-4 w-4" />
                        {stats.low_stock_products} ürün kritik stok seviyesinde
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Satış Grafiği */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="mb-4 font-bold text-ink-900">Son 7 Günlük Gelir (₺)</h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={salesChart}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#57534e' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#57534e' }} tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}K`} />
                            <Tooltip formatter={(value) => formatPrice(value)} />
                            <Bar dataKey="revenue" fill="#e8771a" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Sipariş Durumu Pasta Grafiği */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 font-bold text-ink-900">Sipariş Dağılımı</h2>
                    {orderStatusChart.length > 0 ? (
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie data={orderStatusChart} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={75} label={({ status, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                    {orderStatusChart.map((_, idx) => (
                                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-sm text-ink-700">Henüz sipariş yok.</p>
                    )}
                </div>

                {/* En Çok Satılan Ürünler */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 font-bold text-ink-900">En Çok Satılan</h2>
                    <div className="space-y-3">
                        {topProducts.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                                    {idx + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-ink-900">{p.product_name}</p>
                                    <p className="text-xs text-ink-700">{p.total_sold} adet</p>
                                </div>
                            </div>
                        ))}
                        {topProducts.length === 0 && <p className="text-sm text-ink-700">Henüz satış yok.</p>}
                    </div>
                </div>

                {/* Son Siparişler */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="mb-4 font-bold text-ink-900">Son Siparişler</h2>
                    <div className="divide-y divide-stone-100">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between py-3 text-sm">
                                <div>
                                    <p className="font-medium text-ink-900">{order.order_number}</p>
                                    <p className="text-ink-700">{order.user?.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-ink-900">{formatPrice(order.total)}</p>
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ icon: Icon, label, value, color = 'stone' }) {
    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color === 'brand' ? 'bg-brand-50 text-brand-500' : 'bg-stone-100 text-ink-700'}`}>
                <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-ink-900">{value}</p>
            <p className="mt-0.5 text-sm text-ink-700">{label}</p>
        </div>
    );
}

const STATUS_COLORS = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
};

const STATUS_LABELS = {
    pending: 'Onay Bekliyor',
    processing: 'Hazırlanıyor',
    shipped: 'Kargoya Verildi',
    delivered: 'Teslim Edildi',
    cancelled: 'İptal Edildi',
};

function StatusBadge({ status }) {
    return (
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[status] || 'bg-stone-50 text-ink-700'}`}>
            {STATUS_LABELS[status] || status}
        </span>
    );
}
