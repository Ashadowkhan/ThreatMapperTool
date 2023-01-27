import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RowSelectionState, SortingState } from '@tanstack/react-table';
import { sortBy } from 'lodash-es';
import { useMemo, useRef, useState } from 'react';

import {
  createColumnHelper,
  getRowExpanderColumn,
  getRowSelectionColumn,
  Table,
  TableInstance,
} from '@/components/table/Table';
import { TableSkeleton } from '@/components/table/TableSkeleton';

export default {
  title: 'Components/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

type Fruit = {
  id: number;
  name: string;
  taste: string;
};

const Template: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();

  const checkboxRow = getRowSelectionColumn(columnHelper, {
    size: 100,
    minSize: 100,
    maxSize: 100,
  });
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
      }),
    ],
    [],
  );
  if (args.enableRowSelection) {
    columns.unshift(checkboxRow);
  }
  return (
    <Table
      {...args}
      data={[
        {
          id: 1,
          name: 'Apple',
          taste: 'Apply',
        },
        {
          id: 2,
          name: 'Peach',
          taste: 'Peachy',
        },
        {
          id: 3,
          name: 'Pineapple',
          taste: 'Sweet!',
        },
      ]}
      columns={columns}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const SmallTable = Template.bind({});
SmallTable.args = {
  size: 'sm',
  enableRowSelection: true,
  rowSelectionState: {},
  onRowSelectionChange: () => {
    return false;
  },
};

export const StripedTable = Template.bind({});
StripedTable.args = {
  striped: true,
};

const TemplateWithSubcomponent: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();

  const columns = useMemo(
    () => [
      getRowExpanderColumn(columnHelper, {
        minSize: 10,
        size: 10,
        maxSize: 10,
      }),
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
      }),
    ],
    [],
  );
  return (
    <Table
      {...args}
      data={[
        {
          id: 1,
          name: 'Apple',
          taste: 'Apply',
        },
        {
          id: 2,
          name: 'Peach',
          taste: 'Peachy',
        },
        {
          id: 3,
          name: 'Pineapple',
          taste: 'Sweet!',
        },
      ]}
      columns={columns}
      getRowCanExpand={() => {
        return true;
      }}
      renderSubComponent={({ row }) => {
        return (
          <pre className="dark:text-gray-200">
            {JSON.stringify(row.original, null, 2)}
          </pre>
        );
      }}
    />
  );
};

export const DefaultWithSubcomponent = TemplateWithSubcomponent.bind({});
DefaultWithSubcomponent.args = {};

export const StripedWithSubcomponent = TemplateWithSubcomponent.bind({});
StripedWithSubcomponent.args = {
  striped: true,
};

const TemplateWithAutoPagination: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();
  const tableInstanceRef = useRef<TableInstance<Fruit> | null>(null);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    const data: Fruit[] = [];
    for (let i = 0; i < 995; i++) {
      data.push({
        id: i,
        name: `Fruit ${i}`,
        taste: `Taste ${i}`,
      });
    }
    return data;
  }, []);

  return (
    <Table
      {...args}
      data={data}
      columns={columns}
      enablePagination
      ref={tableInstanceRef}
    />
  );
};

export const DefaultWithAutoPagination = TemplateWithAutoPagination.bind({});
DefaultWithAutoPagination.args = {};

const TemplateWithManualPagination: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    const data: Fruit[] = [];
    for (let i = 0; i < 995; i++) {
      data.push({
        id: i,
        name: `Fruit ${i}`,
        taste: `Taste ${i}`,
      });
    }
    return data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }, [pageIndex]);

  return (
    <Table
      {...args}
      data={data}
      columns={columns}
      enablePagination
      manualPagination
      totalRows={995}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPaginationChange={setPagination}
    />
  );
};

export const DefaultWithManualPagination = TemplateWithManualPagination.bind({});
DefaultWithManualPagination.args = {};

export const WithColumnResizing = TemplateWithManualPagination.bind({});
WithColumnResizing.args = { enableColumnResizing: true };

const TemplateWithAutoSorting: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
        enableSorting: false,
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    const data: Fruit[] = [];
    for (let i = 0; i < 995; i++) {
      data.push({
        id: i,
        name: `Fruit ${i}`,
        taste: `Taste ${i}`,
      });
    }
    return data;
  }, []);
  return <Table {...args} data={data} columns={columns} enablePagination enableSorting />;
};

export const DefaultWithAutoSorting = TemplateWithAutoSorting.bind({});
DefaultWithAutoSorting.args = {};

