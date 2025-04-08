<template>
  <div class="analysis-container">
    <div class="section-title">财务分析</div>
    
    <div class="card">
      <div class="section-title" style="margin-top: 0;">月度趋势</div>
      <div class="trend-chart">
        <div class="chart-placeholder">
          <!-- 在实际项目中这里应该使用真实的图表组件 -->
          <el-empty v-if="false" description="暂无数据" />
          <el-line-chart v-else :data="monthlyTrendData" :activeSeries="activeTrendTab" />
        </div>
      </div>
      
      <div class="trends-tabs">
        <div 
          v-for="(tab, index) in trendTabs" 
          :key="index"
          class="trend-tab" 
          :class="{ active: activeTrendTab === tab.value }"
          @click="activeTrendTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>
      
      <div class="stats-summary">
        <div class="summary-item">
          <div class="summary-label">平均值</div>
          <div class="summary-value">¥5,428</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">最大值</div>
          <div class="summary-value">¥8,954</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">最小值</div>
          <div class="summary-value">¥3,215</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="section-title" style="margin-top: 0;">支出分类分析</div>
      <div class="category-chart">
        <div class="chart-placeholder">
          <!-- 在实际项目中这里应该使用真实的图表组件 -->
          <el-empty v-if="!transactionStore.categoryAnalytics.length" description="暂无数据" />
          <el-pie-chart v-else :data="categoryChartData" />
        </div>
      </div>
      
      <div class="category-list">
        <div 
          class="category-analysis-item" 
          v-for="category in transactionStore.categoryAnalytics" 
          :key="category.id"
        >
          <div class="category-icon">
            <i :class="`fas ${category.icon}`"></i>
          </div>
          <div class="category-progress">
            <div class="category-name">{{ category.name }}</div>
            <div class="progress-bar-container">
              <div 
                class="progress-bar" 
                :style="{ width: `${category.percentage}%` }"
              ></div>
              <span class="progress-percentage">{{ category.percentage }}%</span>
            </div>
          </div>
          <div class="category-amount">¥{{ formatCurrency(category.amount) }}</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="section-title" style="margin-top: 0;">预算执行情况</div>
      <div class="budget-progress">
        <div 
          class="budget-item" 
          v-for="budget in transactionStore.budgets" 
          :key="budget.id"
        >
          <div class="budget-header">
            <div class="budget-name">{{ budget.name }}</div>
            <div class="budget-amounts">
              <span class="current-amount">¥{{ formatCurrency(budget.current) }}</span> / 
              <span class="total-amount">¥{{ formatCurrency(budget.total) }}</span>
            </div>
          </div>
          <div class="budget-bar-container">
            <div 
              class="budget-bar" 
              :style="{ width: `${budget.percentage}%` }"
              :class="{ 'warning': budget.percentage > 80, 'danger': budget.percentage > 95 }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <div style="height: 80px;"></div> <!-- 底部间距 -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'

const transactionStore = useTransactionStore()

// 趋势标签
const trendTabs = [
  { label: '支出', value: 'expense' },
  { label: '收入', value: 'income' },
  { label: '净收入', value: 'net' }
]
const activeTrendTab = ref('expense')

// 月度趋势数据
const monthlyTrendData = computed(() => {
  // 示例数据，实际项目中应该从 API 获取
  return [
    { month: '1月', expense: 5428, income: 8500, net: 3072 },
    { month: '2月', expense: 4982, income: 8500, net: 3518 },
    { month: '3月', expense: 6104, income: 8500, net: 2396 },
    { month: '4月', expense: 5721, income: 8500, net: 2779 },
    { month: '5月', expense: 8954, income: 10200, net: 1246 },
    { month: '6月', expense: 6310, income: 8500, net: 2190 }
  ]
})

// 分类分析数据
const categoryChartData = computed(() => {
  return transactionStore.categoryAnalytics.map(category => ({
    value: category.amount,
    name: category.name
  }))
})

// 格式化货币数字，保留两位小数
const formatCurrency = (value) => {
  return Number(value).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>

<style scoped>
.analysis-container {
  padding: 8px; /* 减少内边距 */
}

.section-title {
  font-size: 16px; /* 减小字体大小 */
  font-weight: 600;
  margin-bottom: 12px; /* 减少下边距 */
  color: var(--dark-blue);
}

.trend-chart, .category-chart {
  height: 180px;
  margin-bottom: 12px; /* 减少下边距 */
}

.chart-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(99, 102, 241, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.trends-tabs {
  display: flex;
  margin-top: 12px; /* 减少上边距 */
  border-bottom: 1px solid var(--light-gray);
}

.trend-tab {
  padding: 6px 12px; /* 减少内边距 */
  font-size: 13px; /* 减小字体大小 */
  cursor: pointer;
  color: var(--text-gray);
  position: relative;
  transition: var(--transition);
}

.trend-tab.active {
  color: var(--purple);
  font-weight: 500;
}

.trend-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--purple);
  animation: fadeIn 0.3s ease;
}

.stats-summary {
  display: flex;
  justify-content: space-between;
  margin-top: 12px; /* 减少上边距 */
}

.summary-item {
  text-align: center;
}

.summary-label {
  font-size: 12px;
  color: var(--text-gray);
  margin-bottom: 2px; /* 减少下边距 */
}

.summary-value {
  font-size: 15px; /* 减小字体大小 */
  font-weight: 600;
}

.category-analysis-item {
  display: flex;
  align-items: center;
  padding: 10px 0; /* 减少上下内边距 */
  border-bottom: 1px solid var(--light-gray);
}

.category-analysis-item:last-child {
  border-bottom: none;
}

.category-icon {
  width: 32px; /* 减小图标尺寸 */
  height: 32px; /* 减小图标尺寸 */
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px; /* 减少右边距 */
  color: var(--purple);
}

.category-progress {
  flex: 1;
}

.category-name {
  font-weight: 500;
  margin-bottom: 3px; /* 减少下边距 */
  font-size: 14px; /* 减小字体大小 */
}

.progress-bar-container {
  height: 5px; /* 减小高度 */
  background-color: var(--light-gray);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: var(--purple);
  border-radius: 3px;
}

.progress-percentage {
  margin-left: 6px; /* 减少左边距 */
  font-size: 13px; /* 减小字体大小 */
  color: var(--purple);
  font-weight: 500;
}

.category-amount {
  font-weight: 600;
  color: #ef4444;
  margin-left: 10px; /* 减少左边距 */
  font-size: 14px; /* 减小字体大小 */
}

.budget-progress {
  margin-top: 12px; /* 减少上边距 */
}

.budget-item {
  margin-bottom: 12px; /* 减少下边距 */
}

.budget-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px; /* 减少下边距 */
}

.budget-name {
  font-weight: 500;
  font-size: 14px; /* 减小字体大小 */
}

.budget-amounts {
  font-size: 13px; /* 减小字体大小 */
}

.budget-amounts .current-amount {
  color: #ef4444;
}

.budget-bar-container {
  height: 6px; /* 减小高度 */
  background-color: var(--light-gray);
  border-radius: 3px; /* 减小圆角 */
  overflow: hidden;
}

.budget-bar {
  height: 100%;
  background-color: var(--purple);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.budget-bar.warning {
  background-color: #f59e0b;
}

.budget-bar.danger {
  background-color: #ef4444;
}

/* 移除底部多余的间距 */
div[style="height: 80px;"] {
  height: 16px !important; /* 大幅减少底部间距 */
}
</style> 