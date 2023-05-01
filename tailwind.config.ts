import { type Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyUi: {
    themes: ["dark", "night"],
  },
  plugins: [require("daisyui")],
} satisfies Config
