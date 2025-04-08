import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    totalBalance: 24563.42,
    monthlyChange: 2145.30,
    monthlyChangePercentage: 9.5,
    monthlyIncome: 8456,
    monthlyExpense: 6310,
    recentTransactions: [
      {
        id: 1,
        title: '午餐',
        date: '今天, 12:30',
        amount: -45,
        type: 'expense',
        icon: 'fa-utensils',
        category: '餐饮'
      },
      {
        id: 2,
        title: '购物',
        date: '昨天, 16:20',
        amount: -128,
        type: 'expense',
        icon: 'fa-shopping-bag',
        category: '购物'
      },
      {
        id: 3,
        title: '工资',
        date: '6月1日',
        amount: 6500,
        type: 'income',
        icon: 'fa-money-bill-wave',
        category: '工资'
      }
    ],
    categories: {
      expense: [
        { id: 1, name: '餐饮', icon: 'fa-utensils', count: 3 },
        { id: 2, name: '购物', icon: 'fa-shopping-bag', count: 5 },
        { id: 3, name: '住房', icon: 'fa-home', count: 1 },
        { id: 4, name: '交通', icon: 'fa-car', count: 2 },
        { id: 5, name: '娱乐', icon: 'fa-gamepad', count: 4 },
        { id: 6, name: '医疗', icon: 'fa-heartbeat', count: 1 },
        { id: 7, name: '教育', icon: 'fa-graduation-cap', count: 0 },
        { id: 8, name: '其他', icon: 'fa-ellipsis-h', count: 0 }
      ],
      income: [
        { id: 1, name: '工资', icon: 'fa-money-bill-wave', count: 1 },
        { id: 2, name: '奖金', icon: 'fa-gift', count: 0 },
        { id: 3, name: '投资', icon: 'fa-chart-line', count: 0 },
        { id: 4, name: '报销', icon: 'fa-receipt', count: 0 },
        { id: 5, name: '其他', icon: 'fa-ellipsis-h', count: 0 }
      ]
    },
    budgets: [
      { id: 1, name: '餐饮预算', current: 2156, total: 2500, percentage: 86 },
      { id: 2, name: '购物预算', current: 1254, total: 1500, percentage: 83 },
      { id: 3, name: '交通预算', current: 600, total: 800, percentage: 75 }
    ],
    categoryAnalytics: [
      { id: 1, name: '餐饮', icon: 'fa-utensils', percentage: 35, amount: 2156 },
      { id: 2, name: '住房', icon: 'fa-home', percentage: 28, amount: 1800 },
      { id: 3, name: '购物', icon: 'fa-shopping-bag', percentage: 20, amount: 1254 }
    ]
  }),

  actions: {
    addTransaction(transaction) {
      // 生成唯一ID
      const id = Date.now()
      const newTransaction = { ...transaction, id }
      
      // 添加到最近交易列表
      this.recentTransactions.unshift(newTransaction)
      
      // 更新余额和月度统计
      if (transaction.type === 'expense') {
        this.totalBalance -= Math.abs(transaction.amount)
        this.monthlyExpense += Math.abs(transaction.amount)
      } else {
        this.totalBalance += transaction.amount
        this.monthlyIncome += transaction.amount
      }
      
      return id
    },
    
    // 添加更多方法
  }
}) 