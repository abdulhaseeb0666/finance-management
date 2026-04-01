export const financeData = {
  users: [
    {
      id: 1,
      name: "Abdul Haseeb",
      email: "haseeb@example.com",
      password : "abc123",
      currency: "USD",
      
      accounts: [
        {
          id: "acc_001",
          name: "Main Bank",
          type: "checking",
          balance: 5420.75
        },
        {
            id: "acc_002",
            name: "Savings",
          type: "savings",
          balance: 12800.5
        }
      ],

      transactions: [
        {
          id: "txn_001",
          date: "2026-03-01",
          type: "expense",
          category: "Food",
          amount: 45.2,
          accountId: "acc_001",
          description: "Restaurant"
        },
        {
          id: "txn_002",
          date: "2026-03-02",
          type: "income",
          category: "Salary",
          amount: 2500,
          accountId: "acc_001",
          description: "Monthly Salary"
        }
    ],
    
    monthlySummary: [
        { month: "Jan", income: 3200, expenses: 2100 },
        { month: "Feb", income: 2800, expenses: 1900 }
      ],

      spendingByCategory: [
        { name: "Food", value: 500 },
        { name: "Shopping", value: 700 }
      ],
      
      budgets: [
        {
          category: "Food",
          limit: 600,
          spent: 500
        }
      ],

      insights: [
        {
          id: "ins_001",
          type: "warning",
          message: "Your shopping expenses are close to the monthly limit."
        }
      ]
    },
    
    {
      id: 2,
      name: "Ali Khan",
      email: "ali@example.com",
      currency: "PKR",
      password : "qwerty123",

      accounts: [
        {
          id: "acc_101",
          name: "Bank Alfalah",
          type: "checking",
          balance: 150000
        }
      ],

      transactions: [
        {
          id: "txn_101",
          date: "2026-03-01",
          type: "expense",
          category: "Bills",
          amount: 5000,
          accountId: "acc_101",
          description: "Electricity"
        }
      ],

      monthlySummary: [
        { month: "Jan", income: 200000, expenses: 120000 }
      ],

      spendingByCategory: [
        { name: "Bills", value: 5000 }
      ],

      budgets: [
        {
          category: "Bills",
          limit: 10000,
          spent: 5000
        }
      ],

      insights: [
        {
          id: "ins_101",
          type: "info",
          message: "Good job staying under your bills budget."
        }
      ]
    }
  ]
};