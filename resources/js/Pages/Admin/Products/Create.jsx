import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Yeni Ürün">
            <Head title="Yeni Ürün" />

            <div className="max-w-2xl">
                <div className="mb-6">
                    <Link href={route('admin.products.index')} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                        ← Ürünlere Dön
                    </Link>
                </div>

                <form onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
                    <div>
                        <InputLabel htmlFor="category_id" value="Kategori" />
                        <select id="category_id" value={data.category_id}
                            className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                            onChange={(e) => setData('category_id', e.target.value)}>
                            <option value="">Kategori Seçin</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Ürün Adı" />
                        <TextInput id="name" value={data.name} className="mt-1 block w-full" isFocused
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Açıklama" />
                        <textarea id="description" value={data.description} rows={4}
                            className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                            onChange={(e) => setData('description', e.target.value)} />
                        <InputError message={errors.description} className="mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="price" value="Fiyat (₺)" />
                            <TextInput id="price" type="number" step="0.01" value={data.price}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('price', e.target.value)} />
                            <InputError message={errors.price} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="stock" value="Stok Adedi" />
                            <TextInput id="stock" type="number" value={data.stock}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('stock', e.target.value)} />
                            <InputError message={errors.stock} className="mt-1" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="image" value="Ürün Görseli (opsiyonel)" />
                        <input id="image" type="file" accept="image/*"
                            className="mt-1 block w-full text-sm text-ink-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
                            onChange={(e) => setData('image', e.target.files[0])} />
                        <InputError message={errors.image} className="mt-1" />
                    </div>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active}
                            className="rounded border-stone-300 text-brand-500 focus:ring-brand-400"
                            onChange={(e) => setData('is_active', e.target.checked)} />
                        <span className="text-sm font-medium text-ink-800">Ürünü Aktif Yayınla</span>
                    </label>

                    <PrimaryButton disabled={processing}>Ürün Oluştur</PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
}
