import type { Meta, StoryObj } from '@storybook/vue3';
import DsStepper from '../components/DsStepper.vue';
import { ref } from 'vue';

const meta: Meta<typeof DsStepper> = {
    title: 'Navigation/DsStepper',
    component: DsStepper,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Indicador de progresso multi-etapa.'
            }
        }
    },
    argTypes: {
        orientation: { control: { type: 'inline-radio' }, options: ['horizontal', 'vertical'], description: 'Orientacao do stepper' }
    }
};

export default meta;
type Story = StoryObj<typeof DsStepper>;

const steps = [
    { title: 'Dados pessoais', description: 'Nome, email e telefone' },
    { title: 'Dados da empresa', description: 'CNPJ e razao social' },
    { title: 'Plano', description: 'Escolha seu plano' },
    { title: 'Confirmacao', description: 'Revise e confirme' }
];

export const Default: Story = {
    render: () => ({
        components: { DsStepper },
        setup() {
            const current = ref(1);
            return { current, steps };
        },
        template: `
            <div class="max-w-2xl">
                <DsStepper v-model="current" :items="steps" />
                <div class="flex gap-2 mt-6">
                    <button class="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700" :disabled="current <= 0" @click="current--">Voltar</button>
                    <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm" :disabled="current >= steps.length - 1" @click="current++">Proximo</button>
                </div>
                <p class="mt-2 text-sm text-gray-500">Step atual: {{ current }}</p>
            </div>
        `
    })
};

export const Vertical: Story = {
    render: () => ({
        components: { DsStepper },
        setup() {
            const current = ref(1);
            return { current, steps };
        },
        template: `
            <div class="max-w-xs">
                <DsStepper v-model="current" :items="steps" orientation="vertical" />
            </div>
        `
    })
};
