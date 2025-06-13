import axios from "axios";

export default {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            console.log(value)
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('添加的姓名不是姓王的')
            }
        },
        addPersonServer(context) {
            axios.get('https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=5HTVZTVrKc7WNwrDxm9Pr%2BK73L9bsOS2')
                .then(response => {
                        console.log(response)
                        context.commit('ADD_PERSON', {id: response.data.data.id, name: response.data.data.content})
                    }, error => {
                        console.log(error.message)
                    }
                )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            {id: '001', name: '张三'}
        ]
    },
    getters: {
        firstName(state) {
            return state.personList[0].name
        }
    }
}