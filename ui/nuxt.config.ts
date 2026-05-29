/**
 * Nuxt Layer — @data-stone/ui
 *
 * Cada frontend extends este layer via:
 *   defineNuxtConfig({ extends: ['@data-stone/ui'] })
 *
 * Auto-importa todos os componentes Ds* e injeta tokens.css.
 */
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
    css: [fileURLToPath(new URL('./assets/css/tokens.css', import.meta.url))],

    components: [
        {
            path: fileURLToPath(new URL('./components', import.meta.url)),
            prefix: '',
            pathPrefix: false,
            global: true
        }
    ],

    imports: {
        dirs: [fileURLToPath(new URL('./composables', import.meta.url))]
    }
});
