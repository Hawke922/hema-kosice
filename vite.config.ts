import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// For GitHub Pages project site deployment the base needs to be the repository name.
// This ensures all asset URLs resolve correctly at https://hawke922.github.io/hema-kosice/
// If you later move to a custom domain, you can switch base back to '/'.
export default defineConfig({
  base: "/hema-kosice/",
  plugins: [react()],
});
