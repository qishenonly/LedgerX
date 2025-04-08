<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="账户安全"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">账户安全</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="security-section">
        <div class="section-title">登录安全</div>
        <div class="security-item">
          <div class="item-info">
            <div class="item-title">登录密码</div>
            <div class="item-desc">定期修改密码可提高账户安全性</div>
          </div>
          <el-button type="primary" @click="handleChangePassword">修改</el-button>
        </div>
        <div class="security-item">
          <div class="item-info">
            <div class="item-title">手机验证</div>
            <div class="item-desc">已绑定手机号：{{ userStore.userInfo.phone }}</div>
          </div>
          <el-button type="primary" @click="handleChangePhone">更换</el-button>
        </div>
        <div class="security-item">
          <div class="item-info">
            <div class="item-title">邮箱验证</div>
            <div class="item-desc">已绑定邮箱：{{ userStore.userInfo.email }}</div>
          </div>
          <el-button type="primary" @click="handleChangeEmail">更换</el-button>
        </div>
      </div>

      <div class="security-section">
        <div class="section-title">安全设置</div>
        <div class="security-item">
          <div class="item-info">
            <div class="item-title">指纹/面容登录</div>
            <div class="item-desc">使用生物识别技术快速登录</div>
          </div>
          <el-switch v-model="biometricEnabled" @change="handleBiometricChange" />
        </div>
        <div class="security-item">
          <div class="item-info">
            <div class="item-title">登录设备管理</div>
            <div class="item-desc">管理已登录的设备</div>
          </div>
          <el-button type="primary" @click="handleDeviceManagement">管理</el-button>
        </div>
      </div>

      <div class="security-section">
        <div class="section-title">安全日志</div>
        <div class="log-list">
          <div class="log-item" v-for="log in securityLogs" :key="log.id">
            <div class="log-icon">
              <i :class="getLogIcon(log.type)"></i>
            </div>
            <div class="log-info">
              <div class="log-title">{{ log.title }}</div>
              <div class="log-meta">
                <span class="log-time">{{ log.time }}</span>
                <span class="log-ip">{{ log.ip }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])
const userStore = useUserStore()
const biometricEnabled = ref(false)

// 安全日志数据
const securityLogs = ref([
  {
    id: 1,
    type: 'login',
    title: '账号登录',
    time: '2024-03-20 14:30',
    ip: '192.168.1.1'
  },
  {
    id: 2,
    type: 'password',
    title: '修改密码',
    time: '2024-03-19 10:15',
    ip: '192.168.1.1'
  },
  {
    id: 3,
    type: 'device',
    title: '新设备登录',
    time: '2024-03-18 16:45',
    ip: '192.168.1.2'
  }
])

// 工具函数
const getLogIcon = (type) => {
  const icons = {
    login: 'fas fa-sign-in-alt',
    password: 'fas fa-key',
    device: 'fas fa-mobile-alt',
    email: 'fas fa-envelope',
    phone: 'fas fa-phone'
  }
  return icons[type] || 'fas fa-shield-alt'
}

// 事件处理
const handleClose = () => {
  emit('update:visible', false)
}

const handleChangePassword = () => {
  // TODO: 实现修改密码逻辑
  ElMessage.info('修改密码功能开发中')
}

const handleChangePhone = () => {
  // TODO: 实现更换手机号逻辑
  ElMessage.info('更换手机号功能开发中')
}

const handleChangeEmail = () => {
  // TODO: 实现更换邮箱逻辑
  ElMessage.info('更换邮箱功能开发中')
}

const handleBiometricChange = (value) => {
  // TODO: 实现生物识别设置逻辑
  ElMessage.success(value ? '已开启生物识别登录' : '已关闭生物识别登录')
}

const handleDeviceManagement = () => {
  // TODO: 实现设备管理逻辑
  ElMessage.info('设备管理功能开发中')
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

.security-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 16px;
  padding-left: 8px;
  border-left: 3px solid var(--purple);
}

.security-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 4px;
}

.item-desc {
  font-size: 13px;
  color: var(--text-gray);
}

.log-list {
  margin-bottom: 16px;
}

.log-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 8px;
}

.log-icon {
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

.log-info {
  flex: 1;
}

.log-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-blue);
  margin-bottom: 2px;
}

.log-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--text-gray);
}

:deep(.el-button) {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 8px;
}

:deep(.el-switch) {
  --el-switch-on-color: var(--purple);
}
</style> 