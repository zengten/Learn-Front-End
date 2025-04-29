import Vue from 'vue'
import App from './App.vue'

// 全局混入
// Vue.mixin(mixinMethod);
// Vue.mixin(commonData);

new Vue({
    render: h => h(App)
}).$mount('#app')