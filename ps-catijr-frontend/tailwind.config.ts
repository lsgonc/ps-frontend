import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-gradient': 'linear-gradient(90deg, #5b5b5b 0%, #4c4444 100%)'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        headerbordercolor: "var(--header-border-color)",
        hoverbgcolor: "var(--hover-bg-color)",
        clickedbgcolor: "var(--clicked-bg-color)",
        hoverbggreen: "var(--hover-bg-green)",
        danger: "var(--danger)",
        lowpriority: "var(--low-priority-bg)",
        mediumpriority: "var(--medium-priority-bg)",
        highpriority: "var(--high-priority-bg)",
        superhighpriority: "var(--super-high-priority-bg)"
      },
    },
  },
  plugins: [],
} satisfies Config;
