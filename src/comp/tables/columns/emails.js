
import { humanize, titlelize, formatDate } from '../../../utils';

export const emailMiniColumns = [
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
    Header: 'subject',
    Footer: 'subject',
    accessor: 'subject',
    Cell: ({ row }) => {
      return(<a className="text-primary">{ titlelize(row.original.subject)}</a>)
    },
    disableFilters: true
  }, {
    Header: 'from',
    Footer: 'from',
    accessor: 'envelope',
    Cell: ({ row }) => {
      return <div>{row.original.envelope.from}</div>
    },
    disableFilters: true
  }, {
    Header: 'recepients',
    Footer: 'recepients',
    accessor: 'accepted',
    Cell: ({ row }) => {
      return <div>{row.original.accepted}</div>
    },
    disableFilters: true
  }, {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return formatDate(value);
    },
    disableFilters: true
  }
]
