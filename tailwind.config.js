import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/components/button.js",
        './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [nextui()],
};
