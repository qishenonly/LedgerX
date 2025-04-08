<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="意见反馈"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">意见反馈</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="feedback-form">
        <el-form :model="feedbackForm" label-width="80px">
          <el-form-item label="反馈类型">
            <el-select v-model="feedbackForm.type" placeholder="请选择反馈类型">
              <el-option label="功能建议" value="suggestion" />
              <el-option label="问题反馈" value="bug" />
              <el-option label="其他" value="other" />
            </el-select>
          </el-form-item>
          <el-form-item label="反馈内容">
            <el-input
              v-model="feedbackForm.content"
              type="textarea"
              :rows="4"
              placeholder="请输入您的反馈内容"
            />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input
              v-model="feedbackForm.contact"
              placeholder="请输入您的联系方式（选填）"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleClose">取消</el-button>
        <el-button type="primary" class="submit-btn" @click="handleSubmit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])

const feedbackForm = ref({
  type: '',
  content: '',
  contact: ''
})

const handleClose = () => {
  feedbackForm.value = {
    type: '',
    content: '',
    contact: ''
  }
  emit('update:visible', false)
}

const handleSubmit = () => {
  if (!feedbackForm.value.type || !feedbackForm.value.content) {
    ElMessage.warning('请填写反馈类型和内容')
    return
  }
  
  // TODO: 这里应该调用API提交反馈
  ElMessage.success('感谢您的反馈！')
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
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.feedback-form {
  padding: 16px;
}

:deep(.el-form-item__label) {
  font-size: 14px;
}

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  font-size: 14px;
}

:deep(.el-select) {
  width: 100%;
}

.dialog-footer {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
}

.cancel-btn,
.submit-btn {
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

.submit-btn {
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