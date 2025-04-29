import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins'

// 使用插件，同时进行传参
Vue.use(plugins, '1', '2', 3)

new Vue({
    render: h => h(App)
}).$mount('#app')