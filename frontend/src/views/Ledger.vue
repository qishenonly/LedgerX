<template>
  <div class="ledger-container">
    <div class="transactions-filter">
      <div 
        v-for="(filter, index) in filters" 
        :key="index"
        class="filter-option" 
        :class="{ active: activeFilter === filter.value }"
        @click="activeFilter = filter.value"
      >
        {{ filter.label }}
      </div>
    </div>
    
    <div class="transaction-form card">
      <div class="type-selector">
        <div 
          class="type-option" 
          :class="{ selected: transactionForm.type === 'expense' }"
          @click="transactionForm.type = 'expense'"
        >支出</div>
        <div 
          class="type-option" 
          :class="{ selected: transactionForm.type === 'income' }"
          @click="transactionForm.type = 'income'"
        >收入</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">金额</label>
        <el-input 
          v-model="transactionForm.amount" 
          type="number" 
          placeholder="0.00"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">分类</label>
        <div class="category-selector">
          <div 
            v-for="category in currentCategories" 
            :key="category.id"
            class="category-item" 
            :class="{ selected: transactionForm.category === category.name }"
            @click="transactionForm.category = category.name; transactionForm.icon = category.icon"
          >
            <i :class="`fas ${category.icon}`"></i>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">备注</label>
        <el-input 
          v-model="transactionForm.title" 
          placeholder="添加备注..."
          class="form-input"
        />
      </div>
      
      <el-button type="primary" class="submit-btn" @click="addTransaction">保存</el-button>
    </div>
    
    <div class="section-title">历史记录</div>
    <div class="card">
      <template v-if="filteredTransactions.length">
        <div 
          class="transaction-item" 
          v-for="transaction in filteredTransactions" 
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
    
    <div class="add-transaction-btn" @click="scrollToForm">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import { ElMessage } from 'element-plus'

const transactionStore = useTransactionStore()

// 筛选器配置
const filters = [
  { label: '全部', value: 'all' },
  { label: '支出', value: 'expense' },
  { label: '收入', value: 'income' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
]
const activeFilter = ref('all')

// 交易表单
const transactionForm = ref({
  type: 'expense',
  amount: '',
  category: '餐饮',
  icon: 'fa-utensils',
  title: '',
})

// 根据当前类型获取分类列表
const currentCategories = computed(() => {
  return transactionStore.categories[transactionForm.value.type]
})

// 根据筛选条件过滤交易记录
const filteredTransactions = computed(() => {
  let result = [...transactionStore.recentTransactions]
  
  if (activeFilter.value === 'expense') {
    result = result.filter(item => item.type === 'expense')
  } else if (activeFilter.value === 'income') {
    result = result.filter(item => item.type === 'income')
  }
  // 本周和本月筛选可以在实际项目中实现
  
  return result
})

// 添加交易记录
const addTransaction = () => {
  if (!transactionForm.value.amount) {
    ElMessage.warning('请输入金额')
    return
  }
  
  if (!transactionForm.value.title) {
    ElMessage.warning('请输入备注')
    return
  }
  
  // 创建交易记录对象
  const transaction = {
    title: transactionForm.value.title,
    amount: Number(transactionForm.value.amount),
    type: transactionForm.value.type,
    category: transactionForm.value.category,
    icon: transactionForm.value.icon,
    date: '今天, ' + new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  
  // 添加到 store
  transactionStore.addTransaction(transaction)
  
  // 重置表单
  transactionForm.value = {
    type: 'expense',
    amount: '',
    category: '餐饮',
    icon: 'fa-utensils',
    title: '',
  }
  
  ElMessage.success('交易记录已添加')
}

// 滚动到表单位置
const scrollToForm = () => {
  document.querySelector('.transaction-form').scrollIntoView({ behavior: 'smooth' })
}

// 格式化货币数字，保留两位小数
const formatCurrency = (value) => {
  return Number(value).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>

<style scoped>
.ledger-container {
  padding: 8px;
  padding-bottom: 70px;
}

.transactions-filter {
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;
  padding-bottom: 6px;
}

.filter-option {
  white-space: nowrap;
  padding: 6px 12px;
  background-color: rgba(99, 102, 241, 0.1);
  color: var(--purple);
  border-radius: 16px;
  margin-right: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: var(--transition);
}

.filter-option.active {
  background-color: var(--purple);
  color: white;
}

.type-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.type-option {
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
}

.type-option:first-child {
  margin-right: 8px;
}

.type-option.selected {
  background-color: var(--purple);
  color: white;
  border-color: var(--purple);
}

.form-group {
  margin-bottom: 12px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--dark-blue);
}

.form-input {
  width: 100%;
}

.category-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 12px;
}

.category-item {
  width: calc(25% - 6px);
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.category-item.selected {
  background-color: var(--purple);
  color: white;
}

.category-item:hover {
  transform: translateY(-3px);
}

.category-item i {
  font-size: 24px;
  margin-bottom: 8px;
}

.category-item span {
  font-size: 12px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  background-color: var(--purple);
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0 10px;
  color: var(--dark-blue);
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gray);
  position: relative;
  overflow: hidden;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 36px;
  height: 36px;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: var(--purple);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
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

.add-transaction-btn {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--purple);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
  z-index: 99;
  cursor: pointer;
  transition: var(--transition);
  animation: pulse 2s infinite;
}

.add-transaction-btn:hover {
  transform: scale(1.05);
  background-color: var(--light-purple);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}
</style> 