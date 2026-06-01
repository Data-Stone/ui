import type { Meta, StoryObj } from '@storybook/vue3';
import DsDetailItem from '../components/DsDetailItem.vue';

const meta: Meta<typeof DsDetailItem> = {
    title: 'Data/DsDetailItem',
    component: DsDetailItem,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Linha de detalhe com icone + label + valor.'
            }
        }
    },
    argTypes: {
        icon: { control: 'text', description: 'Nome do icone exibido na linha' },
        label: { control: 'text', description: 'Label descritivo do campo' }
    }
};

export default meta;
type Story = StoryObj<typeof DsDetailItem>;

export const Default: Story = {
    render: () => ({
        components: { DsDetailItem },
        template: `
            <div class="w-96">
                <DsDetailItem icon="i-heroicons-chart-bar" label="Email">usuario@empresa.com</DsDetailItem>
            </div>
        `
    })
};

export const MultipleItems: Story = {
    name: 'Multiplos itens',
    render: () => ({
        components: { DsDetailItem },
        template: `
            <div class="w-96 space-y-3">
                <DsDetailItem icon="i-heroicons-envelope" label="Email">usuario@empresa.com</DsDetailItem>
                <DsDetailItem icon="i-heroicons-phone" label="Telefone">(11) 99999-1234</DsDetailItem>
                <DsDetailItem icon="i-heroicons-map-pin" label="Cidade">Sao Paulo, SP</DsDetailItem>
            </div>
        `
    })
};
