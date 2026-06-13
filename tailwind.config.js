import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#fef6ec',
                    100: '#fde8cc',
                    200: '#fbd198',
                    300: '#f8b35e',
                    400: '#f5942f',
                    500: '#e8771a',
                    600: '#c95a12',
                    700: '#a14114',
                    800: '#823517',
                    900: '#6c2d17',
                    950: '#3d1508',
                },
                ink: {
                    900: '#1c1917',
                    800: '#292524',
                    700: '#3f3a36',
                },
            },
            boxShadow: {
                soft: '0 4px 24px -8px rgba(28, 25, 23, 0.12)',
            },
        },
    },

    plugins: [forms],
};
