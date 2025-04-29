# vue-advance

## Vue脚手架
### 安装
由于最新版vue-cli已经到了5.x，有功能差异，目前选择安装4.x
```shell
# npm全局安装
npm install -g @vue/cli@4.5
# 使用命令验证是否安装成功
vue -V
```
### 使用
使用命令`vue create my_project`创建脚手架项目，然后选择vue2版本即可

### 运行
打开项目使用`npm run serve`运行脚手架helloWorld项目

### 项目结构
```
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

## 不同版本vue

vue.js与vue.runtime.xxx.js的区别：

- vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
- vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
- 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

使用vue inspect > output.js可以查看到Vue脚手架的默认配置。

使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性

- 被用来给元素或子组件注册引用信息（id的替代者）

- 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）

- 使用方式：

  - 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`

  - 获取：`this.$refs.xxx`

## props配置项

- 功能：让组件接收外部传过来的数据

- 传递数据：`<Demo name="xxx"/>`

- 接收数据：

  - 第一种方式（只接收）：`props:['name'] `

  - 第二种方式（限制类型）：`props:{name:String}`

  - 第三种方式（限制类型、限制必要性、指定默认值）：

```javascript
props:{
	name:{
        type:String, //类型
        required:true, //必要性
        default:'老王' //默认值
	}
}
```
> 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin(混入)

- 功能：可以把多个组件共用的配置提取成一个混入对象
- 使用方式：
  - 定义混合：
   ```
   {
       data(){....},
       methods:{....}
       ....
   }
   ```
  - 使用混入：
   ​	全局混入：`Vue.mixin(xxx)`
   ​	局部混入：`mixins:['xxx']	`
- 注意点
  - 如果混合中配置了与data(或者配置了相同的methods)相同的属性值，则以你的配置的属性为主(而不以mixin为主)
  - 如果mixin和组件中都写了钩子函数，如mounted，则都会执行，mixin的mounted先执行

## 插件

- 功能：用于增强Vue
- 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
- 定义插件：
   ```js
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
       // 2. 添加全局指令
       Vue.directive(....)
       // 3. 配置全局混入(合)
       Vue.mixin(....)
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```
- 使用插件：```Vue.use()```
