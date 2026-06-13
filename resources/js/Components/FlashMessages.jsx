import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function FlashMessages() {
    const { flash } = usePage().props;
    const [success, setSuccess] = useState(flash?.success);
    const [error, setError] = useState(flash?.error);

    useEffect(() => {
        setSuccess(flash?.success);
        setError(flash?.error);

        const timer = setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 4000);

        return () => clearTimeout(timer);
    }, [flash]);

    if (!success && !error) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {success && (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-soft ring-1 ring-green-200">
                    <CheckCircle2 className="h-5 w-5" />
                    {success}
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-soft ring-1 ring-red-200">
                    <XCircle className="h-5 w-5" />
                    {error}
                </div>
            )}
        </div>
    );
}
