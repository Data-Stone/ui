import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],

    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        '@chromatic-com/storybook'
    ],

    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },

    docs: {
        autodocs: 'tag'
    },

    typescript: {
        check: false,
        reactDocgen: false
    },

    viteFinal: async (config) => {
        const path = await import('node:path');
        const reactDir = path.dirname(require.resolve('react/package.json'));
        const reactDomDir = path.dirname(require.resolve('react-dom/package.json'));

        // Garante que @data-stone/ui resolva para o próprio pacote
        config.resolve = config.resolve ?? {};
        config.resolve.alias = {
            ...(config.resolve.alias ?? {}),
            '@data-stone/ui': fileURLToPath(new URL('../index.ts', import.meta.url)),
            // Força instância única de React (evita "useContext is null" em MDX docs)
            react: reactDir,
            'react/jsx-runtime': path.join(reactDir, 'jsx-runtime.js'),
            'react/jsx-dev-runtime': path.join(reactDir, 'jsx-dev-runtime.js'),
            'react-dom': reactDomDir
        };

        // Garante que o plugin Vue está presente (necessário para .vue files)
        const vue = (await import('@vitejs/plugin-vue')).default;
        const tailwind = (await import('@tailwindcss/vite')).default;
        config.plugins ??= [];
        config.plugins.push(vue(), tailwind());

        return config;
    }
};

export default config;
