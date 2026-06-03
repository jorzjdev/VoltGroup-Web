import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

const pagesDir = resolve(__dirname, 'pages');
const pageEntries = readdirSync(pagesDir)
  .filter((file) => file.endsWith('.html') && !file.startsWith('_'))
  .reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(pagesDir, file);
    return entries;
  }, {});

export default defineConfig({
  base: '/VoltGroup-Web/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...pageEntries,
      },
    },
  },
});
