<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="云空间"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">云空间</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="storage-overview">
        <div class="storage-title">存储空间</div>
        <div class="storage-progress">
          <el-progress 
            :percentage="storagePercentage" 
            :color="storageColor"
            :show-text="false"
          />
          <div class="storage-info">
            <span class="used">{{ formatSize(usedStorage) }}</span>
            <span class="total">/ {{ formatSize(totalStorage) }}</span>
          </div>
        </div>
      </div>

      <div class="backup-section">
        <div class="section-title">自动备份</div>
        <div class="backup-status">
          <div class="status-item">
            <div class="status-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="status-info">
              <div class="status-title">上次备份时间</div>
              <div class="status-value">{{ lastBackupTime }}</div>
            </div>
          </div>
          <div class="status-item">
            <div class="status-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="status-info">
              <div class="status-title">备份频率</div>
              <div class="status-value">每天 00:00</div>
            </div>
          </div>
        </div>
        <el-button class="backup-btn" @click="handleBackup">
          <i class="fas fa-sync"></i>
          立即备份
        </el-button>
      </div>

      <div class="file-section">
        <div class="section-title">文件管理</div>
        <div class="file-list">
          <div class="file-item" v-for="file in files" :key="file.id">
            <div class="file-icon">
              <i :class="getFileIcon(file.type)"></i>
            </div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-meta">
                <span class="file-size">{{ formatSize(file.size) }}</span>
                <span class="file-date">{{ file.date }}</span>
              </div>
            </div>
            <div class="file-actions">
              <el-button type="text" @click="handleDownload(file)">
                <i class="fas fa-download"></i>
              </el-button>
              <el-button type="text" @click="handleDelete(file)">
                <i class="fas fa-trash"></i>
              </el-button>
            </div>
          </div>
        </div>
        <el-upload
          class="upload-btn"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <el-button type="primary">
            <i class="fas fa-cloud-upload-alt"></i>
            上传文件
          </el-button>
        </el-upload>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])

// 存储空间数据
const totalStorage = ref(1024 * 1024 * 1024) // 1GB
const usedStorage = ref(256 * 1024 * 1024) // 256MB
const storagePercentage = computed(() => Math.round((usedStorage.value / totalStorage.value) * 100))
const storageColor = computed(() => {
  if (storagePercentage.value > 90) return '#ef4444'
  if (storagePercentage.value > 70) return '#f59e0b'
  return '#10b981'
})

// 备份数据
const lastBackupTime = ref('2024-03-20 00:00:00')

// 文件列表
const files = ref([
  {
    id: 1,
    name: '2024年3月账单.xlsx',
    type: 'excel',
    size: 1024 * 1024, // 1MB
    date: '2024-03-20'
  },
  {
    id: 2,
    name: '消费分析报告.pdf',
    type: 'pdf',
    size: 2 * 1024 * 1024, // 2MB
    date: '2024-03-19'
  }
])

// 工具函数
const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}

const getFileIcon = (type) => {
  const icons = {
    excel: 'fas fa-file-excel',
    pdf: 'fas fa-file-pdf',
    word: 'fas fa-file-word',
    image: 'fas fa-file-image',
    default: 'fas fa-file'
  }
  return icons[type] || icons.default
}

// 事件处理
const handleClose = () => {
  emit('update:visible', false)
}

const handleBackup = () => {
  // TODO: 调用备份API
  ElMessage.success('备份成功！')
}

const handleDownload = (file) => {
  // TODO: 调用下载API
  ElMessage.success('开始下载：' + file.name)
}

const handleDelete = (file) => {
  // TODO: 调用删除API
  ElMessage.success('删除成功：' + file.name)
}

const handleUploadSuccess = (response) => {
  ElMessage.success('上传成功！')
  // TODO: 更新文件列表
}

const handleUploadError = () => {
  ElMessage.error('上传失败，请重试')
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

.storage-overview {
  margin-bottom: 24px;
}

.storage-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 12px;
}

.storage-progress {
  position: relative;
}

:deep(.el-progress-bar__outer) {
  height: 8px !important;
  border-radius: 4px;
}

.storage-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
}

.used {
  color: var(--dark-blue);
  font-weight: 500;
}

.total {
  color: var(--text-gray);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 16px;
}

.backup-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.backup-status {
  margin-bottom: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.status-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: var(--purple);
  font-size: 18px;
}

.status-info {
  flex: 1;
}

.status-title {
  font-size: 14px;
  color: var(--text-gray);
  margin-bottom: 2px;
}

.status-value {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
}

.backup-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  border: none;
}

.file-section {
  margin-bottom: 24px;
}

.file-list {
  margin-bottom: 16px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 8px;
}

.file-icon {
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

.file-info {
  flex: 1;
}

.file-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.file-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--text-gray);
}

.file-actions {
  display: flex;
  gap: 8px;
}

.upload-btn {
  width: 100%;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload .el-button) {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
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