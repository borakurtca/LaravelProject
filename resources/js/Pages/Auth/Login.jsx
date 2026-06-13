import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Giriş Yap" />

            <h2 className="mb-1 text-2xl font-bold text-ink-900">Giriş Yap</h2>
            <p className="mb-6 text-sm text-ink-700">Hesabınıza erişmek için bilgilerinizi girin.</p>

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="E-posta" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Şifre" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="rounded border-stone-300 text-brand-500 focus:ring-brand-400"
                    />
                    <span className="text-sm text-ink-700">Beni hatırla</span>
                </label>

                <PrimaryButton className="w-full" disabled={processing}>
                    Giriş Yap
                </PrimaryButton>

                <p className="text-center text-sm text-ink-700">
                    Hesabınız yok mu?{' '}
                    <Link href={route('register')} className="font-semibold text-brand-500 hover:text-brand-600">
                        Kayıt Ol
                    </Link>
                </p>

                <div className="mt-2 rounded-lg bg-stone-50 p-3 text-xs text-ink-700">
                    <p className="font-semibold">Demo Hesaplar:</p>
                    <p>Admin: admin@borakurtca.com / admin123</p>
                    <p>Müşteri: musteri@borakurtca.com / musteri123</p>
                </div>
            </form>
        </GuestLayout>
    );
}
