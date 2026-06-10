import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});
