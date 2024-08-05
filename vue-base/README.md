# Vue
## 安装Vue
```javascript
// 第一种方案，使用npm安装，然后本地导入
npm install vue
// 第二种方案，直接使用cdn链接导入
<!-- 导入 Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
```
同时Vue也分为开发版和生产环境版本，如果使用开发版本浏览器的控制台会输出警告信息
```
// 由于浏览器插件Vue Devtools extension没有生效而出现警告
Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools
// 由于使用了开发版本的Vue依赖
vue.js:9353 You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
See more tips at https://vuejs.org/guide/deployment.html
```
警告解决方案：

```javascript
// 第一个警告正常使用Vue，并安装浏览器插件即可解决
// 第二个警告 设置不打印Tip信息
Vue.config.productionTip = false;
```
另外，开发场景建议使用开发版本，获得更多的错误提示信息
## hello Vue

**vue声明式渲染**

-   想要让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
-   app容器内的代码依然符合html规范，只不过混入了一些特殊Vue的语法
-   app容器里面的代码被成为【Vue模板】
-   真实的开发过程中**只有一个**Vue实例，并且会配合着组件一起使用
-   插值表达式{{xxx}}中的xxx，要写js表达式，缺xxx可以自动获取到data中的所有属性
-   一旦data中的数据发生改变，那么模板中用到该数据的地方也会自动更新
   
注意区分js表达式和js代码语句：
-   js表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方，如a, a+b, func(), 三元表达式
-   js代码语句：如if，for之类的

可以在浏览器控制台修改vue实例对象的数据，如`vm.name = "lisi"`，此时插值表达式的数据也会变更

```javascript
    <div id="app">
        // {{}}是vue的插值表达式
        <h1>hello,{{name}}</h1>
    </div>
    <script>
        // 设置默认不提示
        Vue.config.productionTip = false; 
        let vm = new Vue({
            // 也可以使用document.getElementById('app') 
            'el':"#app", //element el指定当前vue实例为哪一个容器服务，值通常为css选择器格式
            'data':{
                'name':'张三'
            }
        })
    </script>
```

### 安装vue插件

- 首先打开浏览器的**开发者模式**选项
- 在扩展程序里搜索vue devtools
- 注意安装官方的版本

```javascript
// 使用方式（此处演示vue2版本）
// 方式一: 直接导入脚本，开发环境/生产环境选其一
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
// 方式二：使用npm install vue之后在本地引入
npm install -g vue@2.6.14
// 引入
<script src="./node_modules/vue/dist/vue.js"></script>
// 就可以使用vue.js了
```
## 模板语法

-   插值语法用于解析标签体的内容，写法{{}}，是js表达式，可以直接读取data中的所有属性
-   指令语法:用于解析标签(标签体,标签属性, 绑定事件...)上，举例：`v-bind:href="xxx"`

```
    <div id="app">
        <h1>插值语法</h1>
        <h3>你好，{{name}}</h3>
        <h1>指令语法</h1>
        <a v-bind:href="url">点我百度一下</a>
        <h1>指令语法简写</h1>
        <a :href="url" :x="x.toUpperCase()">简写点我百度一下</a>
        <h3>学校：{{school.name}}</h3>
    </div>
    <script>
        new Vue({
            'el':'#app',
            'data':{
                'name':'jack',
                'url':'https://www.baidu.com',
                'x':'test v-bind',
                'school':{
                    'name':'测试学校'
                }
            }
        })
    </script>
```
## 指令

### v-model

v-model一般用于**表单项**或者自定义组件，页面变化=>数据变化，数据变化=>页面变化
```javascript
<div id="app">
    <!-- v-model指令与vue对象数据 双向绑定 -->
    <input type="text" v-model="num"></input>
    <!-- v-on click点击事件，修改num值，也可以触发方法 -->
    <button v-on:click="num++">点赞</button>
    <button v-on:click="reduce()">取消点赞</button>
    <h2>{{name}}非常帅，有{{num}}个人为他点赞</h2>
</div>
<script>
    let vm = new Vue({
        el: '#app',// 用来绑定div元素
        data: {
            name: 'zhangsan',
            num: 0
        },// 数据集合
        methods: {
            reduce() {
                this.num--;
            }
        }// 方法
    })
</script>
```
注意：
-   单向绑定(v-bind)：数据只能从data流向页面。
-   双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
    -   双向绑定一般都应用在表单类元素上（如：input、select等）
    -   v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。

### v-html&v-text

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <!-- 默认对标签进行转义，浏览器显示 <h2>hello</h2> -->
        {{msg}} <br />
        <!-- 插值表达式也可以进行计算或者调用方法，但是不能声明变量，如let a = 1 -->
        {{1 + 1}} {{getNum()}}<br />
        <!-- 使用 v-html 将显示 h2 标签大小的 hello-->
        <span v-html="msg"></span> <br />
        <!-- v-text 会将html标签转义，显示结果跟第一种插值表达式一样 -->
        <span v-text="msg"></span>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',// 用来绑定div元素
            data: {
                msg: '<h2>hello</h2>',
                num: 0
            },// 数据集合
            methods: {
                reduce() {
                    this.num--;
                },
                getNum() {
                    return this.num;
                }
            }// 方法
        })
    </script>
