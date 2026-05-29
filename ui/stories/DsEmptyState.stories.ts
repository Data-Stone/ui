import type { Meta, StoryObj } from '@storybook/vue3';
import DsEmptyState from '../components/DsEmptyState.vue';

const meta: Meta<typeof DsEmptyState> = {
    title: 'Feedback/DsEmptyState',
    component: DsEmptyState,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Estado vazio generico com icone, titulo, descricao e acao.'
            }
        }
    },
    argTypes: {
        icon: { control: 'text', description: 'Nome do icone (ex: i-heroicons-*)' },
        title: { control: 'text', description: 'Titulo exibido no estado vazio' },
        description: { control: 'text', description: 'Texto descritivo abaixo do titulo' },
        actionLabel: { control: 'text', description: 'Label do botao de acao (opcional)' }
    }
};

export default meta;
type Story = StoryObj<typeof DsEmptyState>;

export const Default: Story = {
    args: {
        icon: 'i-heroicons-magnifying-glass',
        title: 'Nenhum resultado',
        description: 'Nao encontramos dados para o filtro selecionado.',
        actionLabel: 'Limpar filtros'
    }
};

export const SemAcao: Story = {
    name: 'Sem acao',
    args: {
        icon: 'i-heroicons-magnifying-glass',
        title: 'Nenhum resultado',
        description: 'Nao encontramos dados para o filtro selecionado.'
    }
};
