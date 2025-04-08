<template>
  <div>
    <!-- 登录/注册表单 -->
    <div class="auth-container" v-if="!userStore.isLoggedIn">
      <div class="auth-logo">
        <div class="auth-logo-icon">
          <i class="fas fa-wallet"></i>
        </div>
        <h2>LedgerX</h2>
      </div>
      
      <div class="auth-tabs">
        <div 
          class="auth-tab" 
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
        >
          登录
        </div>
        <div 
          class="auth-tab" 
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >
          注册
        </div>
      </div>
      
      <!-- 登录表单 -->
      <div class="auth-form" v-if="activeTab === 'login'">
        <div class="auth-form-group">
          <el-input 
            v-model="loginForm.username" 
            placeholder="用户名/手机号/邮箱" 
            class="auth-input"
          />
        </div>
        <div class="auth-form-group">
          <el-input 
            v-model="loginForm.password" 
            placeholder="密码" 
            type="password"
            class="auth-input"
          />
        </div>
        <div class="remember-me">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        </div>
        <el-button type="primary" class="auth-btn" @click="handleLogin">登录</el-button>
        <div class="auth-extra">
          <a class="auth-link">忘记密码?</a>
        </div>
        
        <div class="auth-divider">或使用其他方式登录</div>
        
        <div class="auth-social">
          <div class="social-btn wechat">
            <i class="fab fa-weixin"></i>
          </div>
          <div class="social-btn weibo">
            <i class="fab fa-weibo"></i>
          </div>
          <div class="social-btn qq">
            <i class="fab fa-qq"></i>
          </div>
        </div>
      </div>
      
      <!-- 注册表单 -->
      <div class="auth-form" v-if="activeTab === 'register'">
        <div class="auth-form-group">
          <el-input 
            v-model="registerForm.username" 
            placeholder="用户名" 
            class="auth-input"
          />
        </div>
        <div class="auth-form-group">
          <el-input 
            v-model="registerForm.phone" 
            placeholder="手机号" 
            class="auth-input"
          />
        </div>
        <div class="auth-form-group">
          <el-input 
            v-model="registerForm.password" 
            placeholder="设置密码" 
            type="password"
            class="auth-input"
          />
        </div>
        <div class="auth-form-group">
          <el-input 
            v-model="registerForm.confirmPassword" 
            placeholder="确认密码" 
            type="password"
            class="auth-input"
          />
        </div>
        <el-button type="primary" class="auth-btn">注册</el-button>
        <div class="auth-extra">
          注册即表示同意 <a class="auth-link">用户协议</a> 和 <a class="auth-link">隐私政策</a>
        </div>
      </div>
    </div>
    
    <!-- 用户账户页面 -->
    <div v-else>
      <div class="user-profile">
        <div class="edit-profile">
          <i class="fas fa-pencil-alt"></i>
        </div>
        
        <div class="profile-header">
          <div class="avatar">
            <template v-if="userStore.userInfo.avatar">
              <img :src="userStore.userInfo.avatar" alt="用户头像">
            </template>
            <template v-else>
              <i class="fas fa-user"></i>
            </template>
          </div>
          <div class="user-info">
            <div class="user-name">{{ userStore.userInfo.name }}</div>
            <div class="user-level">
              <span class="level-badge">Lv.{{ userStore.userInfo.level }}</span>
              <span>{{ userStore.userInfo.levelName }}</span>
            </div>
          </div>
        </div>
        
        <div class="profile-stats">
          <div class="stat-item">
            <div class="stat-value">{{ userStore.userInfo.stats.days }}</div>
            <div class="stat-label">记账天数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStore.userInfo.stats.records }}</div>
            <div class="stat-label">记账笔数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStore.userInfo.stats.budgetAchieved }}</div>
            <div class="stat-label">预算达成</div>
          </div>
        </div>
      </div>
      
      <div class="account-section">
        <div class="section-heading">
          <i class="fas fa-bell"></i>
          通知与提醒
        </div>
        <div class="menu-list">
          <div class="menu-item" @click="messageCenterVisible = true">
            <div class="menu-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="menu-text">消息中心</div>
            <span class="badge">2</span>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="menu-item" @click="announcementVisible = true">
            <div class="menu-icon">
              <i class="fas fa-bullhorn"></i>
            </div>
            <div class="menu-text">系统公告</div>
            <div class="badge" v-if="true">新</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="account-section">
        <div class="section-heading">
          <i class="fas fa-cog"></i>
          账户与安全
        </div>
        <div class="menu-list">
          <div class="menu-item" @click="profileVisible = true">
            <div class="menu-icon">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="menu-text">个人资料</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="menu-item" @click="securityVisible = true">
            <div class="menu-icon">
              <i class="fas fa-lock"></i>
            </div>
            <div class="menu-text">账户安全</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="menu-item" @click="paymentVisible = true">
            <div class="menu-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <div class="menu-text">支付管理</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="account-section">
        <div class="section-heading">
          <i class="fas fa-star"></i>
          增值服务
        </div>
        <div class="menu-list">
          <div class="menu-item" @click="membershipVisible = true">
            <div class="menu-icon">
              <i class="fas fa-crown" style="color: #F59E0B;"></i>
            </div>
            <div class="menu-text">会员特权</div>
            <span class="badge green">优惠</span>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="menu-item" @click="cloudSpaceVisible = true">
            <div class="menu-icon">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div class="menu-text">云空间</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="menu-item" @click="dataRecoveryVisible = true">
            <div class="menu-icon">
              <i class="fas fa-sync"></i>
            </div>
            <div class="menu-text">数据恢复</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="account-section">
        <div class="section-heading">
          <i class="fas fa-question-circle"></i>
          帮助与支持
        </div>
        <div class="menu-list">
          <div class="menu-item" @click="userGuideVisible = true">
            <div class="menu-icon">
              <i class="fas fa-book"></i>
            </div>
            <div class="menu-text">使用指南</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="menu-item" @click="feedbackVisible = true">
            <div class="menu-icon">
              <i class="fas fa-comment-dots"></i>
            </div>
            <div class="menu-text">意见反馈</div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <el-button type="danger" class="logout-btn" plain @click="handleLogout">
        退出登录
      </el-button>
      
      <div style="height: 16px;" v-if="userStore.isLoggedIn"></div> <!-- 替换底部的大间距 -->
    </div>

    <!-- 使用指南弹窗 -->
    <UserGuideDialog v-model:visible="userGuideVisible" />

    <!-- 意见反馈弹窗 -->
    <FeedbackDialog v-model:visible="feedbackVisible" />

    <!-- 会员特权弹窗 -->
    <MembershipDialog v-model:visible="membershipVisible" />

    <!-- 云空间弹窗 -->
    <CloudSpaceDialog v-model:visible="cloudSpaceVisible" />

    <!-- 数据恢复弹窗 -->
    <DataRecoveryDialog v-model:visible="dataRecoveryVisible" />

    <!-- 支付管理弹窗 -->
    <PaymentDialog v-model:visible="paymentVisible" />

    <!-- 账户安全弹窗 -->
    <SecurityDialog v-model:visible="securityVisible" />

    <!-- 个人资料弹窗 -->
    <ProfileDialog v-model:visible="profileVisible" />

    <!-- 系统公告弹窗 -->
    <AnnouncementDialog v-model:visible="announcementVisible" />

    <!-- 消息中心弹窗 -->
    <MessageCenterDialog v-model:visible="messageCenterVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import UserGuideDialog from '../components/UserGuideDialog.vue'
