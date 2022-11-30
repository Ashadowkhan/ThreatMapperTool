import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import {
  HiInboxIn,
  HiInformationCircle,
  HiLogout,
  HiPencilAlt,
  HiUserAdd,
} from 'react-icons/hi';

import Button from '../button/Button';
import { Dropdown, DropdownItem, DropdownSeparator } from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    align: {
      defaultValue: undefined,
      options: [undefined, 'start', 'center', 'end'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Dropdown>;

const DefaultTemplate: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <Dropdown
      {...args}
      content={
        <>
          <DropdownItem>First Action</DropdownItem>
          <DropdownItem>Second Action</DropdownItem>
          <DropdownItem>Third Action</DropdownItem>
          <DropdownItem>Fourth Action</DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="text-red-500 dark:text-red-500">Sign Out</DropdownItem>
        </>
      }
    >
      <Button color="primary">Click me</Button>
    </Dropdown>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  triggerAsChild: true,
};

const TemplateForIcons: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <Dropdown
      {...args}
      content={
        <>
          <DropdownItem>
            <IconContext.Provider value={{ size: '18px' }}>
              <HiUserAdd />
            </IconContext.Provider>
            <span>First Action</span>
          </DropdownItem>
          <DropdownItem>
            <IconContext.Provider value={{ size: '18px' }}>
              <HiInboxIn />
            </IconContext.Provider>
            <span>Second Action</span>
          </DropdownItem>
          <DropdownItem>
            <IconContext.Provider value={{ size: '18px' }}>
              <HiInformationCircle />
            </IconContext.Provider>
            <span>Third Action</span>
          </DropdownItem>
          <DropdownItem>
            <IconContext.Provider value={{ size: '18px' }}>
              <HiPencilAlt />
            </IconContext.Provider>
            <span>Fourth Action</span>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="text-red-500 dark:text-red-500">
            <IconContext.Provider value={{ size: '18px' }}>
              <HiLogout />
            </IconContext.Provider>
            <span>Sign Out</span>
          </DropdownItem>
        </>
      }
    >
      <Button color="primary">Click me</Button>
    </Dropdown>
  );
};

export const WithIcons = TemplateForIcons.bind({});
WithIcons.args = {
  triggerAsChild: true,
};

const ControlledTemplate: ComponentStory<typeof Dropdown> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      {...args}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      content={
        <>
          <DropdownItem>First Action</DropdownItem>
          <DropdownItem>Second Action</DropdownItem>
          <DropdownItem>Third Action</DropdownItem>
          <DropdownItem>Fourth Action</DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="text-red-500 dark:text-red-500">Sign Out</DropdownItem>
        </>
      }
    >
      <Button color="primary">Click me</Button>
    </Dropdown>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  triggerAsChild: true,
};
