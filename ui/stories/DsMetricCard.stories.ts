import type { Meta, StoryObj } from '@storybook/vue3';
import DsMetricCard from '../components/DsMetricCard.vue';

const meta: Meta<typeof DsMetricCard> = {
    title: 'Data/DsMetricCard',
    component: DsMetricCard,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Card de metrica com icone, skeleton e badge. Baseado no MetricCard do Data Reveal.'
            }
        }
    },
    argTypes: {
        icon: { control: 'text', description: 'Nome do icone exibido no card' },
        title: { control: 'text', description: 'Titulo da metrica' },
        value: { control: 'text', description: 'Valor numerico ou texto da metrica' },
        tooltipText: { control: 'text', description: 'Texto exibido no tooltip de ajuda' },
        loading: { control: 'boolean', description: 'Exibe skeleton de carregamento' },
        badge: { control: 'object', description: 'Badge opcional com text e color' }
    }
};

export default meta;
type Story = StoryObj<typeof DsMetricCard>;

export const Default: Story = {
    args: {
        icon: 'i-heroicons-chart-bar',
        title: 'Visitantes online',
        value: '42',
        tooltipText: 'Visitantes navegando agora'
    }
};

export const ComBadge: Story = {
    name: 'Com badge',
    args: {
        icon: 'i-heroicons-chart-bar',
        title: 'Visitantes online',
        value: '42',
        tooltipText: 'Visitantes navegando agora',
        badge: { text: 'ATIVO', color: 'green' as const }
    }
};

export const Loading: Story = {
    args: {
        icon: 'i-heroicons-chart-bar',
        title: 'Visitantes online',
        value: '',
        tooltipText: '',
        loading: true
    }
};