```

### v-bind

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <!-- 使用v-bind 对html标签的属性进行绑定，区别v-html/text只能绑定标签，不能绑定标签属性 -->
        <!-- 同时也能在浏览器控制台修改 vm.link 属性值 -->
        <a v-bind:href="link">gogogo</a>
        <!-- 普通语法 -->
        <span style="color: red;font-size: 60px;">hello1</span>
        <!-- vue单向绑定更改标签属性，但是使用浏览器检查元素修改代码 不会造成vue对象数据变动 -->
        <span v-bind:style={color:curColor,fontSize:curSize}>hello2</span>
        <!-- v-bind可以简写 : -->
        <span :style={color:curColor,fontSize:curSize}>hello3</span>
    </div>
    <br />

    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                link: 'https://www.baidu.com',
                curColor: 'blue',
                curSize: '50px'
            },
            methods: {

            }
        })
    </script>
```

### v-on

v-on事件修饰符来管理事件的行为

- `.stop`：阻止事件冒泡到父元素
- `.prevent`：阻止默认事件发生
- `.capture`：使用事件捕获模式
- `.self`：只有元素自身触发事件才执行（冒泡或捕获都不执行）
- `.once`：只执行一次

按键修饰符：`enter,tab,delete,esc,space,up,down,left,right`

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <!-- 事件修饰符 click.once 只执行一次-->
        <div style="border: 1px solid red;padding: 20px;" v-on:click.once="hello">
            大div
            <!-- v-on 可以简写为@ -->
            <!-- click.stop 其中stop是事件修饰符， 阻止单击事件继续传播到大div -->
            <div style="border: 1px solid blue;padding: 20px;" @click.stop="hello">
                小div <br />
                <!-- click.prevent 阻止跳转到百度，但是不能阻止事件冒泡到大div-->
                <a href="http://www.baidu.com" @click.prevent.stop="hello">去百度</a>
            </div>
        </div>
        <div>
            <!-- 输入框内 修改num事件  向上箭头则 num++  向下箭头则 num-- shift+鼠标点击则 num = 10-->
            <input type="text" v-model="num" v-on:keyup.up="num++" @keyup.down="num--" @click.shift="num=10"></input>
        </div>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                num: 0
            },
            methods: {
                hello() {
                    alert("点击了")
                }
            },
        })
    </script>
```

### v-for

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <ul>
            <!-- v-for 遍历数组元素  遍历时写上唯一属性:key 可以提高vue渲染效率，如id-->
            <!-- v-if 过滤部分元素 -->
            <li v-for="(user,index) in users" :key="user.name" v-if="user.age >= 21">
                序号 {{index}} => {{user.name}} => {{user.gender}} => {{user.age}}
                <br />
                <!-- 继续遍历 所有对象信息 柳岩 => 女 => 21 => -->
                <span v-for="(value) in user">{{value}} => </span> <br />
                <!-- 对象信息 key,value 形式  name : 柳岩 ,gender : 女 ,age : 21 , -->
                <span v-for="(value, key) in user">{{key}} : {{value}} ,</span> <br />
                <!-- 包含属性索引 -->
                <!-- name : 柳岩 : 属性index : 0,gender : 女 : 属性index : 1,age : 21 : 属性index : 2, -->
                <span v-for="(value, key, index) in user">{{key}} : {{value}} : 属性index : {{index}},</span>
            </li>
        </ul>

        <ul>
            <!-- 数值数组nums，可能有元素重复，可以采用index作为key提升渲染效率 -->
            <li v-for="(num, index) in nums" :key="index">
                {{num}} =>
            </li>
        </ul>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                users: [
                    { name: '柳岩', gender: '女', age: 21 },
                    { name: '范冰冰', gender: '女', age: 24 },
                    { name: '刘亦菲', gender: '女', age: 18 },
                    { name: '古力娜扎', gender: '女', age: 25 }
                ],
                nums: [1, 2, 3, 4, 4]
            },
        })
    </script>
```

### v-if&v-show

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <!-- v-if 不符合的标签直接不显示（包括代码）-->
        <button @click="random()">点我鸭</button>
        <span>{{num}}</span>
        <h1 v-if="num >= 0.75">看到我啦，&gt; = 0.75</h1>
        <h1 v-else-if="num >= 0.5">看到我啦，&gt; = 0.5</h1>
        <h1 v-else-if="num >= 0.2">看到我啦，&gt; = 0.2</h1>
        <h1 v-else>看到我啦，&gt; = 0.1</h1>

        <!-- v-if和v-show区别：flag=false时，v-if代码直接消失，而v-show代码依旧存在，只是不展示，如下 -->
        <!-- <h1 style="display: none;">show看到我</h1> -->
        <button @click="flag=false">点咯</button>
        <h1 v-if="flag">if看到我</h1>
        <h1 v-show="flag">show看到我</h1>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                num: 0,
                flag: true
            },
            methods: {
                random() {
                    this.num = Math.random()
                }
            },
        })
    </script>
