import type { Meta, StoryObj } from '@storybook/vue3';
import DsPasswordInput from '../components/DsPasswordInput.vue';
import { ref } from 'vue';

const meta: Meta<typeof DsPasswordInput> = {
    title: 'Form/DsPasswordInput',
    component: DsPasswordInput,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Input de senha com barra de forca e requisitos.'
            }
        }
    },
    argTypes: {
        label: { control: 'text', description: 'Label exibido acima do input' },
        placeholder: { control: 'text', description: 'Placeholder do campo de senha' }
    }
};

export default meta;
type Story = StoryObj<typeof DsPasswordInput>;

export const Default: Story = {
    render: (args) => ({
        components: { DsPasswordInput },
        setup() {
            const password = ref('');
            return { args, password };
        },
        template: `
            <div class="w-80">
                <DsPasswordInput v-bind="args" v-model="password" />
                <p class="mt-3 text-xs text-gray-500">Valor: {{ password }}</p>
            </div>
        `
    })
};

export const ComValor: Story = {
    name: 'Com valor pre-preenchido',
    render: (args) => ({
        components: { DsPasswordInput },
        setup() {
            const password = ref('Test123!');
            return { args, password };
        },
        template: `
            <div class="w-80">
                <DsPasswordInput v-bind="args" v-model="password" />
                <p class="mt-3 text-xs text-gray-500">Valor: {{ password }}</p>
            </div>
        `
    })
};
