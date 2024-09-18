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
- `.self`：只有event.target是当前操作的元素时才触发事件（冒泡或捕获都不执行）
- `.once`：事件只触发一次
- `.passive`：事件的默认行为立即执行，无需等待事件回调执行完毕

```html
    <div id="app">
        <h2>欢迎，{{name}}</h2>
        <div class="demo1" @click="aTagShowInfo">
            <!-- 使用@click.prevent阻止默认事件，a标签无法跳转 -->
            <a href="https://www.baidu.com" @click.prevent="aTagShowInfo">a标签->跳转到百度</a>
        </div>
        <div class="demo1" @click="showInfo">
            大div
            <!-- 使用@click.stop阻止事件的冒泡到大div，不会调用两次showInfo -->
            <button @click.stop="showInfo">大div中的小按钮</button>
        </div>
        <button @click.once="showInfo">点我提示信息,只在第一次点击生效</button>
        <!-- 事件默认是以冒泡的方式执行的，打印2->1，使用@click.capture就会让事件以捕获的方式执行，打印1->2 -->
        <div class="box1" @click.capture="showMsg(1)">
            大div
            <div class="box2" @click="showMsg(2)">小div</div>
        </div>
        <!-- 使用@click.self也可阻止事件的冒泡行为，因为只有event.target是当前操作的元素时才触发事件 -->
        <div class="box1" @click.self="showEventTarget">
            大div
            <div class="box2" @click="showEventTarget">小div</div>
        </div>
        <!-- wheel：鼠标滚轮的滚动事件，scroll：滚动条的滚动事件 -->
        <!-- 使用passive事件的默认行为立即执行，无需等待事件回调showData方法执行完毕； -->
        <ul class="list" @wheel.passive="showData">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data() {
                return {
                    name: 'Jack'
                }
            },
            methods: {
                aTagShowInfo(e) {
                    // 阻止事件的默认行为，可以让a标签无法跳转，另外可以使用vue的写法@click.prevent
                    // e.preventDefault()
                    alert('开始学习...')
                },
                showInfo(e) {
                    alert('提示信息')
                },
                showMsg(msg) {
                    console.log(msg);
                },
                showEventTarget(e) {
                    console.log(e.target);
                },
                showData() {
                    for (let i = 0; i < 10000; i++) {
                        console.log(i)
                    }
                    console.log('累坏了');
                }
            }
        })
    </script>
```

**补充**：
-   keyup和keydown区别：keyup是按下按键，按键抬起时触发事件，而keydown是按下就触发事件
-   Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
-   按键修饰符：`enter,tab,delete,esc,space,up,down,left,right`
-   系统修饰键（用法特殊）：ctrl、alt、shift、meta
    -   配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
    -   配合keydown使用：正常触发事件。


### v-for

```javascript
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
## 补充点
### el和data的写法

-   el的两种写法：
    -   new Vue时配置el属性
    -   先创建Vue实例，然后再通过`vm.$mount('#app')`指定el的值
```javascript
new Vue({
    // 第一种写法
    'el':'#app',
    'data':{
        'name':'Jack'
    }
})
// 第二种写法
vm.$mount('#app')
```
-   data的两种写法：目前选择哪种写法都可以，学习组件式则需要使用函数式
    -   对象式，在new Vue时直接配置
    -   函数式
```javascript
// 第一种写法：普通函数返回对象
'data': function () {
    // 此时this是Vue实例
    console.log('当前this:', this);
    return {
        'name': 'Jack'
    }
}

// 第二种写法：箭头函数返回对象   
'data': () => {
    // 此时this是window对象
    console.log('当前this:', this);
    return {
        'name': 'Jack'
    }
}
// 第三种写法：改成data函数
data() {
    // 此时this是Vue实例
    console.log('当前this:', this);
    return {
        'name': 'Jack'
    }
}
```
-   重要原则：由Vue管理的函数，一定不要写箭头函数，写了箭头函数后this就会不再是Vue实例了

### MVVM模型
MVVM模型
-   M：模型(Model) ：data中的数据
-   V：视图(View) ：模板代码
-   VM：视图模型(ViewModel)：Vue实例

观察发现：
-   data中所有的属性，最后都出现在了vm身上。
-   vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

```
<div id="app">
    <!-- vue实例上的属性都能通过差值表达式取到，包括原型对象上面的（prototype） -->
    <h2>hello, {{name}}</h2>
    <h2>测试一下1, {{_c}}</h2>
    <h2>测试一下2, {{_render}}</h2>
