import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaAmazon } from 'react-icons/fa';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button text md',
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  children: 'Default Disabled md size button',
  disabled: true,
};

export const DefaultTextXs = Template.bind({});
DefaultTextXs.args = {
  children: 'Button text',
  size: 'xs',
};

export const DefaultTextLg = Template.bind({});
DefaultTextLg.args = {
  children: 'Button text',
  size: 'lg',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button text',
  color: 'primary',
  size: 'xs',
};

export const PrimaryWithOutline = Template.bind({});
PrimaryWithOutline.args = {
  children: 'Button text',
  color: 'primary',
  size: 'xs',
  outline: true,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Button text',
  color: 'danger',
  size: 'xs',
};

export const DangerWithOutline = Template.bind({});
DangerWithOutline.args = {
  children: 'Button text',
  color: 'danger',
  size: 'xs',
  outline: true,
};

export const Success = Template.bind({});
Success.args = {
  children: 'Button text',
  color: 'success',
  size: 'xs',
};

export const SuccessWithOutline = Template.bind({});
SuccessWithOutline.args = {
  children: 'Button text',
  color: 'success',
  size: 'xs',
  outline: true,
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  children: 'Button text',
  color: 'primary',
  size: 'xs',
  startIcon: <FaAmazon />,
};

export const PrimaryWithBothIcon = Template.bind({});
PrimaryWithBothIcon.args = {
  children: 'Button text',
  color: 'primary',
  size: 'xs',
  startIcon: <FaAmazon />,
  endIcon: <FaAmazon />,
};

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  children: 'Button text',
  size: 'xs',
  startIcon: <FaAmazon />,
};

export const DefaultOutlineWithIcon = Template.bind({});
DefaultOutlineWithIcon.args = {
  children: 'Button text',
  outline: true,
  size: 'xs',
  startIcon: <FaAmazon />,
};

export const DangerWithIcon = Template.bind({});
DangerWithIcon.args = {
  children: 'Button text',
  color: 'danger',
  size: 'xs',
  startIcon: <FaAmazon />,
};

export const DangerWithOutlineIcon = Template.bind({});
DangerWithOutlineIcon.args = {
  children: 'Button text',
  color: 'danger',
  outline: true,
  size: 'xs',
  startIcon: <FaAmazon />,
};
