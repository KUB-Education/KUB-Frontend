import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import eslint from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    svgrPlugin({
      svgrOptions: {
        prettier: false,
        svgo: false,
        svgoConfig: {
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        },
        titleProp: true,
        ref: true,
      },
    }),
  ],
});