</div>
<script>
    const vm = new Vue({
        'data': {
            'name': 'jack'
        }
    })
    vm.$mount('#app')
    console.log(vm);
</script>
```
### Object.defineProperty

学习Object.defineProperty Api
```javascript
let person = {
    name: '张三',
    sex: '男'
}
// 添加age字段，默认不可枚举，修改和删除
Object.defineProperty(person, 'age', {
    // 直接给age赋值
    value: 20
})
// 数据遍历中，age没有出现
Object.entries(person).forEach(([key, value]) => {
    console.log(`key = ${key}, value = ${value}`)
})
```
```javascript
// 修改这个api的配置
Object.defineProperty(person, 'age', {
    value: 20,
    enumerable: true, // 此时代表这个属性是可以枚举的
    writable: true, // 代表可以重写该属性(控制属性是否被修改)
    configurable: true, //控制属性是否可以被删除 默认为false
})
```
需求：实现一个变量的修改，同时修改对象内的某个字段？
```javascript
// 使用Object.defineProperty将currentAge和person的age进行绑定
let currentAge = 25
let person = {
    name: '张三',
    sex: '男'
}
// 数据代理，当读取age的值时会调用get方法，当修改age时会调用set方法
Object.defineProperty(person, 'age', {
    get: function() {
        console.log('get invoke...');
        return currentAge
    },
    set(value) {
        console.log('set invoke...');
        currentAge = value
    }
})
```
需求：实现一个数据代理，通过一个对象代理另一个对象中属性的操作
```javascript
let obj1 = {
    'x': 10
}
let obj2 = {
    'y': 20
}
// 修改obj1的x属性会影响obj2，反向也是
Object.defineProperty(obj2, 'x', {
    get() {
        return obj1.x
    },
    set(value) {
        obj1.x = value
    }
})
```
验证Vue对象中的_data和自定义的data是否相同对象数据，data===vm_data
```javascript
// 修改data对象，会同时影响vm._data
let data
let vm = new Vue({
    'el': '#app',
    data() {
        return data = {
            'name': 'zhangsan',
            'age':12
        }
    }
})
console.log(vm)
```

## 计算属性
计算属性：
-   定义：要用的属性不存在，要通过已有属性计算得来。
-   原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
-   get函数什么时候执行？
    -   初次读取时会执行一次。
    -   当依赖的数据发生改变时会被再次调用。
-   优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
-   补充：
    -   计算属性最终会出现在vm上（而不是出现在`vm._data`上），直接读取使用即可。
    -   如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
```javascript
    <div id="app">
        姓：<input type="text" v-model="firstName"><br><br>
        名：<input type="text" v-model="lastName"><br><br>
        全名：<span>{{fullName}}</span><br><br>
        <!-- 多次使用fullName，只执行一次计算属性的get方法，之后有缓存 -->
        全名：<span>{{fullName}}</span><br><br>
        全名：<span>{{fullName}}</span><br><br>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                firstName: '张',
                lastName: '三'
            },
            computed: {
                // 完整写法
                // fullName: {
                //     get() {
                //         console.log('fullName get被调用...');
                //         return this.firstName + '-' + this.lastName;
                //     },
                //     set(value) {
                //         // 控制台执行 vm.fullName='李-四' 就会调用这个方法
                //         console.log('fullName set被调用...');
                //         const{firstName, lastName} = value.split('-');
                //         this.firstName = firstName;
                //         this.lastName = lastName;
                //     }
                // }
                // 简写（没有set的情况下）
                fullName() {
                    console.log('fullName get被调用...');
                    return this.firstName + '-' + this.lastName;
                }
            }
        })
    </script>