```

## 计算属性&监听器

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <ul>
            <li>
                iPhone 14, 价格{{price1}}, 数量<input type="number" v-model="num1">
            </li>
            <li>
                小米 13, 价格{{price2}}, 数量<input type="number" v-model="num2">
            </li>
            <li>
                总价格：{{calculatePrice2}}
            </li>
            {{message}}
        </ul>
    </div>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                num1: 1,
                num2: 1,
                price1: 6000,
                price2: 1000,
                message: ""
            },
            methods: {
                // 使用这个方法会显示 function () { [native code] }  为啥！
                calculatePrice1() {
                    return this.num1 * this.price1 + this.num2 * this.price2;
                }
            },
            // 和methods有啥区别？
            computed: {
                // 计算总价格
                calculatePrice2() {
                    return this.num1 * this.price1 + this.num2 * this.price2;
                }
            },
            // 监听器
            watch: {
                // num1值变化时都会调用此方法
                // 问题：改成箭头函数不生效
                num1: function (newValue, oldValue) {
                    // alert(oldValue + "=>" + newValue)
                    console.log(oldValue + "=>" + newValue)
                    // 增加提示消息
                    if (newValue >= 3) {
                        this.message = "iphone 14库存上限!"
                        this.num1 = 3
                    } else {
                        this.message = ""
                    }
                }
            }
        })
    </script>
```

## filter

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <ul>
            <li v-for="(user, index) in users" :key="index">
                <!-- 使用 localGenderFilter 和 globalGenderFilter-->
                {{user.name}} => {{user.gender == 1 ? '男' : '女'}} => {{user.gender | localGenderFilter}} =>
                {{user.gender | globalGenderFilter2}}
            </li>
        </ul>
    </div>
    <script>
        // 全局filter, let的名称不知道有啥用？
        let filter1 = Vue.filter(
            "globalGenderFilter", function (value) {
                return value == 1 ? '男' : '女';
            }
        )
        // 函数式
        let filter2 = Vue.filter(
            "globalGenderFilter2", value => {
                return value == 1 ? '男' : '女';
            }
        )
        let vm = new Vue({
            el: "#app",
            data: {
                users: [
                    { id: 1, name: 'jacky', gender: 1 },
                    { id: 2, name: 'peter', gender: 0 }
                ]
            },
            // 与其他属性，如methods有啥区别
            filters: {
                // 本地filter，只能作用与app元素
                localGenderFilter(value) {
                    return value == 1 ? '男' : '女'
                }
            }
        })
    </script>
```

## 组件化

```javascript
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        <button @click="count++">点击了{{count}}次</button>
        <!-- 使用全局组件，注意标签里面的驼峰命令转化为横杠 -->
        <global-counter></global-counter>
        <!-- 下面的标签会直接报错 -->
        <!-- <globalCounter></globalCounter> -->
        <!-- 使用局部组件 -->
        <my-counter></my-counter>
    </div>
    <script>
        // 注册一个全局组件
        Vue.component("globalCounter", {
            template: `<button v-on:click="count++">点击了{{count}}次</button>`,
            // 注意组件是data方法，并且返回一个对象{}
            data() {
                return {
                    count: 1
                }
            }
        });

        // 定义一个局部组件
        const localCounter = {
            template: `<button @click="count++">点击了{{count}}次</button>`,
            data() {
                return {
                    count: 1
                }
            }
        }

        let vm = new Vue({
            // 注意局部组件要绑定元素使用
            el: '#app',
            data: {
                // 第一个标签数据
                count: 1
            },
            components: {
                // k : v 形式
                'myCounter': localCounter
            }
        })
    </script>
```

## 路由

```javascript
<!-- 跳转到hello页面 -->
<router-link to="hello">去hello</router-link>
```



## 生命周期

// 待补

## 构建vue demo

### 安装webpack

```shell
// 全局安装指定版本，不容易出问题
npm install webpack@4.41.2 -g
```

### 安装vue-cli

```shell
// 全局安装指定版本
// vue-cli已经停止维护，后续可用vite
npm install --global vue-cli
// 卸载命令
npm uninstall -g vue/cli
```

### 初始化项目

```shell
# 使用命令初始化vue-demo项目
vue init webpack vue-demo
# 启动项目
npm run dev
```

## Element-UI

### 安装

```shell
npm i element-ui
```

### 导入

```javascript
// 导入element-ui和css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 使用
Vue.use(ElementUI);
```

