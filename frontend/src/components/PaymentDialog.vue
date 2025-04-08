<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="支付管理"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">支付管理</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="tab-container">
        <div class="tabs">
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'methods' }"
            @click="activeTab = 'methods'"
          >
            支付方式
          </div>
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'bills' }"
            @click="activeTab = 'bills'"
          >
            账单记录
          </div>
        </div>

        <!-- 支付方式 Tab -->
        <div class="tab-content" v-if="activeTab === 'methods'">
          <div class="payment-methods">
            <div class="method-item" v-for="method in paymentMethods" :key="method.id">
              <div class="method-icon">
                <i :class="getPaymentMethodIcon(method.type)"></i>
              </div>
              <div class="method-info">
                <div class="method-title">{{ method.name }}</div>
                <div class="method-detail">{{ method.detail }}</div>
              </div>
              <div class="method-actions">
                <el-switch
                  v-model="method.isDefault"
                  @change="handleSetDefault(method)"
                />
                <el-button type="text" @click="handleDeleteMethod(method)">
                  <i class="fas fa-trash"></i>
                </el-button>
              </div>
            </div>
          </div>
          <el-button class="add-method-btn" @click="handleAddMethod">
            <i class="fas fa-plus"></i>
            添加支付方式
          </el-button>
        </div>

        <!-- 账单记录 Tab -->
        <div class="tab-content" v-if="activeTab === 'bills'">
          <div class="bill-filters">
            <el-select v-model="billFilter" placeholder="全部账单">
              <el-option label="全部账单" value="all" />
              <el-option label="会员订阅" value="membership" />
              <el-option label="云空间" value="cloud" />
              <el-option label="其他" value="other" />
            </el-select>
          </div>
          <div class="bill-list">
            <div class="bill-item" v-for="bill in filteredBills" :key="bill.id">
              <div class="bill-info">
                <div class="bill-title">{{ bill.title }}</div>
                <div class="bill-meta">
                  <span class="bill-date">{{ bill.date }}</span>
                  <span class="bill-amount">{{ bill.amount }}</span>
                </div>
              </div>
              <div class="bill-status" :class="bill.status">
                {{ getBillStatusText(bill.status) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])
const activeTab = ref('methods')
const billFilter = ref('all')

// 支付方式数据
const paymentMethods = ref([
  {
    id: 1,
    type: 'alipay',
    name: '支付宝',
    detail: '尾号 1234',
    isDefault: true
  },
  {
    id: 2,
    type: 'wechat',
    name: '微信支付',
    detail: '尾号 5678',
    isDefault: false
  },
  {
    id: 3,
    type: 'card',
    name: '招商银行',
    detail: '尾号 9012',
    isDefault: false
  }
])

// 账单记录数据
const bills = ref([
  {
    id: 1,
    title: '月度会员订阅',
    date: '2024-03-20',
    amount: '¥9.9',
    status: 'success'
  },
  {
    id: 2,
    title: '云空间升级',
    date: '2024-03-15',
    amount: '¥29.9',
    status: 'success'
  },
  {
    id: 3,
    title: '年度会员订阅',
    date: '2024-03-10',
    amount: '¥99',
    status: 'refunded'
  }
])

// 过滤后的账单列表
const filteredBills = computed(() => {
  if (billFilter.value === 'all') return bills.value
  return bills.value.filter(bill => bill.type === billFilter.value)
})

// 工具函数
const getPaymentMethodIcon = (type) => {
  const icons = {
    alipay: 'fab fa-alipay',
    wechat: 'fab fa-weixin',
    card: 'fas fa-credit-card'
  }
  return icons[type] || 'fas fa-wallet'
}

const getBillStatusText = (status) => {
  const statusMap = {
    success: '支付成功',
    pending: '处理中',
    failed: '支付失败',
    refunded: '已退款'
  }
  return statusMap[status] || status
}

// 事件处理
const handleClose = () => {
  emit('update:visible', false)
}

const handleSetDefault = (method) => {
  paymentMethods.value.forEach(m => {
    m.isDefault = m.id === method.id
  })
  ElMessage.success('已设置默认支付方式')
}

const handleDeleteMethod = (method) => {
  ElMessageBox.confirm(
    '确定要删除该支付方式吗？',
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    paymentMethods.value = paymentMethods.value.filter(m => m.id !== method.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const handleAddMethod = () => {
  // TODO: 实现添加支付方式的逻辑
  ElMessage.info('添加支付方式功能开发中')
}
</script>

<style scoped>
:deep(.mobile-dialog) {
  margin: 0 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  display: flex;
  flex-direction: column;
}

:deep(.mobile-dialog .el-dialog__header) {
  padding: 0;
  margin: 0;
  border-bottom: 1px solid var(--light-gray);
}

:deep(.mobile-dialog .el-dialog__body) {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: white;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-blue);
}

.dialog-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  font-size: 20px;
}

.dialog-content {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.tab-container {
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--light-gray);
  margin-bottom: 16px;
}

.tab-item {
  padding: 12px 16px;
  font-size: 15px;
  cursor: pointer;
  color: var(--text-gray);
  position: relative;
  text-align: center;
  flex: 1;
}

.tab-item.active {
  color: var(--purple);
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--purple);
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

.payment-methods {
  margin-bottom: 16px;
}

.method-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.method-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: var(--purple);
  font-size: 20px;
}

.method-info {
  flex: 1;
}

.method-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.method-detail {
  font-size: 13px;
  color: var(--text-gray);
}

.method-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.add-method-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  border: none;
}

.bill-filters {
  margin-bottom: 16px;
}

:deep(.el-select) {
  width: 100%;
}

.bill-list {
  margin-bottom: 16px;
}

.bill-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.bill-info {
  flex: 1;
}

.bill-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.bill-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--text-gray);
}

.bill-status {
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 4px;
}

.bill-status.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.bill-status.pending {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.bill-status.failed {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.bill-status.refunded {
  background-color: rgba(99, 102, 241, 0.1);
  color: var(--purple);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 