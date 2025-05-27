import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'

// 使用vue-resource插件
Vue.use(vueResource)

new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')