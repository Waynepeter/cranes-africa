
import { humanize, humanize1, formatDate } from '../../../utils';

export const subscriptionColumns = [
  {
    Header: "Sn",
    Footer: 'Sn',
    accessor: "",
    Cell: (row) => { return <div>{Number(row.row.id) + 1}</div>; },
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'email address',
    Footer: 'email address',
    accessor: 'email',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/subscription-profile:"+row.original.uuid}>
              { row.original.email.toLowerCase()}
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'module',
    Footer: 'module',
    accessor: 'module',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/module-profile:"+row.original.Module.uuid}>
              { row.original.Module.name}
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'status',
    Footer: 'status',
    accessor: 'status',
    Cell: ({ row }) => {
      return <span className="text-primary">
              { row.original.status === 0 ?
                <p className="text-navy">Un-confirmed</p>
              : row.original.status === 1 ?
                <p className="text-green">Active</p>
              : row.original.status === 2 ?
                <p className="text-red">Unsubscribed</p>
              : <i>Unknown</i> }
             </span>
    },
    disableFilters: true
  },
  {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    Cell: ({ value }) => { return formatDate(value); },
    disableFilters: true
  },
  {
    Header: 'last updated',
    Footer: 'last updated',
    accessor: 'updated_at',
    Cell: ({ value }) => { return formatDate(value); },
    disableFilters: true
  }
]

export const faqColumns = [
  {
    Header: "Sn",
    Footer: 'Sn',
    accessor: "",
    Cell: (row) => { return <div>{Number(row.row.id) + 1}</div>; },
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Question',
    Footer: 'Question',
    accessor: 'question',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/faq-profile:"+row.original.uuid}>
              { row.original.question}
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'module',
    Footer: 'module',
    accessor: 'module',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/module-profile:"+row.original.Module.uuid}>
              { row.original.Module.name}
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'Category',
    Footer: 'Category',
    accessor: 'category',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/faq-category:"+row.original.FaqCat.uuid}>
              { row.original.FaqCat.name}
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    Cell: ({ value }) => { return formatDate(value); },
    disableFilters: true
  },
  {
    Header: 'last updated',
    Footer: 'last updated',
    accessor: 'updated_at',
    Cell: ({ value }) => { return formatDate(value); },
    disableFilters: true
  }
]

export const faqCatColumns = [
  {
    Header: "Sn",
    Footer: 'Sn',
    accessor: "",
    Cell: (row) => { return <div>{Number(row.row.id) + 1}</div>; },
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/faq-category:"+row.original.uuid}>
              { row.original.name }
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'module',
    Footer: 'module',
    accessor: 'module',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/module-profile:"+row.original.Module.uuid}>
              { row.original.Module.name}
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    Cell: ({ value }) => { return formatDate(value); },
    disableFilters: true
  },
  {
    Header: 'last updated',
    Footer: 'last updated',
    accessor: 'updated_at',
    Cell: ({ value }) => { return formatDate(value); },
    disableFilters: true
  }
]

export const testimonialColumns = [
  {
    Header: "sn",
    Footer: "sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => <div className="text-center">{Number(row.row.id) + 1}</div>,
    disableSortBy: false,
    disableFilters: true,
  }, {
    Header: 'photo',
    Footer: 'photo',
    accessor: 'photo',
    Cell: ({ row }) => <a className="text-primary" href={"/testimonial-profile:"+row.original.uuid}>
      <img src={`${window.imgBaseURL}/${row.original.photo}`} style={{ width: '100%', height: '40px' }} alt="" />
    </a>,
    disableFilters: true
  }, {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => <a className="text-primary" href={"/testimonial-profile:"+row.original.uuid}>{humanize(row.original.name)}</a>,
    disableFilters: true
  }, {
    Header: 'ratings',
    Footer: 'ratings',
    accessor: 'rating',
    disableFilters: true
  }, {
    Header: 'icon',
    Footer: 'icon',
    accessor: 'icon',
    disableFilters: true
  }, {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    Cell: ({ value }) => formatDate(value),
    disableFilters: true
  }, {
    Header: 'updated at',
    Footer: 'updated at',
    accessor: 'updated_at',
    Cell: ({ value }) => formatDate(value),
    disableFilters: true
  }
]