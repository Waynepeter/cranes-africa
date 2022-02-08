
import { humanize, titlelize, formatDate } from '../../../utils';

export const catalogueColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/product-catalogue-profile:"+row.original.uuid}>{row.original.name}</a>,
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

export const distributionColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/product-distribution-profile:"+row.original.uuid}>{row.original.name}</a>,
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

export const salemodeColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/product-salemode-profile:"+row.original.uuid}>{row.original.name}</a>,
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

export const productcatColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/product-category-profile:"+row.original.uuid}>{row.original.name}</a>,
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

export const productsubcatColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/product-subcategory-profile:"+row.original.uuid}>{row.original.name}</a>,
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

export const productGroupColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/product-group-profile:"+row.original.uuid}>{row.original.name}</a>,
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

export const productsColumns = [
  {
    Header: "Sn",
    Footer: 'Sn',
    accessor: "",
    maxWidth: 50,
    disableSortBy: false,
    disableFilters: true,
    Cell: row => <div>{Number(row.row.id) + 1}</div>,
  },
  {
    Header: 'main photo',
    Footer: 'main photo',
    accessor: 'photo',
    disableFilters: true,
    Cell: ({ value }) => <img src={`${window.imgBaseURL}/${value}`} style={{ width: '75px', height: '40px' }} alt="" />,
  },
  {
    Header: 'name',
    Footer: 'name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => <a className="text-primary" href={"/product-profile:"+row.original.uuid}>{row.original.name}</a>,
  },
  {
    Header: 'module',
    Footer: 'module',
    accessor: 'module',
    disableFilters: true,
    Cell: ({ row }) => row.original.module.name,
  },
  {
    Header: 'catalogue',
    Footer: 'catalogue',
    accessor: 'catalogue',
    disableFilters: true,
    Cell: ({ row }) => row.original.catalogue.name,
  },
  {
    Header: 'sale mode',
    Footer: 'sale mode',
    accessor: 'sale_mode',
    disableFilters: true,
    Cell: ({ row }) => row.original.sale_mode.name,
  },
  {
    Header: 'category',
    Footer: 'category',
    accessor: 'product_cat',
    disableFilters: true,
    Cell: ({ row }) => row.original.product_cat.name,
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

export const serviceColumns = [
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
    Cell: ({ row }) => <a className="text-primary" href={"/service-profile:"+row.original.uuid}>{row.original.name}</a>,
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