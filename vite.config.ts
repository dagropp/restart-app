import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    base: env.VITE_SERVER_ROOT,
    resolve: {
      alias: {
        '@shared': '/src/@shared',
        '@context': '/src/@context',
        '@common': '/src/@common',
        '@hooks': '/src/@hooks',
        '@services': '/src/@services',
        '@utils': '/src/@utils',
        '@views': '/src/@views',
      },
    },
  };
});