```

## 监视器watch
监视器可以侦听属性的变化
基本使用：
```javascript
watch: {
    // 监视的配置对象, watch不仅能监视data的普通属性，也可以检测计算属性
    isHot: {
        // 当这个属性为true时，页面刚渲染就运行handler函数，默认false
        immediate: true,
        // handler啥时候调用呢？
        // 当isHot发生改变就会调用该函数
        // handler接收两个参数，一个是这个状态参数改变前的值，另一个是改变后的旧值
        handler(newValue, oldValue) {
            console.log(`isHot监视器, newValue = ${newValue}, oldValue = ${oldValue}`);
        }
    }
    // 简写 前提:不使用immediate等额外属性
    isHot(newValue, oldValue) {
        console.log(`isHot监视器, newValue = ${newValue}, oldValue = ${oldValue}`);
    }
}
```
第二种写法，使用vm实现
```javascript
// 监视器第二种写法
vm.$watch('flag', {
    immediate: true,
    handler(newValue, oldValue) {
        console.log(`flag监视器, newValue = ${newValue}, oldValue = ${oldValue}`);
    }
});
// 简写
vm.$watch('flag', function (newValue, oldValue) {
    console.log(`flag监视器, newValue = ${newValue}, oldValue = ${oldValue}`);
});
```
深度监视器：
```javascript
const vm = new Vue({
    el: '#app',
    data: {
        numbers: {
            a: 1,
            b: 2
        }
    },
    watch: {
        // 对numbers整个对象进行监视，任意元素变化都会执行handler
        numbers: {
            deep: true,
            // 为啥深度监视器不能获取oldValue.a旧值?
            // 因为深度监视器是浅拷贝，只是对比val地址变化，不会保留对象的整个历史记录
            handler(newValue, oldValue) {
                console.log(`numbers深度监视器a, newValue = ${newValue.a}, oldValue = ${oldValue.a}`);
                console.log(`numbers深度监视器b, newValue = ${newValue.b}, oldValue = ${oldValue.b}`);
            }
        },
        'numbers.a': {
            handler(val, oldVal) {
                console.log(`numbers.a监视器, newValue = ${val}, oldValue = ${oldVal}`);
            }
        }
    }
})
vm.$watch('numbers.b', function (val, oldVal) {
    console.log(`numbers.b监视器, newValue = ${val}, oldValue = ${oldVal}`);
})
```
**监视器对比计算属性**：

computed和watch之间的区别：
-   computed能完成的功能，watch都可以完成。
-   watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。

两个重要的小原则：
-   所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
-   所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。
```javascript
const vm = new Vue({
    el: '#app',
    data: {
        firstName: '张',
        lastName: '三',
        fullName: '张-三'
    },
    watch: {
        // 监视姓名的修改，然后改变全名
        firstName: {
            handler(val) {
                this.fullName = val + '-' + this.lastName;
            }
        },
        lastName(val) {
            // 监视器可以设置异步操作，2秒后再完成值更新
            setTimeout(() => {
                // 这里的this是vue实例对象
                console.log(this);
                this.fullName = this.firstName + '-' + val;
            }, 2000);
        }
    },
    computed: {
        // 计算属性不能设置异步
        test() {
            return this.firstName + '-' + this.lastName;
        }
    }
})
```

## 样式绑定

-   class样式，写法`:class="xxx"` xxx可以是字符串、对象、数组。
    -   字符串写法适用于：类名不确定，要动态获取。
    -   对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
    -   数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
-   style样式
    -   `:style="{fontSize: xxx}"`其中xxx是动态值。
    -   `:style="[a,b]"`其中a、b是样式对象。

```javascript
<div id="app">
<!--:class 绑定class样式字符串写法 适用于样式的类名不确定，需要动态指定-->
<div class="basic" :class="mood" @click="changeMood">{{name}}</div><br /><br />

<!--:class 绑定class样式数组写法 适用于样式个数不确定，名字也不确定的状况-->
<div class="basic" :class="moodArr">{{name}}</div><br /><br />

<!--:class 绑定class样式对象写法 适用于要绑定的样式个数确定，名字确定，但动态决定要不要用的状况-->
<div class="basic" :class="moodObj">{{name}}</div><br /><br />

<!-- 绑定style样式--对象写法 -->
<div class="basic" :style="styleObj">{{name}}</div><br /><br />

<!-- 绑定style样式--数组写法 -->
<div class="basic" :style="[styleObj, styleObj1]">{{name}}</div><br /><br />

<!-- 绑定style样式--数组写法2 -->
<div class="basic" :style="styleArr">{{name}}</div>
</div>
<script>
const vm = new Vue({
    el: '#app',
    data: {
        name: '张三',
        mood: 'normal',
        moodArr: ['test01', 'test02', 'test03'],
        // true或者false表示是否使用该样式
        moodObj: {
            test01: false,
            test02: false,
            test03: true
        },
        styleObj: {
            fontSize: '50px',
            color: 'red'
        },
        styleObj1: {
            backgroundColor: 'blue'
        },
        styleArr: [
            {
                fontSize: '40px',
                color: 'skyblue'
            },
            {
                backgroundColor: 'yellowgreen'
            }
        ]
    },
    methods: {
        changeMood() {
            // 非框架旧写法
            // document.getElementById('basic').className='basic happy';
            let arr = ['normal', 'happy', 'sad'];
            let index = Math.floor(Math.random() * 3);
            console.log(`index = ${index}`);
            this.mood = arr[index];
        }
    }
})
</script>
```
## filter

```javascript
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

