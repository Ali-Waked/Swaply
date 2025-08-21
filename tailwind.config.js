/** @type {import('tailwindcss').Config} */
import tailwindRtl from 'tailwindcss-rtl'

export default {
    darkMode: 'class', //'class , media, system
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                readex: ['"Readex Pro"', 'sans-serif'],
            },
        },
    },
    plugins: [
        tailwindRtl,
        require('@tailwindcss/forms'),
    ],
}
