import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function ExpenseFilterByDateDialog({ isDateDialogOpen, setIsDateDialogOpen, selectedDate, setSelectedDate }) {

    useEffect(() => {
  if (selectedDate) {
    setIsDateDialogOpen(false);
  }
}, [selectedDate]);

 return (
    <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
     
     <DialogContent className="sm:max-w-sm">
    <DialogHeader>
      <DialogTitle>Filter by Date</DialogTitle>
      <DialogDescription>
        Select a date to filter expenses.
      </DialogDescription>
    </DialogHeader>

    <div className="py-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) =>
          setSelectedDate(e.target.value)
        }
        className="w-full rounded-lg border px-3 py-2"
      />
    </div>

  </DialogContent>
    </Dialog>
 );
}
