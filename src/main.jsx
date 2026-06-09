import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExpenseProvider } from '../src/context/useExpenses'
import { Toaster } from "sonner";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExpenseProvider>

    <App />
    <Toaster richColors position="top-right" />
    </ExpenseProvider>
  </StrictMode>,
)
