<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="会员特权"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">会员特权</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="membership-header">
        <div class="membership-title">LedgerX 会员</div>
        <div class="membership-subtitle">解锁更多高级功能</div>
      </div>

      <div class="membership-features">
        <div class="feature-item">
          <div class="feature-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <div class="feature-text">
            <h4>无限云空间</h4>
            <p>享受无限云存储空间，随时随地访问您的数据</p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="feature-text">
            <h4>高级数据分析</h4>
            <p>获取详细的消费分析报告和个性化建议</p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <i class="fas fa-sync"></i>
          </div>
          <div class="feature-text">
            <h4>自动数据备份</h4>
            <p>自动备份您的数据，确保数据安全</p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <i class="fas fa-ad"></i>
          </div>
          <div class="feature-text">
            <h4>无广告体验</h4>
            <p>享受纯净无广告的使用体验</p>
          </div>
        </div>
      </div>

      <div class="pricing-section">
        <div class="pricing-title">选择套餐</div>
        <div class="pricing-options">
          <div 
            class="pricing-option" 
            :class="{ active: selectedPlan === 'monthly' }"
            @click="selectedPlan = 'monthly'"
          >
            <div class="option-title">月度会员</div>
            <div class="option-price">¥9.9<span>/月</span></div>
            <div class="option-desc">适合短期使用</div>
          </div>
          <div 
            class="pricing-option" 
            :class="{ active: selectedPlan === 'yearly' }"
            @click="selectedPlan = 'yearly'"
          >
            <div class="option-title">年度会员</div>
            <div class="option-price">¥99<span>/年</span></div>
            <div class="option-desc">节省 16%</div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleClose">取消</el-button>
        <el-button type="primary" class="subscribe-btn" @click="handleSubscribe">
          立即开通
        </el-button>
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
const selectedPlan = ref('monthly')

const handleClose = () => {
  emit('update:visible', false)
}

const handleSubscribe = () => {
  // TODO: 这里应该调用支付API
  ElMessage.success('开通成功！')
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

.membership-header {
  text-align: center;
  margin-bottom: 24px;
}

.membership-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--dark-blue);
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.membership-subtitle {
  font-size: 14px;
  color: var(--text-gray);
}

.membership-features {
  margin-bottom: 24px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
  font-size: 20px;
}

.feature-text {
  flex: 1;
}

.feature-text h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  margin: 0 0 4px 0;
}

.feature-text p {
  font-size: 14px;
  color: var(--text-gray);
  margin: 0;
  line-height: 1.5;
}

.pricing-section {
  margin-top: 24px;
}

.pricing-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 16px;
}

.pricing-options {
  display: flex;
  gap: 12px;
}

.pricing-option {
  flex: 1;
  padding: 16px;
  border: 1px solid var(--light-gray);
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pricing-option.active {
  border-color: var(--purple);
  background-color: rgba(99, 102, 241, 0.05);
}

.option-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 8px;
}

.option-price {
  font-size: 24px;
  font-weight: 700;
  color: var(--purple);
  margin-bottom: 4px;
}

.option-price span {
  font-size: 14px;
  font-weight: normal;
  color: var(--text-gray);
}

.option-desc {
  font-size: 12px;
  color: var(--text-gray);
}

.dialog-footer {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
}

.cancel-btn,
.subscribe-btn {
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

.subscribe-btn {
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