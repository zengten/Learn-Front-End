import mixin from "./mixin.js";


// plugin使用
export default {
    install(Vue, a, b, c) {
        console.log(`plugins:${Vue},${a},${b},${c}`)

        // 全局混入
        Vue.mixin(mixin)

        // 全局自定义指令
        Vue.directive('bind-plus', {
            bind(element, binding) {
                element.value = binding.value
            },
            inserted(element, binding) {
                element.focus()
            },
            update(element, binding) {
                element.value = binding.value
                element.focus()
            }
        })

        // 全局过滤器
        Vue.filter('testFilter', function(val) {
            return val + "testFilter"
        })

        // vm上添加全局方法
        Vue.prototype.hello = function () {
            alert("hello")
        }
    }
}