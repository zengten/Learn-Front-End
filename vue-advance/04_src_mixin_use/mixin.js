// mixin可以抽离出组件公共的方法和属性
export const mixinMethod = {
    methods: {
        showName() {
            alert(this.name)
        }
    },
    mounted() {
        console.log('mixin mounted...')
    }
}

export const commonData = {
    data() {
        return {
            x: 10,
            y: 20
        }
    },
}