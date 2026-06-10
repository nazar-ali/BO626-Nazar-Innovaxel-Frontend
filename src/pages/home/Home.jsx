import { useState } from "react";
import Header from "../../components/layout/Header";
import ExpenseTable from "../../components/expenses/Expense";
import Summery from "../../components/summary/Summery";
function Home() {

  return (
    <>
    <div className="min-h-screen overflow-x-hidden bg-gray-100 ">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">  
      <Summery/>
</div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <ExpenseTable />
        </div>
 </div>
     
    </>
  );
}

export default Home;