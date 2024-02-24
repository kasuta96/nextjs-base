import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    headerClass?: string
    cellClass?: string
  }

  interface TableMeta<TData extends RowData> {
    permission?: {
      read?: boolean
      write?: boolean
    }
  }
}
