import type { Meta, StoryObj } from '@storybook/vue3';
import DsCarousel from '../components/DsCarousel.vue';

const meta: Meta<typeof DsCarousel> = {
    title: 'Data/DsCarousel',
    component: DsCarousel,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Carrossel com gradientes laterais e controles.'
            }
        }
    },
    argTypes: {
        autoScroll: { control: { type: 'number', min: 0, max: 10000, step: 500 }, description: 'Intervalo de auto-scroll em ms (0 para desativar)' },
        gradient: { control: 'boolean', description: 'Exibe gradientes laterais' }
    }
};

export default meta;
type Story = StoryObj<typeof DsCarousel>;

const slides = [
    { src: 'https://placehold.co/248x100/e2e8f0/64748b?text=Slide+1', alt: 'Slide 1' },
    { src: 'https://placehold.co/248x100/e2e8f0/64748b?text=Slide+2', alt: 'Slide 2' },
    { src: 'https://placehold.co/248x100/e2e8f0/64748b?text=Slide+3', alt: 'Slide 3' },
    { src: 'https://placehold.co/248x100/e2e8f0/64748b?text=Slide+4', alt: 'Slide 4' },
    { src: 'https://placehold.co/248x100/e2e8f0/64748b?text=Slide+5', alt: 'Slide 5' },
    { src: 'https://placehold.co/248x100/e2e8f0/64748b?text=Slide+6', alt: 'Slide 6' }
];

export const Default: Story = {
    render: () => ({
        components: { DsCarousel },
        setup() {
            return { slides };
        },
        template: `
            <div class="max-w-3xl">
                <DsCarousel :items="slides" />
            </div>
        `
    })
};
