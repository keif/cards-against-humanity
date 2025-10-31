import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), '');

	return {
		build: {
			outDir: 'dist',
			rollupOptions: {
				output: {
					manualChunks: {
						'react-vendor': ['react', 'react-dom', 'react-router-dom'],
						'dnd-vendor': ['react-dnd'],
						'socket-vendor': ['socket.io-client'],
					},
				},
			},
		},
		// vite config
		define: {
			__VITE_SERVER_URL__: JSON.stringify(env.VITE_SERVER_URL),
		},
		plugins: [
			react({
				include: ['**/*.tsx', '**/*.ts'],
			}),
			viteTsconfigPaths(),
			svgrPlugin(),
			visualizer({
				filename: './dist/stats.html',
				open: false,
				gzipSize: true,
				brotliSize: true,
			}),
		],
		server: {
			open: true,
			port: 3000,
			proxy: {
				// Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
				'/socket.io': {
					target: `ws://${JSON.stringify(env.VITE_SERVER_URL)}`,
					ws: true,
				},
			},
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/test/setup.ts',
			css: true,
		}
	}
});
