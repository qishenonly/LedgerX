<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="数据恢复"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">数据恢复</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="recovery-intro">
        <div class="intro-icon">
          <i class="fas fa-sync-alt"></i>
        </div>
        <div class="intro-text">
          <div class="intro-title">数据恢复服务</div>
          <div class="intro-desc">
            可恢复已删除的账单、分类和预算数据，或者回退到之前的版本
          </div>
        </div>
      </div>

      <div class="tab-container">
        <div class="tabs">
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'history' }"
            @click="activeTab = 'history'"
          >
            备份历史
          </div>
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'deleted' }"
            @click="activeTab = 'deleted'"
          >
            已删除项目
          </div>
        </div>

        <!-- 备份历史 Tab -->
        <div class="tab-content" v-if="activeTab === 'history'">
          <div v-if="backupHistory.length > 0">
            <div class="backup-item" v-for="(backup, index) in backupHistory" :key="index">
              <div class="backup-info">
                <div class="backup-date">{{ backup.date }}</div>
                <div class="backup-meta">
                  <span class="backup-size">{{ formatSize(backup.size) }}</span>
                  <span class="backup-device">{{ backup.device }}</span>
                </div>
              </div>
              <div class="backup-actions">
                <el-button type="primary" size="small" @click="handleRestore(backup)">
                  <i class="fas fa-history"></i> 恢复
                </el-button>
                <el-button type="text" size="small" @click="handleViewBackupDetail(backup)">
                  <i class="fas fa-eye"></i>
                </el-button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <i class="fas fa-database"></i>
            <p>暂无备份记录</p>
          </div>
        </div>

        <!-- 已删除项目 Tab -->
        <div class="tab-content" v-if="activeTab === 'deleted'">
          <div v-if="deletedItems.length > 0">
            <div class="section-title">最近30天内删除的数据</div>
            <div class="deleted-item" v-for="(item, index) in deletedItems" :key="index">
              <div class="deleted-icon">
                <i :class="getDeletedItemIcon(item.type)"></i>
              </div>
              <div class="deleted-info">
                <div class="deleted-title">{{ item.name }}</div>
                <div class="deleted-meta">
                  <span class="deleted-type">{{ getDeletedItemTypeName(item.type) }}</span>
                  <span class="deleted-date">删除于 {{ item.deletedDate }}</span>
                </div>
              </div>
              <div class="deleted-actions">
                <el-button type="primary" size="small" @click="handleRecoverItem(item)">恢复</el-button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <i class="fas fa-trash-alt"></i>
            <p>暂无已删除项目</p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])
const activeTab = ref('history')

// 备份历史数据
const backupHistory = ref([
  {
    date: '2024-03-20 08:30:00',
    size: 2.5 * 1024 * 1024, // 2.5MB
    device: '本机自动备份',
    content: {
      accounts: 3,
      transactions: 158,
      categories: 15
    }
  },
  {
    date: '2024-03-13 08:30:00',
    size: 2.3 * 1024 * 1024, // 2.3MB
    device: '本机自动备份',
    content: {
      accounts: 3,
      transactions: 142,
      categories: 15
    }
  },
  {
    date: '2024-03-06 14:22:36',
    size: 2.1 * 1024 * 1024, // 2.1MB
    device: '手动备份',
    content: {
      accounts: 3,
      transactions: 126,
      categories: 14
    }
  }
])

// 已删除项目数据
const deletedItems = ref([
  {
    id: 1,
    name: '2024年3月超市购物',
    type: 'transaction',
    amount: 245.5,
    deletedDate: '2024-03-19 14:35'
  },
  {
    id: 2,
    name: '餐饮',
    type: 'category',
    deletedDate: '2024-03-17 08:21'
  },
  {
    id: 3,
    name: '3月娱乐预算',
    type: 'budget',
    amount: 600,
    deletedDate: '2024-03-15 21:10'
  }
])

// 工具函数
const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}

const getDeletedItemIcon = (type) => {
  const icons = {
    transaction: 'fas fa-receipt',
    category: 'fas fa-tags',
    budget: 'fas fa-chart-pie',
    account: 'fas fa-wallet'
  }
  return icons[type] || 'fas fa-file'
}

const getDeletedItemTypeName = (type) => {
  const types = {
    transaction: '账单',
    category: '分类',
    budget: '预算',
    account: '账户'
  }
  return types[type] || '未知类型'
}

// 事件处理
const handleClose = () => {
  emit('update:visible', false)
}

const handleRestore = (backup) => {
  ElMessageBox.confirm(
    `确定要将数据恢复到 ${backup.date} 的备份状态吗？当前数据将被覆盖。`,
    '恢复确认',
    {
      confirmButtonText: '确认恢复',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用恢复API
    ElMessage.success('数据恢复成功！')
  }).catch(() => {
    ElMessage.info('已取消恢复操作')
  })
}

const handleViewBackupDetail = (backup) => {
  ElMessageBox.alert(
    `账户: ${backup.content.accounts}个
     交易记录: ${backup.content.transactions}笔
     分类: ${backup.content.categories}个`,
    '备份详情',
    {
      confirmButtonText: '确定'
    }
  )
}

const handleRecoverItem = (item) => {
  ElMessage.success(`成功恢复: ${item.name}`)
  // TODO: 调用恢复API
  // 从列表中移除已恢复的项目
  deletedItems.value = deletedItems.value.filter(i => i.id !== item.id)
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

.recovery-intro {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: rgba(99, 102, 241, 0.05);
  border-radius: 12px;
}

.intro-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: white;
  font-size: 24px;
}

.intro-text {
  flex: 1;
}

.intro-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.intro-desc {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.5;
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

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 16px;
}

.backup-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.backup-info {
  flex: 1;
}

.backup-date {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.backup-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--text-gray);
}

.backup-actions {
  display: flex;
  gap: 8px;
}

.deleted-item {
  display: flex;
  align-items: center;
  padding: 14px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 8px;
}

.deleted-icon {
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

.deleted-info {
  flex: 1;
}

.deleted-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.deleted-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--text-gray);
}

.deleted-type {
  padding: 2px 6px;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 4px;
  color: var(--purple);
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 