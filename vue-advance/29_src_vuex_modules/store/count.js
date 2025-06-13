export default {
    // 注意这个namespaced是有个d的，不是namespace
    namespaced: true,
    actions: {
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
    },
    mutations: {
        INCREMENT(state, value) {
            console.log('mutations increment exec')
            state.sum += value
        },
        DECREMENT(state, value) {
            console.log('mutations decrement exec')
            state.sum -= value
        },

    },
    state: {
        sum: 0,
        school: '清华大学',
        subject: '数据结构',
    },
    getters: {
        // 和放大10倍
        bigSum(state) {
            return state.sum * 10
        }
    }
}