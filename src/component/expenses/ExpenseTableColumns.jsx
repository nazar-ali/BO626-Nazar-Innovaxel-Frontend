"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const categoryStyles = {
  Food: "bg-violet-100 text-violet-700",
  Utilities: "bg-green-100 text-green-700",
  Transport: "bg-orange-100 text-orange-700",
  Health: "bg-red-100 text-red-700",
  Entertainment: "bg-pink-100 text-pink-700",
  Other: "bg-gray-100 text-gray-700",
};

export const columns = [
  {
    accessorKey: "title",
    header: "TITLE",
  },

  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category = row.original.category;

      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            categoryStyles[category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {category}
        </span>
      );
    },
  },

  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
  },

  {
    accessorKey: "notes",
    header: "NOTES",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.notes || "—"}
      </span>
    ),
  },

  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => (
      <span className="font-medium text-red-600">
         ${Number(row.original.amount).toLocaleString()}
      </span>
    ),
  },

  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => console.log("Edit", row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => console.log("Delete", row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];