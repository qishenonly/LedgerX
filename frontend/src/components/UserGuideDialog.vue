<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="使用指南"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    custom-class="mobile-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">使用指南</div>
        <div class="dialog-close" @click="handleClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </template>
    <div class="dialog-content">
      <div class="guide-section">
        <h3>记账功能</h3>
        <div class="guide-item">
          <div class="guide-icon">
            <i class="fas fa-plus-circle"></i>
          </div>
          <div class="guide-text">
            <h4>添加记录</h4>
            <p>点击底部"+"按钮，快速记录您的收支情况</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">
            <i class="fas fa-tags"></i>
          </div>
          <div class="guide-text">
            <h4>分类管理</h4>
            <p>支持自定义收支分类，方便统计和管理</p>
          </div>
        </div>
      </div>

      <div class="guide-section">
        <h3>预算管理</h3>
        <div class="guide-item">
          <div class="guide-icon">
            <i class="fas fa-chart-pie"></i>
          </div>
          <div class="guide-text">
            <h4>设置预算</h4>
            <p>可按月设置总预算和分类预算，合理规划支出</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">
            <i class="fas fa-bell"></i>
          </div>
          <div class="guide-text">
            <h4>预算提醒</h4>
            <p>当支出接近预算时，会收到智能提醒</p>
          </div>
        </div>
      </div>

      <div class="guide-section">
        <h3>数据统计</h3>
        <div class="guide-item">
          <div class="guide-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="guide-text">
            <h4>收支趋势</h4>
            <p>查看每日、每月收支趋势，了解消费习惯</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">
            <i class="fas fa-file-export"></i>
          </div>
          <div class="guide-text">
            <h4>数据导出</h4>
            <p>支持导出账单数据，方便保存和分析</p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])

const handleClose = () => {
  emit('update:visible', false)
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

.guide-section {
  margin-bottom: 24px;
}

.guide-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 16px;
  padding-left: 8px;
  border-left: 3px solid var(--purple);
}

.guide-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.guide-icon {
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

.guide-text {
  flex: 1;
}

.guide-text h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  margin: 0 0 4px 0;
}

.guide-text p {
  font-size: 14px;
  color: var(--text-gray);
  margin: 0;
  line-height: 1.5;
}
</style> 