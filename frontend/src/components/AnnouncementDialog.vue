<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="系统公告"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">系统公告</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="announcements">
        <div v-for="(announcement, index) in announcements" :key="index" class="announcement-item" :class="{'unread': !announcement.read}">
          <div class="announcement-header">
            <div class="announcement-title">
              <span class="announcement-badge" v-if="!announcement.read">新</span>
              {{ announcement.title }}
            </div>
            <div class="announcement-time">{{ announcement.time }}</div>
          </div>
          <div class="announcement-content" v-html="announcement.content"></div>
          <div class="announcement-footer" v-if="announcement.link">
            <el-button type="primary" size="small" @click="handleOpenLink(announcement.link)">
              查看详情
            </el-button>
          </div>
        </div>
      </div>
      
      <div v-if="announcements.length === 0" class="empty-state">
        <i class="fas fa-bullhorn"></i>
        <p>暂无系统公告</p>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="close-btn" @click="handleClose">关闭</el-button>
        <el-button type="primary" class="read-all-btn" @click="handleReadAll" v-if="hasUnread">
          全部已读
        </el-button>
      </div>
    </template>
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

// 公告数据
const announcements = ref([
  {
    id: 1,
    title: '系统更新通知',
    content: '尊敬的用户，LedgerX 已更新至 v2.0.0 版本，新增智能预算推荐、多维度数据分析等功能，欢迎体验！',
    time: '2024-05-10 10:00',
    read: false,
    link: ''
  },
  {
    id: 2,
    title: '新功能上线：云同步',
    content: '您现在可以在多个设备间同步您的财务数据，实现无缝切换体验。<br>请前往<b>设置 > 云同步</b>开启此功能。',
    time: '2024-05-05 14:30',
    read: false,
    link: '/settings/cloud'
  },
  {
    id: 3,
    title: '五一优惠活动',
    content: '五一期间，开通会员享受 8 折优惠，活动时间：2024.5.1-2024.5.7',
    time: '2024-04-28 09:00',
    read: true,
    link: '/membership'
  }
])

// 是否有未读公告
const hasUnread = computed(() => {
  return announcements.value.some(item => !item.read)
})

// 处理关闭对话框
const handleClose = () => {
  emit('update:visible', false)
}

// 处理打开链接
const handleOpenLink = (link) => {
  // 这里可以根据实际情况处理链接跳转
  ElMessage.info(`跳转到: ${link}`)
}

// 标记全部已读
const handleReadAll = () => {
  announcements.value.forEach(item => {
    item.read = true
  })
  ElMessage.success('已全部标记为已读')
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

.announcements {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.announcement-item {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border-left: 3px solid var(--light-gray);
  transition: all 0.3s ease;
}

.announcement-item.unread {
  border-left-color: var(--purple);
  background-color: rgba(99, 102, 241, 0.05);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.announcement-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  display: flex;
  align-items: center;
  gap: 8px;
}

.announcement-badge {
  background-color: var(--purple);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: normal;
}

.announcement-time {
  font-size: 12px;
  color: var(--text-gray);
}

.announcement-content {
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.5;
  margin-bottom: 12px;
}

.announcement-footer {
  display: flex;
  justify-content: flex-end;
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

.close-btn, 
.read-all-btn {
  flex: 1;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

.close-btn {
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