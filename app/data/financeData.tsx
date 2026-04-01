export const financeData = {
  "user": {
    "id": "user_001",
    "name": "Abdul Haseeb",
    "email": "haseeb@example.com",
    "currency": "USD"
  },

  "accounts": [
    {
      "id": "acc_001",
      "name": "Main Bank",
      "type": "checking",
      "balance": 5420.75
    },
    {
      "id": "acc_002",
      "name": "Savings",
      "type": "savings",
      "balance": 12800.50
    },
    {
      "id": "acc_003",
      "name": "Crypto Wallet",
      "type": "investment",
      "balance": 3200.00
    }
  ],

  "transactions": [
    {
      "id": "txn_001",
      "date": "2026-03-01",
      "type": "expense",
      "category": "Food",
      "amount": 45.20,
      "accountId": "acc_001",
      "description": "Restaurant"
    },
    {
      "id": "txn_002",
      "date": "2026-03-02",
      "type": "income",
      "category": "Salary",
      "amount": 2500.00,
      "accountId": "acc_001",
      "description": "Monthly Salary"
    },
    {
      "id": "txn_003",
      "date": "2026-03-03",
      "type": "expense",
      "category": "Transport",
      "amount": 15.00,
      "accountId": "acc_001",
      "description": "Uber"
    },
    {
      "id": "txn_004",
      "date": "2026-03-04",
      "type": "expense",
      "category": "Shopping",
      "amount": 120.99,
      "accountId": "acc_001",
      "description": "Clothes"
    },
    {
      "id": "txn_005",
      "date": "2026-03-05",
      "type": "expense",
      "category": "Bills",
      "amount": 200.00,
      "accountId": "acc_002",
      "description": "Electricity Bill"
    }
  ],

  "monthlySummary": [
    { "month": "Jan", "income": 3200, "expenses": 2100 },
    { "month": "Feb", "income": 2800, "expenses": 1900 },
    { "month": "Mar", "income": 3500, "expenses": 2400 },
    { "month": "Apr", "income": 4000, "expenses": 2600 },
    { "month": "May", "income": 3700, "expenses": 2200 },
    { "month": "Jun", "income": 4200, "expenses": 2800 }
  ],

  "spendingByCategory": [
    { "name": "Food", "value": 500 },
    { "name": "Transport", "value": 200 },
    { "name": "Shopping", "value": 700 },
    { "name": "Bills", "value": 600 },
    { "name": "Entertainment", "value": 300 }
  ],

  "budgets": [
    {
      "category": "Food",
      "limit": 600,
      "spent": 500
    },
    {
      "category": "Shopping",
      "limit": 800,
      "spent": 700
    },
    {
      "category": "Bills",
      "limit": 700,
      "spent": 600
    }
  ],

  "insights": [
    {
      "id": "ins_001",
      "type": "warning",
      "message": "Your shopping expenses are close to the monthly limit."
    },
    {
      "id": "ins_002",
      "type": "info",
      "message": "You saved 15% more compared to last month."
    },
    {
      "id": "ins_003",
      "type": "alert",
      "message": "Bills spending increased by 10% this month."
    }
  ]
}