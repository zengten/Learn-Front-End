/**
 * 该文件用于创建vuex中的最核心store
 */

// 引入vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex来集中管理状态，该操作必须在new store之前
Vue.use(Vuex)

// 创建store中的actions，用于响应组件中的动作
const actions = {
    increment(context, value) {
        console.log('actions increment', context, value)
        context.commit('INCREMENT', value)
    },
    decrement(context, value) {
        console.log('actions decrement')
        context.commit('DECREMENT', value)
    },
    incrementOdd(context, value) {
        console.log('actions incrementOdd')
        if ((context.state.sum & 1) === 1) {
            context.dispatch('increment', value)
        }
    },
    incrementWait(context, value) {
        console.log('actions incrementWait')
        setTimeout(() => {
            context.dispatch('increment', value)
        }, 500)
    }
}

// 创建store中的mutations，用于修改state中的数据（状态）
const mutations = {
    INCREMENT(state, value) {
        console.log('mutations increment exec')
        state.sum += value
    },
    DECREMENT(state, value) {
        console.log('mutations decrement exec')
        state.sum -= value
    },
    ADD_PERSON(state, value) {
        state.personList.unshift(value)
    }
}

// 用于存储vuex中的数据，集中式管理
// 类似组件中的computed的计算属性，只不过他是共享的
const state = {
    sum: 0,
    school: '清华大学',
    subject: '数据结构',
    personList: [
        {id: '001', name: '张三'}
    ]
}

// 准备一个getters，用于加工state中的数据，加工后的数据用于组件数据共享
const getters = {
    // 和放大10倍
    bigSum(state) {
        return state.sum * 10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})



