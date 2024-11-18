/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#272946",
        color2: "#0ce6f2",
        color3: "#e7ffee",
        color4: "#201533",
        color5: "#203562",
        color6: "#ffffff",
        color7: "#46425e",
        color8: "#15788c",
        color9: "#00b9be",
        color10: "#ffeecc",
        color11: "#ffb0a3",
        color12: "#ff6973",
      },
      animation: {
        marquee: "marquee 10s linear infinite", // Define the animation in Tailwind
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
