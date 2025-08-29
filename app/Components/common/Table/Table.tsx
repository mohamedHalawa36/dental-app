import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table as UiTable,
} from "../../ui/table";
import { DataTablePagination } from "./DataTablePagination";
import type { DataTableProps } from "~/types/components";
import { cn } from "~/lib/utils";

function Table<TData, TValue>({
  columns,
  data,
  tableClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  footer,
  noResultsLabel = "No Results",
  paginated = false,
  pageSize = 5,
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    state: paginated ? { pagination: { pageIndex, pageSize } } : undefined,
  });
  table.setPageIndex = setPageIndex;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "overflow-hidden rounded-md border border-border",
          tableClassName,
        )}
      >
        <UiTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn("", headerClassName)}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-start text-gray-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn("", bodyClassName)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noResultsLabel}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell
                  className={cn("", footerClassName)}
                  colSpan={columns.length}
                >
                  {footer}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </UiTable>
      </div>
      {!!paginated && <DataTablePagination table={table} />}
    </div>
  );
}

export default Table;
