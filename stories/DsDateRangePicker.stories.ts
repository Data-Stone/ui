import type { Meta, StoryObj } from '@storybook/vue3';
import DsDateRangePicker from '../components/DsDateRangePicker.vue';
import { ref } from 'vue';

const meta: Meta<typeof DsDateRangePicker> = {
    title: 'Form/DsDateRangePicker',
    component: DsDateRangePicker,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Seletor de periodo com presets pt-BR.'
            }
        }
    },
    argTypes: {
        placeholder: { control: 'text', description: 'Texto exibido quando nenhum periodo esta selecionado' }
    }
};

export default meta;
type Story = StoryObj<typeof DsDateRangePicker>;

export const Default: Story = {
    render: () => ({
        components: { DsDateRangePicker },
        setup() {
            const range = ref({ start: '', end: '' });
            return { range };
        },
        template: `
            <div class="min-h-[400px]">
                <DsDateRangePicker v-model="range" />
                <p class="mt-4 text-sm text-gray-500">Valor: {{ JSON.stringify(range) }}</p>
            </div>
        `
    })
};

export const ComValor: Story = {
    name: 'Com valor inicial',
    render: () => ({
        components: { DsDateRangePicker },
        setup() {
            const range = ref({ start: '2024-01-01', end: '2024-01-31' });
            return { range };
        },
        template: `
            <div class="min-h-[400px]">
                <DsDateRangePicker v-model="range" />
                <p class="mt-4 text-sm text-gray-500">Valor: {{ JSON.stringify(range) }}</p>
            </div>
        `
    })
};
