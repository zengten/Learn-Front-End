module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        // 注意将官网的给的配置修改下，同时需要安装包 npm i babel-preset-es2015
        ["@babel/preset-env", {"modules": false}],
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}

