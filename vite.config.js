import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                manualChunks: {
                    algorithms: [
                        './src/static/js/algorithms/sorting.js',
                        './src/static/js/algorithms/sorting-extended.js',
                        './src/static/js/algorithms/sorting-meme.js',
                        './src/static/js/algorithms/searching.js',
                        './src/static/js/algorithms/trees.js',
                        './src/static/js/algorithms/graphs.js',
                        './src/static/js/algorithms/linked-lists.js',
                        './src/static/js/algorithms/maze.js',
                    ],
                },
            },
        },
    },
    test: {
        environment: 'node',
        include: ['tests/**/*.test.js'],
    },
});
