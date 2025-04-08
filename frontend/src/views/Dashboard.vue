<template>
  <div class="dashboard-container">
    <div class="balance-card">
      <div class="balance-title">总资产</div>
      <div class="balance-amount">¥{{ formatCurrency(transactionStore.totalBalance) }}</div>
      <div class="balance-change">
        本月 
        <i class="fas fa-arrow-up" v-if="transactionStore.monthlyChangePercentage > 0"></i>
        <i class="fas fa-arrow-down" v-else></i> 
        ¥{{ formatCurrency(transactionStore.monthlyChange) }} 
        ({{ transactionStore.monthlyChangePercentage > 0 ? '+' : '' }}{{ transactionStore.monthlyChangePercentage }}%)
      </div>
    </div>
    
    <div class="stats-row">
      <div class="stat-card income">
        <div class="stat-title">本月收入</div>
        <div class="stat-value">¥{{ formatCurrency(transactionStore.monthlyIncome) }}</div>
      </div>
      <div class="stat-card expense">
        <div class="stat-title">本月支出</div>
        <div class="stat-value">¥{{ formatCurrency(transactionStore.monthlyExpense) }}</div>
      </div>
    </div>
    
    <div class="card">
      <div class="section-title">支出分布</div>
      <div class="expense-chart">
        <el-empty v-if="!transactionStore.categoryAnalytics.length" description="暂无数据" />
        <div v-else class="chart-placeholder">
          <el-pie-chart :data="pieChartData" />
        </div>
      </div>
    </div>
    
    <div class="recent-transactions">
      <div class="section-title">最近交易</div>
      
      <div class="card">
        <template v-if="transactionStore.recentTransactions.length">
          <div 
            class="transaction-item" 
            v-for="transaction in transactionStore.recentTransactions" 
            :key="transaction.id"
          >
            <div class="transaction-icon">
              <i :class="`fas ${transaction.icon}`"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">{{ transaction.title }}</div>
              <div class="transaction-date">{{ transaction.date }}</div>
            </div>
            <div 
              class="transaction-amount" 
              :class="transaction.type"
            >
              {{ transaction.type === 'expense' ? '-' : '+' }}¥{{ formatCurrency(Math.abs(transaction.amount)) }}
            </div>
          </div>
        </template>
        <el-empty v-else description="暂无交易记录" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '../stores/transaction'
import { computed } from 'vue'

const transactionStore = useTransactionStore()

// 格式化货币数字，保留两位小数
const formatCurrency = (value) => {
  return Number(value).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// 饼图数据处理
const pieChartData = computed(() => {
  return transactionStore.categoryAnalytics.map(category => ({
    value: category.amount,
    name: category.name
  }))
})
</script>

<style scoped>
.dashboard-container {
  padding: 8px;
}

.balance-card {
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
}

.balance-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
  animation: pulse 15s infinite linear;
}

.balance-title {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.balance-amount {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.balance-change {
  font-size: 14px;
  opacity: 0.9;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.stat-card {
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08);
  margin: 0 4px;
}

.stat-card:first-child {
  margin-left: 0;
}

.stat-card:last-child {
  margin-right: 0;
}

.stat-title {
  font-size: 12px;
  color: var(--text-gray);
  margin-bottom: 8px;
}

.stat-card.income .stat-value {
  color: #10b981;
}

.stat-card.expense .stat-value {
  color: #ef4444;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--dark-blue);
}

.expense-chart {
  height: 180px;
}

.chart-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(99, 102, 241, 0.05);
  border-radius: 8px;
}

.recent-transactions {
  margin-top: 12px;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--light-gray);
  position: relative;
  overflow: hidden;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(99, 102, 241, 0.05);
  transition: transform 0.5s ease;
  z-index: 0;
}

.transaction-item:hover::after {
  transform: translateX(100%);
}

.transaction-icon {
  width: 40px;
  height: 40px;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  color: var(--purple);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.transaction-item:hover .transaction-icon {
  transform: scale(1.1);
}

.transaction-details {
  flex: 1;
  position: relative;
  z-index: 1;
}

.transaction-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.transaction-date {
  font-size: 12px;
  color: var(--text-gray);
}

.transaction-amount {
  font-weight: 600;
}

.transaction-amount.expense {
  color: #ef4444;
}

.transaction-amount.income {
  color: #10b981;
}
</style> 