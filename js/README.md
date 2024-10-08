# js基础
## 语法
### let,var,const区别

- let只能声明一次变量，var可以多次声明

```javascript
let a = 1
// 重复声明会报错
// let a = 2
var b = 2
// 不会报错
var b = 3
console.log(a)
console.log(b)
```

- let声明有严格的**作用域**，var没有严格的作用域

```javascript
{
    let c = 5
    var d = 6
}
console.log(d)
// let类型变量跨作用域会报错 c is not defined
// console.log(c)
```

- var会存在变量提升，let不会

```javascript
// 输出 undefined
console.log(f)
var f = 8
// let 会报错
console.log(e)
let e = 7
```

- const声明的变量不允许被修改

```javascript
const x = 1
// 报错 Uncaught TypeError: Assignment to constant variable.
x = 2
console.log(x)
```

### 解构表达式

- 数组解构

```javascript
var arr = [1, 2, 3]
// 旧赋值方式
var a = arr[0]
var b = arr[1]
var c = arr[2]
console.log(a)
console.log(b)
console.log(c)

// 新赋值方式
var [a, b, c] = arr
console.log(a)
console.log(b)
console.log(c)

// 如果声明变量比数组元素少，则赋值前2个元素
var [b1, b2] = arr
console.log(b1)
console.log(b2)

// 如果声明变量比数组元素多，多出的变量继续赋值数组末尾元素
var [b1, b2, b3, b4] = arr
console.log(b1)
console.log(b2)
console.log(b3)
console.log(b4) // 3
```

- 对象解构

```javascript
var person = {
    name: '张三',
    age: 22,
    language: ['java', 'python', 'c++']
}
// 旧赋值方式
// const name = person.name;
// const age = person.age;
// const language = person.language;

// 新赋值方式, 取出name的值 赋给userName
const { name: userName, age, language } = person

console.log(userName, age, language)
```

- 字符串扩展

```javascript
// 字符串api
let str = 'hello.vue'
console.log(str.startsWith('hello'))//true
console.log(str.endsWith('vue'))//true
console.log(str.includes('e'))//true
console.log(str.includes('hello'))//true
```

- 模板字符串

```javascript
let name = '张三'
let age = 22
let str = `My Name is ${name},I am ${age + 1} years old next year.`
// 可以格式化输出
console.log(str)//My Name is 张三,I am 23 years old next year.
```

- 箭头函数解构

```javascript
// 可读性差不建议使用
var person = {
    name: '张三',
    age: 22,
    language: ['java', 'python', 'c++']
}
var helloName = ({ name }) => console.log('hello,' + person.name)
helloName(person)//hello,张三
```


### 链判断
使用链判断运算符，简化空对象检查
```javascript
var data = null;
// 错误写法会报错 TypeError: Cannot read properties of null (reading 'user')
// let firstname = data.user.firstname || 'default';
// 旧式正确写法
var data = {
    user: {
        firstname: '张三'
    }
}
let firstname = (data && data.user && data.user.firstname) || 'default';
console.log(firstname)
// 这样的层层判断非常麻烦，因此 ES2020 引入了“链判断运算符”,简化写法
firstname = data?.user?.firstname || 'default';
console.log(firstname)
```

### 参数默认值
可以给方法的参数设定默认值，不用在方法体内设定
```javascript
// 在 ES6 以前，我们无法给一个函数参数设置默认值，只能采用变通写法：
function add1(a, b) {
    // 判断 b 是否为空，为空就给默认值 1
    b = b || 1;
    return a + b;
}
console.log(add1(1, 2)) // 3
console.log(add1(1)) // 2
// 现在可以这么写：直接给参数写上默认值，没传就会自动使用默认值
function add2(a, b = 2) {
    return a + b;
}
console.log(add2(1)) // 3
```

### 箭头函数

示例1：箭头函数

```javascript
var f1 = function (a) {
    return a + 1
}
// 有点像java lambda表达式
var f11 = a => a + 1
console.log(f1(10))//11
console.log(f11(20))//21

var f2 = function (a, b) {
    return a + b
}
var f22 = (a, b) => a + b
console.log(f2(1, 2))//3
console.log(f22(5, 6))//11
```

示例2：函数形参默认值

