import type { Meta, StoryObj } from '@storybook/vue3';
import DsDataTable from '../components/DsDataTable.vue';

const meta: Meta<typeof DsDataTable> = {
    title: 'Data/DsDataTable',
    component: DsDataTable,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Tabela com busca, ordenacao e paginacao.'
            }
        }
    },
    argTypes: {
        loading: { control: 'boolean', description: 'Exibe skeleton de carregamento' },
        searchable: { control: 'boolean', description: 'Habilita campo de busca' },
        itemsPerPage: { control: { type: 'number', min: 5, max: 50 }, description: 'Quantidade de itens por pagina' },
        searchPlaceholder: { control: 'text', description: 'Placeholder do campo de busca' },
        noDataText: { control: 'text', description: 'Texto exibido quando nao ha dados' }
    }
};

export default meta;
type Story = StoryObj<typeof DsDataTable>;

const headers = [
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'city', label: 'Cidade' },
    { key: 'status', label: 'Status', align: 'center' as const }
];

const items = [
    { name: 'Maria Santos', email: 'maria@empresa.com', city: 'Sao Paulo', status: 'Ativo' },
    { name: 'Carlos Lima', email: 'carlos@empresa.com', city: 'Rio de Janeiro', status: 'Ativo' },
    { name: 'Ana Oliveira', email: 'ana@empresa.com', city: 'Belo Horizonte', status: 'Inativo' },
    { name: 'Pedro Costa', email: 'pedro@empresa.com', city: 'Curitiba', status: 'Ativo' },
    { name: 'Julia Ferreira', email: 'julia@empresa.com', city: 'Salvador', status: 'Ativo' },
    { name: 'Lucas Souza', email: 'lucas@empresa.com', city: 'Fortaleza', status: 'Pendente' },
    { name: 'Beatriz Rocha', email: 'beatriz@empresa.com', city: 'Recife', status: 'Ativo' },
    { name: 'Gabriel Martins', email: 'gabriel@empresa.com', city: 'Porto Alegre', status: 'Inativo' }
];

export const Default: Story = {
    render: () => ({
        components: { DsDataTable },
        setup() {
            return { headers, items };
        },
        template: `
            <DsDataTable :headers="headers" :items="items" :searchable="true" :items-per-page="5" />
        `
    })
};

export const Loading: Story = {
    args: {
        headers,
        items: [],
        loading: true,
        itemsPerPage: 5
    }
};

export const Vazia: Story = {
    name: 'Tabela vazia',
    args: {
        headers,
        items: [],
        itemsPerPage: 5
    }
};
