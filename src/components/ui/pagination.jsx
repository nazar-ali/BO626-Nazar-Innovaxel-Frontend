// import { type Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "../../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

// interface DataTablePaginationProps<TData> {
//   table: Table<TData>
// }

export function DataTablePagination({ table }) {
  return (
    <div className="flex flex-col gap-4 px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Selected Rows */}
      <div className="text-center text-sm text-muted-foreground sm:text-left">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
        {/* Rows Per Page */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium whitespace-nowrap">
            Rows per page
          </p>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) =>
              table.setPageSize(Number(value))
            }
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div className="text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 sm:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 sm:flex"
            onClick={() =>
              table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
