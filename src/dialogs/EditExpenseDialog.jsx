import { useEffect, useState } from "react";
import { useExpenses } from "../context/useExpenses";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Field, FieldGroup } from "../components/ui/field";
import { toast } from "sonner";

export default function EditExpenseDialog({
  open,
  onOpenChange,
  expense,
}) {
  const { updateExpense } = useExpenses();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateExpense(expense.id, formData);
  toast.success("Expense updated successfully");

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>

            <DialogDescription>
              Update expense details.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label>Category</Label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label>Notes</Label>
              <Input
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Update Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}