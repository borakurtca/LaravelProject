import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';

export default function Edit({ status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    const { data: delData, setData: setDelData, delete: destroy, processing: delProcessing, errors: delErrors } = useForm({
        password: '',
    });

    const [showDelete, setShowDelete] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'));
    };

    return (
        <AppLayout>
            <Head title="Profilim" />

            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-extrabold text-ink-900">Profilim</h1>

                {status === 'profile-updated' && (
                    <div className="mb-4 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700 ring-1 ring-green-200">
                        Profil bilgileriniz güncellendi.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <h2 className="font-bold text-ink-900">Kişisel Bilgiler</h2>

                    <div>
                        <InputLabel htmlFor="name" value="Ad Soyad" />
                        <TextInput id="name" value={data.name} className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="E-posta" />
                        <TextInput id="email" type="email" value={data.email} className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)} />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Telefon" />
                        <TextInput id="phone" value={data.phone} className="mt-1 block w-full"
                            onChange={(e) => setData('phone', e.target.value)} />
                        <InputError message={errors.phone} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Adres" />
                        <textarea id="address" value={data.address} rows={3}
                            className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                            onChange={(e) => setData('address', e.target.value)} />
                        <InputError message={errors.address} className="mt-1" />
                    </div>

                    <PrimaryButton disabled={processing}>Kaydet</PrimaryButton>
                </form>

                {/* Hesap Silme */}
                <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-2 font-bold text-red-700">Hesabı Sil</h2>
                    <p className="mb-4 text-sm text-ink-700">Hesabınızı silmek geri alınamaz bir işlemdir.</p>
                    {!showDelete ? (
                        <DangerButton onClick={() => setShowDelete(true)}>Hesabı Sil</DangerButton>
                    ) : (
                        <form onSubmit={handleDelete} className="space-y-3">
                            <div>
                                <InputLabel htmlFor="del_password" value="Şifrenizi girin" />
                                <TextInput id="del_password" type="password" value={delData.password}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setDelData('password', e.target.value)} />
                                <InputError message={delErrors.password} className="mt-1" />
                            </div>
                            <div className="flex gap-3">
                                <DangerButton disabled={delProcessing}>Kalıcı Olarak Sil</DangerButton>
                                <button type="button" onClick={() => setShowDelete(false)}
                                    className="text-sm text-ink-700 hover:text-brand-500">
                                    İptal
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
