import { build } from 'vite';
await build({ publicDir: false, logLevel: 'warn', build: { outDir: '/tmp/dist-test2', emptyOutDir: true } });
console.log('BUILD OK');
