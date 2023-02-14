import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { FaAdn, FaAffiliatetheme, FaAirbnb } from 'react-icons/fa';

import Tab from '@/components/tabs/Tabs';

export default {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

const tabs = [
  {
    label: 'Tab One',
    value: 'Tab1',
  },
  {
    label: 'Tab Two',
    value: 'Tab2',
  },
  {
    label: 'Tab Three',
    value: 'Tab3',
  },
];
export const Default = Template.bind({});
Default.args = {
  tabs,
};

const tabs2 = [
  {
    label: 'Tab One',
    value: 'tab1',
    icon: <FaAdn />,
  },
  {
    label: 'Tab Two',
    value: 'tab2',
    icon: <FaAffiliatetheme />,
  },
  {
    label: 'Tab Three',
    value: 'tab3',
    icon: <FaAirbnb />,
  },
];
const WithContent = () => {
  const [tab, setTab] = useState('tab1');
  return (
    <Tab value={tab} defaultValue={tab} tabs={tabs2} onValueChange={(v) => setTab(v)}>
      <div className="h-full p-2 dark:text-white">
        You are now on {tabs2.find((t) => t.value === tab)?.label}
      </div>
    </Tab>
  );
};
export const TabWithContent = WithContent.bind({});
const WithBackgroundComp = () => {
  const [tab, setTab] = useState('tab1');
  return (
    <Tab
      value={tab}
      defaultValue={tab}
      tabs={tabs2}
      onValueChange={(v) => setTab(v)}
      variant={'tab'}
    >
      <div className="h-full p-2 dark:text-white">
        You are now on {tabs2.find((t) => t.value === tab)?.label}
      </div>
    </Tab>
  );
};
export const TabWithBackground = WithBackgroundComp.bind({});

export const DefaultXS = Template.bind({});
DefaultXS.args = {
  tabs,
  variant: 'tab',
  size: 'xs',
};
export const DefaultSM = Template.bind({});
DefaultSM.args = {
  tabs,
  variant: 'tab',
  size: 'sm',
};

export const DefaultMD = Template.bind({});
DefaultMD.args = {
  tabs,
  variant: 'tab',
  size: 'md',
};

export const DefaultLG = Template.bind({});
DefaultLG.args = {
  tabs,
  variant: 'tab',
  size: 'lg',
};

export const DefaultXL = Template.bind({});
DefaultXL.args = {
  tabs,
  variant: 'tab',
  size: 'xl',
};
