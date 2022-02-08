
import { humanize, formatDate, titlelize } from '../../../utils';

export const roleColumns = [
  {
    Header: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => {
      return <div>{Number(row.row.id) + 1}</div>;
    },
    disableSortBy: false,
    disableFilters: true,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/role-profile:"+row.original.uuid}>
        { humanize(row.original.name)}
      </a>
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

export const roleCreationColumns = [
  {
    Header: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => {
      return <div>{Number(row.row.id) + 1}</div>;
    },
    disableSortBy: false,
    disableFilters: true,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => {
      return titlelize(row.original.name);
    },
    disableFilters: true
  }
]