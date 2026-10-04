import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'blog-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/save-blog' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const newBlog = JSON.parse(body);
                const filePath = path.resolve(process.cwd(), 'src/data/blogs.json');
                let existingBlogs = [];
                if (fs.existsSync(filePath)) {
                  existingBlogs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                }
                existingBlogs.unshift(newBlog);
                fs.writeFileSync(filePath, JSON.stringify(existingBlogs, null, 2));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, blog: newBlog }));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ],
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    // Inline assets smaller than 8KB to reduce round trips
    assetsInlineLimit: 8192,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Smaller, more focused chunks = better caching + faster loads
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
        // Add content hashes for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    }
  },
  server: {
    open: false,
    allowedHosts: true,
  }
});
