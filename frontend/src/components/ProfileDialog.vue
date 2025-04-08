<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="个人资料"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">个人资料</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="profile-section">
        <div class="avatar-upload">
          <div class="avatar-preview" @click="triggerUpload">
            <template v-if="profileForm.avatar">
              <img :src="profileForm.avatar" alt="用户头像">
            </template>
            <template v-else>
              <i class="fas fa-user"></i>
            </template>
            <div class="upload-mask">
              <i class="fas fa-camera"></i>
            </div>
          </div>
          <input 
            type="file" 
            ref="fileInput" 
            accept="image/*" 
            @change="handleAvatarChange"
            style="display: none"
          >
        </div>

        <el-form :model="profileForm" label-width="80px" class="profile-form">
          <el-form-item label="用户名">
            <el-input v-model="profileForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="profileForm.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="profileForm.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
              <el-radio label="other">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="profileForm.birthday"
              type="date"
              placeholder="选择生日"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input
              v-model="profileForm.bio"
              type="textarea"
              :rows="3"
              placeholder="请输入个性签名"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleClose">取消</el-button>
        <el-button type="primary" class="save-btn" @click="handleSave">保存</el-button>
      </div>
    </template>
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
const fileInput = ref(null)

// 个人资料表单
const profileForm = ref({
  avatar: userStore.userInfo.avatar || '',
  username: userStore.userInfo.username || '',
  nickname: userStore.userInfo.nickname || '',
  gender: userStore.userInfo.gender || 'other',
  birthday: userStore.userInfo.birthday || '',
  bio: userStore.userInfo.bio || ''
})

// 事件处理
const handleClose = () => {
  emit('update:visible', false)
}

const triggerUpload = () => {
  fileInput.value.click()
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 这里应该调用上传API，暂时使用本地预览
    const reader = new FileReader()
    reader.onload = (e) => {
      profileForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSave = () => {
  // TODO: 调用保存API
  ElMessage.success('保存成功')
  handleClose()
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

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-upload {
  margin-bottom: 24px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-preview i {
  font-size: 40px;
  color: var(--text-gray);
}

.upload-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-preview:hover .upload-mask {
  opacity: 1;
}

.upload-mask i {
  color: white;
  font-size: 24px;
}

.profile-form {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-size: 14px;
  color: var(--dark-blue);
}

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  font-size: 14px;
}

:deep(.el-radio) {
  margin-right: 16px;
}

:deep(.el-radio__label) {
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  gap: 12px;
}

.cancel-btn,
.save-btn {
  flex: 1;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: var(--dark-blue);
  border: none;
}

.save-btn {
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