```javascript
// es6写法形参默认值
function add(a, b) {
    // b是否为空，为空则赋值1
    b = b || 1;
    return a + b
}
console.log(add(3))//4
console.log(add(3, 2))//5

// es6写法
function add2(a, b = 1) {
    return a + b
}
console.log(add2(3))//4
console.log(add2(3, 2))//5
```

示例3：不定参数

```javascript
// 不定参数
function fun(...values) {
    return values.length
}
console.log(fun(1, 2, 3))//3
```

### 模板字符串
使用模板字符串拼接数据
```javascript
// 旧写法
let str1 = "你好，我的名字是："+ userName +"，年龄是：" + age + ", 语言是：" + language;
console.log(str1);
// 使用模板字符串写法
let str2 = `你好，我的名字是：${userName}，年龄是：${age}，语言是：${language}`
console.log(str2);
```

### 对象优化

- Object相关api

```javascript
const person = {
    name: 'zhangsan',
    age: 30,
    language: ['java', 'html', 'css']
}
// object相关api
console.log(Object.keys(person))//输出所有key
console.log(Object.values(person))//输出所有value
console.log(Object.entries(person))//输出所有entry
// 遍历person数据
Object.entries(person).forEach(([key, value]) => {
    console.log(`key = ${key}, value = ${value}`)
})
```

- 合并对象

```javascript
// 合并对象
const source1 = { a: 1 }
const source2 = { b: 2 }
const target = { c: 3 }
console.log(Object.assign(target, source1, source2))// 合并source1，source2到target对象
```

- 声明对象简写

```javascript
// 声明对象简写
//   旧声明方式
const name = 'zhangsan'
const age = 23
const person2 = { name: name, age: age }
console.log(person2)
//   新声明方式
const person3 = { name, age }
console.log(person3)
```

- 对象内部函数简写

```javascript
// 对象内部函数简写
let person4 = {
    name: 'jack',
    // 以前
    eat: function (food) {
        console.log(this.name + '在吃' + food)
    },
    // 箭头函数内部使用this会读取windows对象的name，而不是person4对象的属性，为空
    eat2: food => console.log(this.name + '在吃' + food),
    // 使用 对象.属性 解决不能读取的问题
    eat3: food => console.log(person4.name + '在吃' + food),
    // 另外的声明简写方式
    eat4(food) {
        console.log(this.name + '在吃' + food)
    }
}
person4.eat('青菜')// jack在吃青菜
person4.eat2('萝卜')// 在吃萝卜
person4.eat3('豆腐')// jack在吃豆腐
person4.eat4('橘子')// jack在吃橘子
```

- 对象拷贝

```javascript
// 对象拷贝(深拷贝)
const person = {
    name: 'zhangsan',
    age: 30,
    language: ['java', 'html', 'css']
}
const otherPerson = { ...person }
// otherPerson复制了person对象
console.log(otherPerson)// {name: 'zhangsan', age: 30, language: Array(3)}
```

- 合并对象

```javascript
// 合并对象
const user1 = { name: 'zhangsan', age: 22 }
const user2 = { name: 'zhangsan2', gender: '男' }
const targetUser = { ...user1, ...user2 }
// 相同属性，后者会覆盖前者
console.log(targetUser)//{name: 'zhangsan2', age: 22, gender: '男'}
```

### map&reduce

有点像java的函数式

```javascript
let arr = [2, 7, -3, 6, 9]
// 数组中所有元素值+1
arr = arr.map(item => item + 1);
console.log(arr)// [3, 8, -2, 7, 10]

// 相当于数组求和, 第一次循环时(x, y)分别表示数组元素中第一个和第二个元素
let result = arr.reduce((x, y) => {
    // 上一次处理后的结果
    console.log('x = ' + x)
    // 下一个数组中待处理的元素
    console.log('y = ' + y)
    return x + y
})
console.log(result)//26

result = arr.reduce((x, y) => {
    // 上一次处理后的结果
    console.log('x = ' + x)
    // 下一个数组中待处理的元素
    console.log('y = ' + y)
    return x + y
}, 100)// 初值100
console.log(result)//126
```

### promise使用

**Promise** 代表 `异步对象`，类似Java中的 `CompletableFuture`

