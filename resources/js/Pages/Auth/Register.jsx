import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Kayıt Ol" />

            <h2 className="mb-1 text-2xl font-bold text-ink-900">Hesap Oluştur</h2>
            <p className="mb-6 text-sm text-ink-700">Borakurtça'ya katılın ve alışverişe başlayın.</p>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Ad Soyad" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="E-posta" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Telefon (opsiyonel)" />
                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Adres (opsiyonel)" />
                    <textarea
                        id="address"
                        name="address"
                        value={data.address}
                        rows={2}
                        className="mt-1 block w-full rounded-lg border-stone-300 shadow-sm focus:border-brand-400 focus:ring-brand-400"
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    <InputError message={errors.address} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Şifre" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Şifre Doğrulama" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <PrimaryButton className="w-full" disabled={processing}>
                    Kayıt Ol
                </PrimaryButton>

                <p className="text-center text-sm text-ink-700">
                    Zaten hesabınız var mı?{' '}
                    <Link href={route('login')} className="font-semibold text-brand-500 hover:text-brand-600">
                        Giriş Yap
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
