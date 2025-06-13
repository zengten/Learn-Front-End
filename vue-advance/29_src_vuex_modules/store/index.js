/**
 * 该文件用于创建vuex中的最核心store
 */

// 引入vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex来集中管理状态，该操作必须在new store之前
Vue.use(Vuex)

import person from './person'
import count from './count'

// 创建并暴露store
export default new Vuex.Store({
    // 多个模块化的store
    modules: {countAbout: count, personAbout: person}
})