**Promise** 是现代 JavaScript 中异步编程的基础，是一个由异步函数返回的可以向我们指示当前操作所处的状态的对象。在 Promise 返回给调用者的时候，操作往往还没有完成，但 Promise 对象可以让我们操作最终完成时对其进行处理（无论成功还是失败）

**Promise** 有三种状态：

- **待定（pending）**：初始状态，既没有被兑现，也没有被拒绝。这是调用 fetch() 返回 Promise 时的状态，此时请求还在进行中。
- **已兑现（fulfilled）**：意味着操作成功完成。当 Promise 完成时，它的 then() 处理函数被调用。
- **已拒绝（rejected）**：意味着操作失败。当一个 Promise 失败时，它的 catch() 处理函数被调用。

fetch 是浏览器支持从远程获取数据的一个函数，这个函数返回的就是 `Promise 对象`

```javascript
// fetch api, fetch 是浏览器支持从远程获取数据的一个函数，这个函数返回的就是 Promise 对象
console.log('开始发送请求')
const promise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
console.log(promise) // 发现promise还处于pending状态
promise.then(resp => {
    console.log(`已收到响应，状态值:${resp.status}`); // 打印慢于`已完成发送请求`
    const respJson = resp.json();
    respJson.then(json => {
        console.log(`收到请求返回数据:${json[0].name}`)
    })
})
console.log('已完成发送请求')
```



使用ajax时需要在html的head标签中引入jquery

```html
<!-- 导入jquery -->
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

编写body内脚本代码

```javascript
// 嵌套进行ajax请求，不够直观，阅读体验差
$.ajax({
    url: "/mock/user.json",
    success(data) {
        console.log('1获取用户信息成功:', data)
        $.ajax({
            url: `/mock/user_course_${data.id}.json`,
            success(data) {
                console.log('2获取课程信息成功:', data)
                $.ajax({
                    url: `/mock/course_score_${data.id}.json`,
                    success(data) {
                        console.log('3获取课程分数信息成功:', data)
                    }
                })
            }
        })
    }
})

// 使用 Promise 进行请求封装
function request(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

// 调用封装的方法
request('/mock/user.json') // 返回 Promise
    .then(data => {
    	console.log('4获取用户信息成功:', data)
    	return request(`/mock/user_course_${data.id}.json`) // 继续返回 Promise
	})
    .then(data => {
    	console.log('5获取课程信息成功:', data)
    	return request(`/mock/course_score_${data.id}.json`) // 继续返回 Promise
	})
    .then(data => {
    	console.log('6获取课程分数信息成功:', data)
	})
    .catch(err => {
    	console.log('出现异常', err)
	})
```

### Async关键字

**async function** 声明创建一个绑定到给定名称的新异步函数。函数体内允许使用 await 关键字，这使得我们可以**更简洁地编写基于 promise 的异步代码**，并且**避免了显式地配置 promise 链**的需要。

- `async 函数`是使用`async关键字声明的函数`。async 函数是 [AsyncFunction](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 构造函数的实例，并且其中允许使用 await 关键字。
- `async 和 await` 关键字让我们可以用一种更简洁的方式写出基于 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的异步行为，而无需刻意地链式调用 promise。
- `async 函数` 返回的还是 `Promise对象`

```javascript
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function asyncFunction() {
    // async函数，配合await时sleep才生效
    await sleep(3000)
    console.log('hello async')
}
asyncFunction();
console.log('async end...')
```
在异步函数中，你可以在调用一个返回 Promise 的函数之前使用 **await** 关键字。这使得代码在该点上等待，直到 Promise 被完成，这时 Promise 的响应被当作返回值，或者被拒绝的响应被作为错误抛出。

```javascript
// 只有async标记的方法才能使用await关键字
async function fetchProducts() {
    const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
    if (!response.ok) {
        throw Error(`HTTP 请求出现错误，状态码 ${response.status}`);
    }
    const data = await response.json();
    console.log(`fetchProducts请求返回数据: ${data[0].name}`)
}

fetchProducts()
```

### 模块化
将 JavaScript 程序拆分为可按需导入的单独模块的机制。
需要以module的方式导入javascript，然后这个main.js文件就能import其他js的方法或者变量
`<script src="main.js" type="module"></script>`
```javascript
// main.js的内容
import { user, isAdult } from './lib/user.js'

console.log(`导入user.js的用户名: ${user.username}`)

isAdult()
```