import { defineConfig } from "vite";
import htmlPlugin from "vite-plugin-eslint";

export default defineConfig({
    
    root: './src',

    server: {
        port: 8080
    },

    build: {
        outDir: '../dist',
        rollupOptions: {
            input: 'src/index.html'
        }
    },

    plugins: [
        htmlPlugin({
            exclude: [ /.css/, /.png/]
        })
    ]
})