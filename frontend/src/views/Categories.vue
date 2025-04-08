<template>
  <div class="categories-container">
    <div class="section-title">分类管理</div>
    
    <div class="type-selector">
      <div 
        class="type-option" 
        :class="{ selected: activeType === 'expense' }"
        @click="activeType = 'expense'"
      >支出分类</div>
      <div 
        class="type-option" 
        :class="{ selected: activeType === 'income' }"
        @click="activeType = 'income'"
      >收入分类</div>
    </div>
    
    <div class="section-header">
      <span>所有分类</span>
      <el-button type="primary" class="add-category-btn" size="small" @click="showAddCategoryDialog">
        添加
      </el-button>
    </div>
    
    <div class="card categories-list">
      <div 
        class="category-list-item" 
        v-for="category in currentCategories" 
        :key="category.id"
        @click="handleCategoryClick(category)"
      >
        <div class="category-list-icon">
          <i :class="`fas ${category.icon}`"></i>
        </div>
        <div class="category-list-info">
          <div class="category-list-name">{{ category.name }}</div>
          <div class="category-list-count">{{ category.count }}笔{{ activeType === 'expense' ? '支出' : '收入' }} / 本月</div>
        </div>
        <div class="menu-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
      
      <el-empty v-if="!currentCategories.length" description="暂无分类" />
    </div>
    
    <!-- 添加/编辑分类对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑分类' : '添加分类'"
      width="90%"
      :before-close="handleDialogClose"
    >
      <div class="category-form">
        <div class="form-group">
          <label class="form-label">分类名称</label>
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称"></el-input>
        </div>
        
        <div class="form-group">
          <label class="form-label">图标</label>
          <div class="icon-selector">
            <div 
              v-for="icon in icons" 
              :key="icon"
              class="icon-option" 
              :class="{ selected: categoryForm.icon === icon }"
              @click="categoryForm.icon = icon"
            >
              <i :class="`fas ${icon}`"></i>
            </div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleDialogClose">取消</el-button>
          <el-button type="primary" @click="saveCategoryForm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    
    <div style="height: 80px;"></div> <!-- 底部间距 -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import { ElMessage, ElMessageBox } from 'element-plus'

const transactionStore = useTransactionStore()
const activeType = ref('expense')
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentEditId = ref(null)

// 可用图标列表
const icons = [
  'fa-utensils',
  'fa-shopping-bag',
  'fa-home',
  'fa-car',
  'fa-gamepad',
  'fa-heartbeat',
  'fa-graduation-cap',
  'fa-ellipsis-h',
  'fa-money-bill-wave',
  'fa-gift',
  'fa-chart-line',
  'fa-receipt',
  'fa-plane',
  'fa-tshirt',
  'fa-coffee',
  'fa-birthday-cake'
]

// 根据当前选择的类型获取分类列表
const currentCategories = computed(() => {
  return transactionStore.categories[activeType.value]
})

// 分类表单
const categoryForm = ref({
  name: '',
  icon: 'fa-utensils'
})

// 显示添加分类对话框
const showAddCategoryDialog = () => {
  isEdit.value = false
  currentEditId.value = null
  categoryForm.value = {
    name: '',
    icon: 'fa-utensils'
  }
  dialogVisible.value = true
}

// 处理分类点击事件
const handleCategoryClick = (category) => {
  isEdit.value = true
  currentEditId.value = category.id
  categoryForm.value = {
    name: category.name,
    icon: category.icon
  }
  dialogVisible.value = true
}

// 保存分类表单
const saveCategoryForm = () => {
  if (!categoryForm.value.name) {
    ElMessage.warning('请输入分类名称')
    return
  }
  
  // 这里应该调用 store 中的方法来保存分类
  // 在实际项目中，这里应该连接到后端 API
  
  if (isEdit.value && currentEditId.value) {
    // 编辑已有分类
    ElMessage.success('分类已更新')
  } else {
    // 添加新分类
    ElMessage.success('分类已添加')
  }
  
  dialogVisible.value = false
}

// 关闭对话框
const handleDialogClose = () => {
  dialogVisible.value = false
}
</script>

<style scoped>
.categories-container {
  padding: 8px; /* 减少内边距 */
}

.section-title {
  font-size: 16px; /* 减小字体大小 */
  font-weight: 600;
  margin-bottom: 12px; /* 减少下边距 */
  color: var(--dark-blue);
}

.type-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px; /* 减少下边距 */
}

.type-option {
  flex: 1;
  text-align: center;
  padding: 10px; /* 减少内边距 */
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
}

.type-option:first-child {
  margin-right: 8px;
}

.type-option.selected {
  background-color: var(--purple);
  color: white;
  border-color: var(--purple);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px; /* 减少下边距 */
}

.section-header span {
  font-size: 15px; /* 减小字体大小 */
  font-weight: 500;
  color: var(--text-gray);
}

.add-category-btn {
  font-size: 13px; /* 减小字体大小 */
  padding: 6px 12px; /* 减少内边距 */
}

.categories-list {
  margin-bottom: 12px; /* 减少下边距 */
}

.category-list-item {
  display: flex;
  align-items: center;
  padding: 10px 0; /* 减少内边距 */
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-list-item:last-child {
  border-bottom: none;
}

.category-list-item:hover {
  transform: translateX(5px);
  background-color: rgba(99, 102, 241, 0.05);
}

.category-list-icon {
  width: 36px; /* 减小图标尺寸 */
  height: 36px; /* 减小图标尺寸 */
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  color: var(--purple);
}

.category-list-info {
  flex: 1;
}

.category-list-name {
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px; /* 减小字体大小 */
}

.category-list-count {
  font-size: 12px; /* 减小字体大小 */
  color: var(--text-gray);
}

.menu-arrow {
  color: var(--text-gray);
  padding: 0 8px; /* 减少内边距 */
}

.category-form {
  padding: 0 8px; /* 减少内边距 */
}

.form-group {
  margin-bottom: 12px; /* 减少下边距 */
}

.form-label {
  display: block;
  font-size: 14px; /* 减小字体大小 */
  font-weight: 500;
  margin-bottom: 6px; /* 减少下边距 */
  color: var(--dark-blue);
}

.icon-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px; /* 减少间距 */
}

.icon-option {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 8px; /* 减小圆角 */
  font-size: 22px; /* 减小图标大小 */
  color: var(--dark-blue);
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.icon-option.selected {
  background-color: var(--purple);
  color: white;
}

.dialog-footer {
  text-align: right;
  margin-top: 8px; /* 减少上边距 */
}

/* 移除底部多余的间距 */
div[style="height: 80px;"] {
  height: 16px !important; /* 大幅减少底部间距 */
}
</style> 