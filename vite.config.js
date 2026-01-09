import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
