import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const datastone = create({
    base: 'light',
    brandTitle: 'Data Stone · Design System',
    brandUrl: '/',
    brandTarget: '_self',

    colorPrimary: '#436fbe',
    colorSecondary: '#14467b',

    appBg: '#f8fafc',
    appContentBg: '#ffffff',
    appBorderColor: '#e2e8f0',
    appBorderRadius: 8,

    fontBase: '"DM Sans", system-ui, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, monospace',

    textColor: '#0f172a',
    textInverseColor: '#ffffff',

    barTextColor: '#475569',
    barSelectedColor: '#436fbe',
    barBg: '#ffffff'
});

addons.setConfig({
    theme: datastone,
    sidebar: {
        showRoots: true
    }
});