import FeedbackDialog from '../components/FeedbackDialog.vue'
import MembershipDialog from '../components/MembershipDialog.vue'
import CloudSpaceDialog from '../components/CloudSpaceDialog.vue'
import DataRecoveryDialog from '../components/DataRecoveryDialog.vue'
import PaymentDialog from '../components/PaymentDialog.vue'
import SecurityDialog from '../components/SecurityDialog.vue'
import ProfileDialog from '../components/ProfileDialog.vue'
import AnnouncementDialog from '../components/AnnouncementDialog.vue'
import MessageCenterDialog from '../components/MessageCenterDialog.vue'

const userStore = useUserStore()
const activeTab = ref('login')
const userGuideVisible = ref(false)
const feedbackVisible = ref(false)
const membershipVisible = ref(false)
const cloudSpaceVisible = ref(false)
const dataRecoveryVisible = ref(false)
const paymentVisible = ref(false)
const securityVisible = ref(false)
const profileVisible = ref(false)
const announcementVisible = ref(false)
const messageCenterVisible = ref(false)

// 登录表单
const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

// 注册表单
const registerForm = ref({
  username: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

// 登录方法
const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  
  const success = userStore.login(loginForm.value.username, loginForm.value.password)
  
  if (success) {
    ElMessage.success('登录成功')
  } else {
    ElMessage.error('登录失败，请检查用户名和密码')
  }
}

// 登出方法
const handleLogout = () => {
  userStore.logout()
  ElMessage.success('您已成功退出登录')
}
</script>

<style scoped>
/* 用户登录注册页面样式 */
.auth-container {
  padding: 10px; /* 减少内边距 */
  max-width: 375px;
  margin: 0 auto;
}

.auth-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* 减少下边距 */
}

.auth-logo-icon {
  width: 60px; /* 减小尺寸 */
  height: 60px; /* 减小尺寸 */
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border-radius: 20px; /* 减小圆角 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px; /* 减少下边距 */
  color: white;
  font-size: 30px; /* 减小字体大小 */
}

