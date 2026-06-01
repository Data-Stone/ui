import type { Meta, StoryObj } from '@storybook/vue3';
import DsConfirmModal from '../components/DsConfirmModal.vue';
import { ref } from 'vue';

const meta: Meta<typeof DsConfirmModal> = {
    title: 'Overlay/DsConfirmModal',
    component: DsConfirmModal,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Modal de confirmacao para acoes destrutivas.'
            }
        }
    },
    argTypes: {
        title: { control: 'text', description: 'Titulo do modal' },
        message: { control: 'text', description: 'Mensagem exibida no corpo do modal' },
        confirmText: { control: 'text', description: 'Texto do botao de confirmacao' },
        cancelText: { control: 'text', description: 'Texto do botao de cancelar' },
        icon: { control: 'text', description: 'Icone exibido ao lado do titulo' },
        variant: { control: { type: 'inline-radio' }, options: ['danger', 'primary'], description: 'Variante visual do modal' },
        loading: { control: 'boolean', description: 'Exibe estado de carregamento no botao' }
    }
};

export default meta;
type Story = StoryObj<typeof DsConfirmModal>;

export const Default: Story = {
    args: {
        title: 'Excluir registro',
        message: 'Tem certeza que deseja excluir? Esta acao nao pode ser desfeita.',
        confirmText: 'Excluir',
        icon: 'i-heroicons-x-mark',
        variant: 'danger'
    },
    render: (args) => ({
        components: { DsConfirmModal },
        setup() {
            const open = ref(false);
            return { args, open };
        },
        template: `
            <div>
                <button class="px-4 py-2 bg-blue-600 text-white rounded" @click="open = true">Abrir modal</button>
                <DsConfirmModal v-bind="args" v-model="open" />
            </div>
        `
    })
};
