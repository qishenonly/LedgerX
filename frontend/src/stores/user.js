import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: {
      name: '张小明',
      level: 8,
      levelName: '记账达人',
      avatar: null,
      stats: {
        days: 36,
        records: 142,
        budgetAchieved: 8
      }
    }
  }),

  actions: {
    login(username, password) {
      // 实际项目中这里应该调用API进行身份验证
      if (username && password) {
        this.isLoggedIn = true
        return true
      }
      return false
    },

    logout() {
      this.isLoggedIn = false
    }
  }
}) 