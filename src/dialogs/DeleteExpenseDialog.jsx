import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteExpenseDialog({
  open,
  onOpenChange,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent   className="w-[95vw] max-w-md p-4 sm:p-6 rounded-xl">
        <DialogHeader>
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <DialogTitle className="text-center">
            Delete Expense
          </DialogTitle>

          <DialogDescription className="text-center">
            Are you sure you want to delete this expense?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}