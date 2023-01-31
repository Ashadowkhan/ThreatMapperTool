import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CircleSpinner } from '@/components/spinner/CircleSpinner';

export default {
  title: 'Components/CircleSpinner',
  component: CircleSpinner,
} as ComponentMeta<typeof CircleSpinner>;

const Template: ComponentStory<typeof CircleSpinner> = (args) => (
  <CircleSpinner {...args} />
);

export const DefaultXS = Template.bind({});
DefaultXS.args = {
  size: 'xs',
};

export const DefaultSM = Template.bind({});
DefaultSM.args = {
  size: 'sm',
};

export const Default = Template.bind({});
Default.args = {};
