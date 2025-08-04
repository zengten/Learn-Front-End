import Vue from 'vue'
import App from './App.vue'

// 将全部组件和css都引入，包会比较大
// import ElementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUi)

// 按需引入
import { Button, Input, Row, DatePicker } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(DatePicker);


new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')