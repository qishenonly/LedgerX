<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="消息中心"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">消息中心</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="message-tabs">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'all' }"
          @click="activeTab = 'all'"
        >
          全部
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'system' }"
          @click="activeTab = 'system'"
        >
          系统通知
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'activity' }"
          @click="activeTab = 'activity'"
        >
          活动提醒
        </div>
      </div>
      
      <div class="message-filter">
        <el-select v-model="readFilter" placeholder="全部状态" size="small">
          <el-option label="全部状态" value="all" />
          <el-option label="未读" value="unread" />
          <el-option label="已读" value="read" />
        </el-select>
      </div>
      
      <div class="message-list">
        <div v-if="filteredMessages.length > 0">
          <div v-for="(message, index) in filteredMessages" :key="index" class="message-item" :class="{'unread': !message.read}" @click="handleReadMessage(message)">
            <div class="message-icon" :class="message.type">
              <i :class="getMessageIcon(message.type)"></i>
            </div>
            <div class="message-content">
              <div class="message-header">
                <div class="message-title">
                  <span class="message-badge" v-if="!message.read">新</span>
                  {{ message.title }}
                </div>
                <div class="message-time">{{ message.time }}</div>
              </div>
              <div class="message-text">{{ message.content }}</div>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <i class="fas fa-envelope-open"></i>
          <p>暂无消息</p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="clear-btn" @click="handleClearMessages" v-if="filteredMessages.length > 0">
          清空消息
        </el-button>
        <el-button type="primary" class="read-all-btn" @click="handleReadAll" v-if="hasUnread">
          全部已读
        </el-button>
      </div>
    </template>
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
const activeTab = ref('all')
const readFilter = ref('all')

// 消息数据
const messages = ref([
  {
    id: 1,
    type: 'budget',
    title: '预算提醒',
    content: '您的"餐饮"类别已使用80%的预算，请注意控制支出。',
    time: '2024-05-12 09:30',
    read: false
  },
  {
    id: 2,
    type: 'bill',
    title: '固定支出提醒',
    content: '您有一笔房租将于3天后自动记账，请确保账户余额充足。',
    time: '2024-05-11 15:25',
    read: false
  },
  {
    id: 3,
    type: 'system',
    title: '账号安全提醒',
    content: '您的账号于今日14:30在新设备上登录，如非本人操作，请立即修改密码。',
    time: '2024-05-10 14:35',
    read: true
  },
  {
    id: 4,
    type: 'activity',
    title: '限时优惠活动',
    content: '年度会员限时特惠，立省30元，活动截止到本周日。',
    time: '2024-05-09 11:20',
    read: true
  },
  {
    id: 5,
    type: 'analysis',
    title: '月度分析报告',
    content: '您的4月份财务分析报告已生成，点击查看本月收支情况。',
    time: '2024-05-01 00:05',
    read: true
  }
])

// 消息图标
const getMessageIcon = (type) => {
  const icons = {
    budget: 'fas fa-chart-pie',
    bill: 'fas fa-receipt',
    system: 'fas fa-shield-alt',
    activity: 'fas fa-gift',
    analysis: 'fas fa-chart-line'
  }
  return icons[type] || 'fas fa-bell'
}

// 筛选后的消息列表
const filteredMessages = computed(() => {
  let result = messages.value

  // 按标签筛选
  if (activeTab.value !== 'all') {
    result = result.filter(message => {
      if (activeTab.value === 'system') {
        return ['system', 'budget', 'bill', 'analysis'].includes(message.type)
      } else if (activeTab.value === 'activity') {
        return message.type === 'activity'
      }
      return true
    })
  }

  // 按已读/未读状态筛选
  if (readFilter.value !== 'all') {
    result = result.filter(message => {
      if (readFilter.value === 'unread') {
        return !message.read
      } else {
        return message.read
      }
    })
  }

  return result
})

// 是否有未读消息
const hasUnread = computed(() => {
  return filteredMessages.value.some(item => !item.read)
})

// 处理关闭对话框
const handleClose = () => {
  emit('update:visible', false)
}

// 标记消息为已读
const handleReadMessage = (message) => {
  if (!message.read) {
    message.read = true
    ElMessage.success('消息已标记为已读')
  }
}

// 标记全部已读
const handleReadAll = () => {
  filteredMessages.value.forEach(item => {
    item.read = true
  })
  ElMessage.success('已全部标记为已读')
}

// 清空消息
const handleClearMessages = () => {
  ElMessageBox.confirm(
    '确定要清空当前筛选的所有消息吗？此操作不可恢复。',
    '提示',
    {
      confirmButtonText: '确认清空',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 根据当前筛选条件清空消息
    const idsToRemove = filteredMessages.value.map(item => item.id)
    messages.value = messages.value.filter(message => !idsToRemove.includes(message.id))
    ElMessage.success('消息已清空')
  }).catch(() => {
    ElMessage.info('已取消清空操作')
  })
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

:deep(.mobile-dialog .el-dialog__footer) {
  padding: 12px 16px;
  border-top: 1px solid var(--light-gray);
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

.message-tabs {
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

.message-filter {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-select) {
  width: 120px;
}

.message-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border-left: 3px solid var(--light-gray);
  transition: all 0.3s ease;
  cursor: pointer;
}

.message-item.unread {
  border-left-color: var(--purple);
  background-color: rgba(99, 102, 241, 0.05);
}

.message-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
  font-size: 18px;
}

.message-icon.budget {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
}

.message-icon.bill {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.message-icon.system {
  background: linear-gradient(135deg, #ef4444, #f87171);
}

.message-icon.activity {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}

.message-icon.analysis {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.message-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-badge {
  background-color: var(--purple);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: normal;
}

.message-time {
  font-size: 12px;
  color: var(--text-gray);
}

.message-text {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  color: var(--text-gray);
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state p {
  font-size: 15px;
}

.dialog-footer {
  display: flex;
  gap: 12px;
}

.clear-btn, 
.read-all-btn {
  flex: 1;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

.clear-btn {
  background-color: #f5f5f5;
  color: var(--dark-blue);
  border: none;
}

.read-all-btn {
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  border: none;
}

/* 适配 iOS 底部安全区域 */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  :deep(.mobile-dialog .el-dialog__footer) {
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
  }
}
</style> 