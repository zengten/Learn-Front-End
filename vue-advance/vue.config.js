module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 这个配置怎么不生效
            template: 'public/root.html'
        }
    },
    // 语法检查配置，比如声明了一个没有使用的变量就会报错
    lintOnSave: false
}