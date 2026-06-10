import { useState } from "react";
import ExpenseFormDialog from "../../dialogs/AddExpenseDialog";

const Header = ({ onAddExpense }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, onOpenChange] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left — Logo + title */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-sm">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h7m4-10v4m0 0l2-2m-2 2l-2-2M16 17h6m-3-3v6"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-[15px] font-semibold leading-none tracking-tight text-foreground">
                Expense Tracker
              </h1>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {currentDate}
              </p>
            </div>
          </div>

          <ExpenseFormDialog open={open} onOpenChange={onOpenChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
