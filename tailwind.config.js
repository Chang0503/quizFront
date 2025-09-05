/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",   // 掃描 Angular 的檔案
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),       // ✅ DaisyUI 放這裡
  ],
  daisyui: {
    themes: ["dark", "corporate"], // 這裡可以改成你想要的風格
  },
}
