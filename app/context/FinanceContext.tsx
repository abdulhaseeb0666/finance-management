"use client";

import { createContext, useState, ReactNode } from "react";
import {financeData} from "../data/RealData"; // <- your dummy JSON file

// Type inferred from imported data
export type FinanceContextType = typeof financeData;

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    currency: string;
    accounts: {
        id: string;
        name: string;
        type: string;
        balance: number;
    }[];
    transactions: {
        id: string;
        date: string;
        type: string;
        category: string;
        amount: number;
        accountId: string;
        description: string;
    }[];
    monthlySummary: {
        month: string;
        income: number;
        expenses: number;
    }[];
    spendingByCategory: {
        name: string;
        value: number;
    }[];
    budgets: {
        category: string;
        limit: number;
        spent: number;
    }[];
    insights: {
        id: string;
        type: string;
        message: string;
    }[];
};

// Create context
export const FinanceContext = createContext<FinanceContextType | null>(null);

// Provider component
export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [state] = useState<FinanceContextType>(financeData);

  return (
    <FinanceContext.Provider value={state}>
      {children}
    </FinanceContext.Provider>
  );
};