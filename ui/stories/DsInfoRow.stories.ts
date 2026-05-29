import type { Meta, StoryObj } from '@storybook/vue3';
import DsInfoRow from '../components/DsInfoRow.vue';

const meta: Meta<typeof DsInfoRow> = {
    title: 'Data/DsInfoRow',
    component: DsInfoRow,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Linha compacta de info com tooltip.'
            }
        }
    },
    argTypes: {
        icon: { control: 'text', description: 'Nome do icone exibido na linha' },
        text: { control: 'text', description: 'Texto principal da linha' },
        tooltip: { control: 'text', description: 'Texto exibido no tooltip do icone' },
        italic: { control: 'boolean', description: 'Aplica estilo italico ao texto' }
    }
};

export default meta;
type Story = StoryObj<typeof DsInfoRow>;

export const Default: Story = {
    args: {
        icon: 'i-heroicons-chart-bar',
        text: 'Sao Paulo, SP',
        tooltip: 'Localizacao'
    }
};

export const Italico: Story = {
    name: 'Com texto italico',
    args: {
        icon: 'i-heroicons-chart-bar',
        text: 'Sao Paulo, SP',
        tooltip: 'Localizacao',
        italic: true
    }
};

export const SemTexto: Story = {
    name: 'Sem texto (fallback)',
    args: {
        icon: 'i-heroicons-chart-bar',
        tooltip: 'Informacao indisponivel'
    }
};