.auth-logo h2 {
  font-size: 24px; /* 减小字体大小 */
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* 减少下边距 */
}

.auth-tab {
  padding: 8px 16px; /* 减少内边距 */
  font-size: 15px; /* 减小字体大小 */
  cursor: pointer;
  color: var(--text-gray);
  position: relative;
  margin: 0 10px; /* 减少外边距 */
}

.auth-tab.active {
  color: var(--purple);
}

.auth-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--purple);
  animation: fadeIn 0.3s ease;
}

.auth-form {
  width: 100%;
  animation: fadeIn 0.5s ease;
}

.auth-form-group {
  margin-bottom: 16px; /* 减少下边距 */
}

.auth-input {
  width: 100%;
}

.auth-btn {
  width: 100%;
  padding: 10px; /* 减少内边距 */
  font-size: 15px; /* 减小字体大小 */
  margin-top: 8px; /* 减少上边距 */
  background: linear-gradient(135deg, var(--purple), var(--light-purple));
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.2);
}

.remember-me {
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--text-gray);
}

.auth-extra {
  margin-top: 20px;
  text-align: center;
  color: var(--text-gray);
  font-size: 14px;
}

.auth-link {
  color: var(--purple);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.auth-link:hover {
  text-decoration: underline;
}

.auth-divider {
  text-align: center;
  margin: 24px 0 16px; /* 减少上下边距 */
  position: relative;
  color: var(--text-gray);
  font-size: 13px; /* 减小字体大小 */
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--light-gray);
}

.auth-divider::before {
  margin-right: 16px;
}

.auth-divider::after {
  margin-left: 16px;
}

.auth-social {
  display: flex;
  justify-content: center;
  margin-bottom: 16px; /* 减少下边距 */
}

.social-btn {
  width: 40px; /* 减小尺寸 */
  height: 40px; /* 减小尺寸 */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px; /* 减小字体大小 */
  margin: 0 10px; /* 减少外边距 */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.social-btn.wechat {
  color: #07C160;
}

.social-btn.weibo {
  color: #E6162D;
}

.social-btn.qq {
  color: #1DA1F2;
}

/* 用户账户页面样式 */
.user-profile {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  padding: 16px; /* 减少内边距 */
  border-radius: 0 0 20px 20px;
  color: white;
  position: relative;
  margin-bottom: 16px; /* 减少下边距 */
}

.edit-profile {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px; /* 减小尺寸 */
  height: 32px; /* 减小尺寸 */
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.edit-profile:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 减少下边距 */
}

.avatar {
  width: 60px; /* 减小尺寸 */
  height: 60px; /* 减小尺寸 */
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  overflow: hidden;
  font-size: 30px; /* 减小字体大小 */
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px; /* 减小字体大小 */
  font-weight: 600;
  margin-bottom: 6px; /* 减少下边距 */
}

.user-level {
  font-size: 14px;
  opacity: 0.9;
  display: flex;
  align-items: center;
}

.level-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-right: 8px;
  font-size: 12px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}

.stat-value {
  font-size: 18px; /* 减小字体大小 */
  font-weight: 600;
  margin-bottom: 4px; /* 减少下边距 */
}

.stat-label {
  font-size: 12px; /* 减小字体大小 */
  opacity: 0.9;
}

.account-section {
  margin-bottom: 16px; /* 减少下边距 */
  background-color: white;
  border-radius: 12px; /* 减小圆角 */
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-heading {
  padding: 12px 16px; /* 减少内边距 */
  border-bottom: 1px solid var(--light-gray);
  font-weight: 600;
  font-size: 15px; /* 减小字体大小 */
  color: var(--dark-blue);
}

.section-heading i {
  margin-right: 8px;
  color: var(--purple);
}

.menu-list {
  padding: 0 16px; /* 减少内边距 */
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 0; /* 减少内边距 */
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: rgba(99, 102, 241, 0.05);
}

.menu-icon {
  width: 36px; /* 减小尺寸 */
  height: 36px; /* 减小尺寸 */
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  color: var(--purple);
}

.menu-text {
  flex: 1;
  font-size: 14px; /* 减小字体大小 */
  color: var(--dark-blue);
}

.menu-arrow {
  color: var(--text-gray);
}

.badge {
  background-color: #ef4444;
  color: white;
  font-size: 12px;
  padding: 2px 6px; /* 减少内边距 */
  border-radius: 10px;
  margin-right: 8px;
}

.badge.green {
  background-color: #10b981;
}

.badge.blue {
  background-color: #3b82f6;
}

.logout-btn {
  width: calc(100% - 32px);
  margin: 40px 16px 0;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
}

/* 移动端弹窗样式 */
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