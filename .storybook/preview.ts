import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { UCard, UIcon, UBadge, UTooltip, USkeleton, UButton, UProgress, UCollapsible } from './nuxt-ui-stubs';

// Importar componentes DS que são usados como dependência de outros
import DsSectionBadge from '../components/DsSectionBadge.vue';

import './storybook.css';

setup((app) => {
    app.component('UCard', UCard);
    app.component('UIcon', UIcon);
    app.component('UBadge', UBadge);
    app.component('UTooltip', UTooltip);
    app.component('USkeleton', USkeleton);
    app.component('UButton', UButton);
    app.component('UProgress', UProgress);
    app.component('UCollapsible', UCollapsible);
    // DS components usados como dependência
    app.component('DsSectionBadge', DsSectionBadge);
});

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        backgrounds: {
            default: 'app',
            values: [
                { name: 'app',     value: '#ffffff' },
                { name: 'muted',   value: '#f8fafc' },
                { name: 'sidebar', value: '#14467b' },
                { name: 'dark',    value: '#0b1224' }
            ]
        },
        layout: 'centered',
        docs: {
            toc: true
        },
        options: {
            storySort: {
                order: ['Introdução', ['Visão geral', 'Instalação', 'Arquitetura', 'Design Tokens', 'Contribuição'], '*']
            }
        }
    },

    globalTypes: {
        theme: {
            description: 'Tema visual da aplicação',
            defaultValue: 'light',
            toolbar: {
                title: 'Tema',
                icon: 'paintbrush',
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark',  title: 'Dark' }
                ],
                dynamicTitle: true
            }
        }
    },

    decorators: [
        (story, context) => {
            const theme = context.globals.theme || 'light';
            if (typeof document !== 'undefined') {
                document.documentElement.classList.toggle('dark', theme === 'dark');
            }
            return { components: { story }, template: '<story />' };
        }
    ]
};

export default preview;
