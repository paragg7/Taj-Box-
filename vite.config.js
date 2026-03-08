<<<<<<< HEAD
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
=======
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
>>>>>>> 8fa65e4 (Updated Taj Box project)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
<<<<<<< HEAD
      "@": path.resolve(__dirname, "src"),
    },
  },
});
=======
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
>>>>>>> 8fa65e4 (Updated Taj Box project)