const TemplateWithManualSorting: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sort, setSort] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    let data: Fruit[] = [];

    for (let i = 0; i < 995; i++) {
      data.push({
        id: i,
        name: `Fruit ${i}`,
        taste: `Taste ${i}`,
      });
    }

    if (sort.length) {
      data = sortBy(data, [sort[0].id]);
      if (sort[0].desc) {
        data.reverse();
      }
    }
    return data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }, [pageIndex, sort]);

  return (
    <Table
      {...args}
      data={data}
      columns={columns}
      enablePagination
      manualPagination
      totalRows={995}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPaginationChange={setPagination}
      enableSorting
      manualSorting
      sortingState={sort}
      onSortingChange={setSort}
    />
  );
};

export const DefaultWithManualSorting = TemplateWithManualSorting.bind({});
DefaultWithManualSorting.args = {};

const TemplateWithRowSelection: ComponentStory<typeof Table<Fruit>> = (args) => {
  const columnHelper = createColumnHelper<Fruit>();
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});

  const columns = useMemo(
    () => [
      getRowSelectionColumn(columnHelper, {
        size: 100,
        minSize: 100,
        maxSize: 100,
      }),
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
        size: 1500,
        minSize: 1000,
        maxSize: 2000,
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        size: 1500,
        minSize: 1000,
        maxSize: 2000,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
        size: 1500,
        minSize: 1000,
        maxSize: 2000,
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    const data: Fruit[] = [];
    for (let i = 0; i < 995; i++) {
      data.push({
        id: i,
        name: `Fruit ${i}`,
        taste: `Taste ${i}`,
      });
    }
    return data;
  }, []);
  return (
    <>
      <div data-testid="selected-rows">
        {Object.keys(rowSelectionState)
          .map((id) => `"${id}"`)
          .join(', ')}
      </div>
      <Table
        {...args}
        data={data}
        columns={columns}
        enablePagination
        enableSorting
        enableRowSelection
        rowSelectionState={rowSelectionState}
        onRowSelectionChange={setRowSelectionState}
        getRowId={({ id }) => {
          return `id-${id}`;
        }}
      />
    </>
  );
};

export const DefaultWithRowSelection = TemplateWithRowSelection.bind({});
DefaultWithRowSelection.args = {};

type NestedFruit = Fruit & {
  fruits?: NestedFruit[];
};

const TemplateWithSubRows: ComponentStory<typeof Table<NestedFruit>> = (args) => {
  const columnHelper = createColumnHelper<NestedFruit>();
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});

  const columns = useMemo(
    () => [
      getRowExpanderColumn(columnHelper),
      getRowSelectionColumn(columnHelper, {
        size: 100,
        minSize: 100,
        maxSize: 100,
      }),
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
        size: 1500,
        minSize: 1000,
        maxSize: 2000,
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        size: 1500,
        minSize: 1000,
        maxSize: 2000,
      }),
      columnHelper.accessor('taste', {
        header: () => 'Taste',
        cell: (info) => info.renderValue(),
        size: 1500,
        minSize: 1000,
        maxSize: 2000,
      }),
    ],
    [],
  );

  const data = useMemo(() => {
    const data: NestedFruit[] = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i,
        name: `Fruit ${i}`,
        taste: `Taste ${i}`,
        fruits: [
          { id: (i + 1) * 1000 + 1, name: `Fruit ${i} 1`, taste: `Taste ${i} 1` },
          { id: (i + 1) * 1000 + 2, name: `Fruit ${i} 2`, taste: `Taste ${i} 2` },
        ],
      });
    }
    return data;
  }, []);
  return (
    <>
      <div data-testid="selected-rows">
        {Object.keys(rowSelectionState)
          .map((id) => `"${id}"`)
          .join(', ')}
      </div>
      <Table
        {...args}
        data={data}
        columns={columns}
        enablePagination
        enableSorting
        enableRowSelection
        rowSelectionState={rowSelectionState}
        onRowSelectionChange={setRowSelectionState}
        getSubRows={(row) => row.fruits}
        getRowId={({ id }) => {
          return `id-${id}`;
        }}
      />
    </>
  );
};

export const DefaultWithSubRows = TemplateWithSubRows.bind({});
DefaultWithSubRows.args = {};

const SkeletonTemplate: ComponentStory<typeof TableSkeleton> = (args) => {
  return <TableSkeleton {...args} />;
};

export const DefaultTableSkeleton = SkeletonTemplate.bind({});
DefaultTableSkeleton.args = {
  columns: 5,
  rows: 3,
  size: 'sm',
};
