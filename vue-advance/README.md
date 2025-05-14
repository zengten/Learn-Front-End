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

## 样式scoped

作用：让样式在局部生效，防止冲突。
写法：`<style scoped>`
注意点：
- 在组件style标签中不写scoped，则这个样式是全局的，所有组件都能使用
- 在组件style标签中不写scoped，同时在多个组件中样式命名相同时，会发生样式不生效问题，哪个组件**后引入**，则以哪个样式为准

> 使用less的style样式，需要引入依赖less和less-loader@7版本

## 总结TodoList案例
- 组件化编码流程:

  - 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

  - 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
    - 一个组件在用：放在组件自身即可。
    - 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

  - 实现交互：从绑定事件开始。

- props适用于：

  - 父组件 ==> 子组件 通信
  - 子组件 ==> 父组件 通信（要求父先给子一个函数）

  > 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
  > props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## localStorage&sessionStorage

localStorage 和 sessionStorage 都是 HTML5 新增的会话存储对象，用于临时保存同一窗口（或标签页）的数据.

相同点:
- 存储大小：通常都可以存储大约 5MB 的数据，具体大小可能因浏览器而异。
- 存储类型：仅能存储字符串类型的数据。若要存储对象或数组，需先使用 JSON.stringify() 进行转换；读取时再使用 JSON.parse() 还原。
- 作用域：数据仅在当前域名下有效，不同域名之间无法共享数据。

不同点:
- 数据有效期：
localStorage：数据会长期存储，除非手动删除，否则不会过期。
sessionStorage：数据仅在当前会话期间有效，关闭窗口或标签页后数据会被清除。
- 页面刷新影响：
localStorage：页面刷新不会影响其中的数据。
sessionStorage：页面刷新时数据依然存在，但如果是新开窗口或标签页访问相同页面，sessionStorage 中的数据不会被保留。

常用方法

- setItem(key, value)：向存储中添加数据项，key 是键名，value 是对应的值。
- getItem(key)：根据键名获取存储中的数据项，如果键名不存在则返回 null。
- removeItem(key)：根据键名移除存储中的数据项。
- clear()：清空存储中的所有数据项。

## 组件的自定义事件

- 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

- 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

- 绑定自定义事件：

  - 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

  - 第二种方式，在父组件中：

    ```javascript
    <Demo ref="demo"/>
    mounted(){
       this.$refs.xxx.$on('atguigu',this.test)
    }
    ```

  - 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

- 触发自定义事件：```this.$emit('atguigu',数据)```

- 解绑自定义事件```this.$off('atguigu')```

- 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

- 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！

## 全局事件总线（GlobalEventBus）

一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

- 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

- 使用事件总线：

  - 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

  - 提供数据：```this.$bus.$emit('xxxx',数据)```

- 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

## 消息订阅与发布（pubsub）

- 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

- 使用步骤：

  - 安装pubsub：```npm i pubsub-js```

  - 引入: ```import pubsub from 'pubsub-js'```

  - 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

  - 提供数据：```pubsub.publish('xxx',数据)```

  - 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>

## nextTick

- 语法：```this.$nextTick(回调函数)```
- 作用：在下一次 DOM 更新结束后执行其指定的回调。
- 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。