import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@shared': '/src/@shared',
        '@context': '/src/@context',
        '@common': '/src/@common',
        '@hooks': '/src/@hooks',
        '@services': '/src/@services',
        '@utils': '/src/@utils',
        '@views': '/src/@views',
        '@root': '/src',
        '@translations': '/src/@translations',
      },
    },
  };
});
