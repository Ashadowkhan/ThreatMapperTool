import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Combobox, ComboboxOption } from '@/components/select/Combobox';

export default {
  title: 'Components/Combobox',
  component: Combobox,
} as Meta<typeof Combobox>;

const OPTIONS = [
  {
    name: 'John',
    id: '1',
    age: 20,
  },
  {
    name: 'Jane',
    id: '2',
    age: 21,
  },
  {
    name: 'John',
    id: '1',
    age: 20,
  },
  {
    name: 'Jane',
    id: '2',
    age: 21,
  },
  {
    name: 'John',
    id: '1',
    age: 20,
  },
  {
    name: 'Jane',
    id: '2',
    age: 21,
  },
  {
    name: 'John',
    id: '1',
    age: 20,
  },
  {
    name: 'Jane',
    id: '2',
    age: 21,
  },
  {
    name: 'John',
    id: '1',
    age: 20,
  },
  {
    name: 'Jane',
    id: '2',
    age: 21,
  },
];

const SingleSelectNullableTemplate: StoryFn<typeof Combobox> = () => {
  const [selected, setSelected] = useState<(typeof OPTIONS)[number] | null>(null);
  const [options, setOptions] = useState<typeof OPTIONS>([...OPTIONS]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');

  function fetchMoreData() {
    // we can use query here as well
    setLoading(true);
    setTimeout(() => {
      setOptions([...options, ...OPTIONS]);
      setLoading(false);
    }, 1000);
  }

  return (
    <Combobox
      value={selected}
      nullable
      onQueryChange={(query) => {
        setQuery(query);
      }}
      label="Select your value"
      onChange={(value) => {
        setSelected(value);
      }}
      getDisplayValue={(item) => item?.name ?? ''}
      onEndReached={() => {
        fetchMoreData();
      }}
      loading={loading}
    >
      {options.map((person, index) => {
        return (
          <ComboboxOption key={`${person.id}-${index}`} value={person}>
            {person.name}
          </ComboboxOption>
        );
      })}
    </Combobox>
  );
};

export const SingleSelectNullable = {
  render: SingleSelectNullableTemplate,
  args: {},
};

const SingleSelectNonNullableTemplate: StoryFn<typeof Combobox> = () => {
  const [selected, setSelected] = useState<(typeof OPTIONS)[number]>(OPTIONS[0]);
  const [options, setOptions] = useState<typeof OPTIONS>([...OPTIONS]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');

  function fetchMoreData() {
    // we can use query here as well
    setLoading(true);
    setTimeout(() => {
      setOptions([...options, ...OPTIONS]);
      setLoading(false);
    }, 1000);
  }

  return (
    <Combobox
      value={selected}
      onQueryChange={(query) => {
        setQuery(query);
      }}
      label="Select your value"
      onChange={(value) => {
        setSelected(value);
      }}
      getDisplayValue={(item) => item.name}
      onEndReached={() => {
        fetchMoreData();
      }}
      loading={loading}
    >
      {options.map((person, index) => {
        return (
          <ComboboxOption key={`${person.id}-${index}`} value={person}>
            {person.name}
          </ComboboxOption>
        );
      })}
    </Combobox>
  );
};

export const SingleSelectNonNullable = {
  render: SingleSelectNonNullableTemplate,
  args: {},
};

const MultiSelectNullableTemplate: StoryFn<typeof Combobox> = () => {
  const [selected, setSelected] = useState<typeof OPTIONS>([]);
  const [options, setOptions] = useState<typeof OPTIONS>([...OPTIONS]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');

  function fetchMoreData() {
    // we can use query here as well
    setLoading(true);
    setTimeout(() => {
      setOptions([...options, ...OPTIONS]);
      setLoading(false);
    }, 100000);
  }

  return (
    <Combobox
      value={selected}
      onQueryChange={(query) => {
        setQuery(query);
      }}
      label="Select your value"
      onChange={(value) => {
        setSelected(value);
      }}
      multiple
      nullable
      getDisplayValue={(item) => item?.map((i) => i.name).join(',') ?? ''}
      onEndReached={() => {
        fetchMoreData();
      }}
      loading={loading}
    >
      {options.map((person, index) => {
        return (
          <ComboboxOption key={`${person.id}-${index}`} value={person}>
            {person.name}
          </ComboboxOption>
        );
      })}
    </Combobox>
  );
};

export const MultiSelectNullable = {
  render: MultiSelectNullableTemplate,
  args: {},
};

const MultiSelectNonNullableTemplate: StoryFn<typeof Combobox> = () => {
  const [selected, setSelected] = useState<typeof OPTIONS>([]);
  const [options, setOptions] = useState<typeof OPTIONS>([...OPTIONS]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');

  function fetchMoreData() {
    // we can use query here as well
    setLoading(true);
    setTimeout(() => {
      setOptions([...options, ...OPTIONS]);
      setLoading(false);
    }, 1000);
  }

  return (
    <Combobox
      value={selected}
      onQueryChange={(query) => {
        setQuery(query);
      }}
      label="Select your value"
      onChange={(value) => {
        setSelected(value);
      }}
      multiple
      getDisplayValue={(item) => ''}
      onEndReached={() => {
        fetchMoreData();
      }}
      loading={loading}
    >
      {options.map((person, index) => {
        return (
          <ComboboxOption key={`${person.id}-${index}`} value={person}>
            {person.name}
          </ComboboxOption>
        );
      })}
    </Combobox>
  );
};

export const MultiSelectNonNullable = {
  render: MultiSelectNonNullableTemplate,
  args: {},
};
