
import { humanize, titlelize, formatDate } from '../../../utils';

export const modulesColumns = [
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
    Header: 'logo',
    Footer: 'logo',
    accessor: 'logo',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/module-profile:"+row.original.uuid}>
        <img src={`${window.imgBaseURL}/${row.original.logo}`} style={{ width: '60px', height: '40px' }} />
      </a>
    },
    disableFilters: true
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/module-profile:"+row.original.uuid}>
        { humanize(row.original.name)}
      </a>
    },
    disableFilters: true
  },
  {
    Header: 'website',
    Footer: 'website',
    accessor: 'weblink',
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

export const designationColumns = [
  {
    Header: "Sn",
    Footer: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => {
      return <div>{Number(row.row.id) + 1}</div>;
    },
    disableSortBy: false,
    disableFilters: true,
  },
  {
    Header: 'designation',
    Footer: 'designation',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/designation-profile:"+row.original.uuid}>
        { humanize(row.original.name)}
      </a>
    },
    disableFilters: true
  },
  {
    Header: 'short hand',
    Footer: 'short hand',
    accessor: 'short_hand',
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

export const valueColumns = [
  {
    Header: "Sn",
    Footer: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => <div className="text-center">{Number(row.row.id) + 1}</div>,
    disableSortBy: false,
    disableFilters: true,
  },
  {
    Header: 'photo',
    Footer: 'photo',
    accessor: 'photo',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/value-profile:"+row.original.uuid}>
               <img src={`${window.imgBaseURL}/${row.original.photo}`} style={{ width: '100%', height: '40px' }} alt="" />;
             </a>
    },
    disableFilters: true
  },
  {
    Header: 'value',
    Footer: 'value',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/value-profile:"+row.original.uuid}>{humanize(row.original.name)}</a>
    },
    disableFilters: true
  },
  {
    Header: 'ratings',
    Footer: 'ratings',
    accessor: 'rating',
    disableFilters: true
  },
  {
    Header: 'icon',
    Footer: 'icon',
    accessor: 'icon',
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

export const partnerColumns = [
  {
    Header: "Sn",
    Footer: "Sn",
    accessor: "",
    maxWidth: 50,
    Cell: row => <div className="text-center">{Number(row.row.id) + 1}</div>,
    disableSortBy: false,
    disableFilters: true,
  },
  {
    Header: 'photo',
    Footer: 'photo',
    accessor: 'photo',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/partner-profile:"+row.original.uuid}>
        <img src={`${window.imgBaseURL}/${row.original.photo}`} style={{ width: '100%', height: '40px' }} alt="" />;
      </a>
    },
    disableFilters: true
  },
  {
    Header: 'partner',
    Footer: 'partner',
    accessor: 'name',
    Cell: ({ row }) => {
      return <a className="text-primary" href={"/partner-profile:"+row.original.uuid}>{humanize(row.original.name)}</a>
    },
    disableFilters: true
  },
  {
    Header: 'icon',
    Footer: 'icon',
    accessor: 'icon',
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

export const projectColumns = [
  {
    Header: "sn",
    accessor: "sn",
    maxWidth: 50,
    disableSortBy: false,
    disableFilters: true,
    Cell: row => <div>{Number(row.row.id) + 1}</div>,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => <a className="text-primary" href={"/project-profile:"+row.original.uuid}>{row.original.name}</a>,
  },
  {
    Header: 'project date',
    Footer: 'project date',
    accessor: 'date',
    disableFilters: true,
    Cell: ({ value }) => new Date(Number(value)).toISOString(),
  },
  {
    Header: 'cover photo',
    Footer: 'cover photo',
    accessor: 'photo',
    disableFilters: true,
    Cell: ({ value }) => <img src={`${window.imgBaseURL}/${value}`} style={{ width: '60px', height: '40px' }} />,
  },
  {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    disableFilters: true,
    Cell: ({ value }) => formatDate(value),
  },
  {
    Header: 'updated at',
    Footer: 'updated at',
    accessor: 'updated_at',
    disableFilters: true,
    Cell: ({ value }) => formatDate(value),
  }
]

export const funfactColumns = [
  {
    Header: "sn",
    accessor: "sn",
    maxWidth: 50,
    disableSortBy: false,
    disableFilters: true,
    Cell: row => <div>{Number(row.row.id) + 1}</div>,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => <a className="text-primary" href={"/funfacts-profile:"+row.original.uuid}>{row.original.name}</a>,
  },
  {
    Header: 'value',
    Footer: 'value',
    accessor: 'value',
    disableFilters: true,
  },
  {
    Header: 'created at',
    Footer: 'created at',
    accessor: 'created_at',
    disableFilters: true,
    Cell: ({ value }) => formatDate(value),
  },
  {
    Header: 'updated at',
    Footer: 'updated at',
    accessor: 'updated_at',
    disableFilters: true,
    Cell: ({ value }) => formatDate(value),
  }
]