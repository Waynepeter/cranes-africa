
import { humanize, titlelize, formatDate } from '../../../utils';

export const userColumns = [
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
      return <a className="text-primary" href={"/user-profile:"+row.original.uuid}>
              { humanize(row.original.name)}
            </a>
    },
    disableFilters: true
  },
  {
    Header: 'email',
    Footer: 'email',
    accessor: 'email',
    disableFilters: true
  },
  {
    Header: 'roles',
    Footer: 'roles',
    accessor: 'roles',
    Cell: ({ row }) => {
      return row.original.roles.length;
    },
    disableFilters: true
  },
  {
    Header: 'emails',
    Footer: 'emails',
    accessor: 'emails',
    Cell: ({ row }) => {
      return row.original.emails.length;
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

export const userCreationColumns = [
  {
    Header: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => {
      return <div>{Number(row.row.id) + 1}</div>;
    },
    disableSortBy: false,
    disableFilters: true,
  }, {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => {
      return titlelize(row.original.name);
    },
    disableFilters: true
  }, {
    Header: 'email',
    Footer: 'email',
    accessor: 'email',
    Cell: ({ row }) => {
      return row.original.email;
    },
    disableFilters: true
  }
]
