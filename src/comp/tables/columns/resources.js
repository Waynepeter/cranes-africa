
import { humanize, humanize1, formatDate } from '../../../utils';

export const resourceColumns = [
  {
    Header: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: (row) => {
      return <div>{Number(row.row.id) + 1}</div>;
    },
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/resource-profile:"+row.original.uuid}>
        { humanize1(humanize(row.original.name))}
      </a>
    },
    disableFilters: true
  },
  {
    Header: 'category',
    Footer: 'category',
    accessor: 'category',
    disableFilters: true
  },
  {
    Header: 'sub category',
    Footer: 'sub category',
    accessor: 'subCategory',
    disableFilters: true
  },
  {
    Header: 'permissions',
    Footer: 'permissions',
    accessor: 'permissions',
    Cell: ({ row }) => {
      return row.original.permissions.length;
    },
    disableFilters: true
  },
  {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return formatDate(value);
    },
    disableFilters: true
  },
  {
    Header: 'updated at',
    Footer: 'updated at',
    accessor: 'updated_at',
    Cell: ({ value }) => {
      return formatDate(value);
    },
    disableFilters: true
  }
]