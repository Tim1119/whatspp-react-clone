/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'background': "url('/public/bg.png')",
        'whatsapp-banner-default': "url('/public/banner.png')",
      }),
    },
  },
  plugins: [],
};
