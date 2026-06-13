import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ category }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.categories.update', category.id));
    };

    return (
        <AdminLayout title="Kategori Düzenle">
            <Head title="Kategori Düzenle" />

            <div className="max-w-xl">
                <div className="mb-6">
                    <Link href={route('admin.categories.index')} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                        ← Kategorilere Dön
                    </Link>
                </div>

                <form onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Kategori Adı" />
                        <TextInput id="name" value={data.name} className="mt-1 block w-full" isFocused
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Açıklama" />
                        <textarea id="description" value={data.description} rows={3}
                            className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                            onChange={(e) => setData('description', e.target.value)} />
                        <InputError message={errors.description} className="mt-1" />
                    </div>

                    <PrimaryButton disabled={processing}>Güncelle</PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
}
