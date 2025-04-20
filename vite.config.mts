import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import * as fs from 'fs';
import * as path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolveApp('src'),
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
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
