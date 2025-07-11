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

## Vue封装的过度与动画

- 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

- 图示：[过渡和动画图示](https://github.com/zengten/Learn-Front-End/blob/main/img/过渡和动画图示.png)

- 写法：
  - 准备好样式：
    - 元素进入的样式：
         1. v-enter：进入的起点
         2. v-enter-active：进入过程中
         3. v-enter-to：进入的终点
    - 元素离开的样式：
         1. v-leave：离开的起点
         2. v-leave-active：离开过程中
         3. v-leave-to：离开的终点

  - 使用```<transition>```包裹要过度的元素，并配置name属性,注意如果配置了appear属性的话就代表一开始挂载真实dom的时候就开启动画的效果：

      ```vue
      <transition name="hello" appear>
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```
- 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

- 引入第三方动画举例：
  - 安装包：`npm install animate.css`
  - 配置`name="animate__animated animate__bounce"`
  - 配置进入和离开动画效果，`enter-active-class和leave-active-class`属性

## vue脚手架配置代理

浏览器原生请求类型：XHR（new XMLHttpRequest），fetch

XHR封装的库/包：

- jquery：原生dom操作多，不考虑用于vue
- axios：体积小，推荐使用
- vue-resource：已经不维护了

fetch请求：浏览器兼容性不如xhr，所以VUE推荐选择XHR的封装axios

### 方法一

在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

- 优点：配置简单，请求资源时直接发给前端（8080）即可。
- 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
- 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      // 第二种配置代理方式，可以配置多个代理
    proxy: {
      // 以/api作为前缀的请求资源进行代理
      '/api1': {
          // 代理到哪个地址
          target: 'http://localhost:5000',
          // 请求路径重写
          pathRewrite: {
              // 匹配以/api开头的uri，然后把/api替换为空字符串
              '^/api1': ''
          },
          // 给请求中添加额外的请求头，可以自定义
          headers: {
              Referer: 'https://www.baidu.com/'
          },
          // 用于支持websocket代理，默认开启
          ws: true,
          // 是否改变请求头中的host属性，如果设置为false，host就为本地地址，如果设置为true，host就为target中的地址
          changeOrigin: true
      },
      '/api2': {
          target: 'http://localhost:5001',
          pathRewrite: {
              '^/api2': ''
          },
          ws: true,
          changeOrigin: true
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```
说明：
- 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
- 缺点：配置略微繁琐，请求资源时必须加前缀。

## vue-resource插件
vue-resource是vue官方之前的一个http请求插件
```javascript
// 安装 npm i vue-resource
// 引入
import vueResource from 'vue-resource'
// 使用vue-resource插件
Vue.use(vueResource)
// 这时所有vueComponent实例上都有一个 $http 对象，在组件实例中可以使用下面代码发起请求
this.$http.get()
this.$http.post()
```

## 插槽

- 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

- 分类：默认插槽、具名插槽、作用域插槽

- 使用方式：
  - 默认插槽：
    - 父组件中：
      ```html
      <Category>
          <div>html结构1</div>
      </Category>
      ```
    - 子组件中：
      ```html
      <template>
          <div>
              <!-- 定义插槽 -->
              <slot>插槽默认内容...</slot>
          </div>
      </template>
      ```

  - 具名插槽：
    - 父组件中：
      ```html
      <Category>
          <template slot="center">
            <div>html结构1</div>
          </template>
          <template v-slot:footer>
              <div>html结构2</div>
          </template>
      </Category>
      ```
    - 子组件中：
      ```html
      <template>
          <div>
              <!-- 定义插槽 -->
              <slot name="center">插槽默认内容...</slot>
              <slot name="footer">插槽默认内容...</slot>
          </div>
      </template>
      ```

  - 作用域插槽：

    - 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

    - 具体编码：
      - 父组件中：
        ```html
        <Category>
          <template scope="scopeData">
            <!-- 生成的是ul列表 -->
            <ul>
              <li v-for="g in scopeData.games" :key="g">{{g}}</li>
            </ul>
          </template>
        </Category>
      
        <Category>
          <template slot-scope="scopeData">
            <!-- 生成的是h4标题 -->
            <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
          </template>
        </Category>
        <!-- 下面是新版写法v-slot，slot-scope写法已经过时 -->
        <Category>
          <template v-slot="scopeData">
            <!-- 生成的是h4标题 -->
            <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
          </template>
        </Category>
        ```
      - 子组件中：
        ```html
        <template>
            <div>
                <slot :games="games"></slot>
            </div>
        </template>
        <script>
            export default {
                name:'Category',
                props:['title'],
                //数据在子组件自身
                data() {
                    return {
                        games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                    }
                },
            }
        </script>
         ```

## Vuex

### 概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 何时使用？

​		多个组件需要共享数据时

### 安装vuex

如果是vue2脚手架，安装要带上版本号：`npm i vuex@3`
目前vue3脚手架是vuex@4版本

### 搭建vuex环境

- 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

- 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

### 基本使用

- 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

- 组件中读取vuex中的数据：```$store.state.sum```

- 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```


### getters的使用

- 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

- 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
       bigSum(state){
           return state.sum * 10
       }
   }
   
   //创建并暴露store
   export default new Vuex.Store({
       ......
       getters
   })
   ```

- 组件中读取数据：```$store.getters.bigSum```

### 四个map方法的使用

mapState返回的是一个对象obj，加上...表示将对象展开
- <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

- <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

- <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。


### 模块化+命名空间

- 目的：让代码更好维护，让多种数据分类更加明确。

- 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

- 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

- 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

- 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

- 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

## 路由

- 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
- 前端路由：key是路径，value是组件。

### 基本使用

- 安装vue-router，命令：```npm i vue-router```，注意vue2版本是`npm i vue-router@3`

- 应用插件：```Vue.use(VueRouter)```

- 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

- 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

- 指定展示位置

   ```vue
   <router-view></router-view>
   ```
### 几个注意点

- 路由组件通常存放在pages或者views文件夹，一般组件通常存放在components文件夹。
- 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
- 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
- 整个应用只有一个router，可以通过组件的```$router```属性获取到。

### 多级路由

- 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

- 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 路由的query参数

- 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
              title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

- 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```   

### 命名路由

- 作用：可以简化路由的跳转。

- 如何使用

  - 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                          name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

  - 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		    id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 路由的params参数

- 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

- 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

- 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 路由的props配置

​作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```