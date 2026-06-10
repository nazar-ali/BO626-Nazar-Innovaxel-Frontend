import { useState } from "react";
import { useExpenses } from "../context/useExpenses";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Field, FieldGroup } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

const categories = [
  "Food",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Health",
  "Other",
];

export default function ExpenseFormDailog({ open, onOpenChange }) {
  const { addExpense } = useExpenses();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    console.log("Form Submitted");
    addExpense(formData);

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });

    setErrors({});

    toast.success("Expense added successfully");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-violet-700 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden sm:inline">Add expense</span>
        </button>
      </DialogTrigger>

      <DialogContent
        className="
    w-[95vw]
    max-w-md
    p-4
    sm:p-6
    rounded-xl
  "
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add New Expense
            </DialogTitle>
            <DialogDescription>
              Enter the details of your expense below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Dinner with friends"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                value={formData.amount}
                type="number"
                min="0"
                onChange={handleChange}
                placeholder="2200"
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="category">Category</Label>

              <Select
                value={formData.category}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: value,
                  }));
                  setErrors((prev) => ({
                    ...prev,
                    category: "",
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional notes"
              />
              {errors.notes && (
                <p className="text-sm text-red-500">{errors.notes}</p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              type="submit"
            >
              Save Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
