// let,var,const区别
console.log('let,var,const区别----------')
// 1.let只能声明一次变量，var可以多次声明
let a = 1
// 重复声明会报错
// let a = 2
var b = 2
// 不会报错
var b = 3
console.log(a)
console.log(b)
// 2.作用域区别
{
    let c = 5
    var d = 6
}
console.log(d)
// let类型变量跨作用域会报错 c is not defined
// console.log(c)

// 3.var会存在变量提升，let不会
console.log(f) // undefined
var f = 8
// let 会报错
// console.log(e)
let e = 7

const x = 1
// 对const的变量进行修改，会报错Uncaught TypeError: Assignment to constant variable.
// x = 2
console.log(x)


// 解构表达式
console.log('解构表达式----------')

// 1.数组解构
var arr = [1, 2, 3]
// 旧赋值方式
var a1 = arr[0]
var a2 = arr[1]
var a3 = arr[2]
// console.log(a1)
// console.log(a2)
// console.log(a3)

// 新赋值方式
var [b1, b2, b3] = arr
console.log(b1)
console.log(b2)
console.log(b3)

// 如果声明变量比数组元素少，则赋值前2个元素
var [b1, b2] = arr
console.log(b1)
console.log(b2)

// 如果声明变量比数组元素多，多出的变量值为undefined
var [b1, b2, b3, b4] = arr
console.log(b1)
console.log(b2)
console.log(b3)
console.log(b4) // 输出undefined

// 2.对象解构
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

// 3.字符串api
let str = 'hello.vue'
console.log(str.startsWith('hello'))//true
console.log(str.endsWith('vue'))//true
console.log(str.includes('e'))//true
console.log(str.includes('hello'))//true

// 4.箭头函数解构,可读性差不建议使用
var helloName = ({ name }) => console.log('hello,' + person.name)
helloName(person)

console.log('链判断----------')
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

console.log('参数默认值----------')
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

console.log('箭头函数----------')
// 第一种函数写法
var f1 = function (a) {
    return a + 1;
}
// 简写
var f11 = a => a + 1;
console.log(f1(10))
console.log(f11(20))
// 第二种函数写法
function sum1(a, b) {
    return a + b;
}
// 简写
let sum2 = (a, b) => a + b;
console.log(sum1(20, 30))
console.log(sum2(20, 30))
// 不定参数
function fun(...values) {
    return values.length
}
console.log(fun(1, 2, 3)) //3

console.log('模板字符串----------------')
// 旧写法
let str1 = "你好，我的名字是：" + userName + "，年龄是：" + age + ", 语言是：" + language;
console.log(str1);
// 使用模板字符串写法
let str2 = `你好，我的名字是：${userName}，年龄是：${age}，语言是：${language}`
console.log(str2);

console.log('对象优化------------------------')
const person1 = {
    name: 'zhangsan',
    age: 30,
    language: ['java', 'html', 'css']
}
// 1.object相关api
console.log(Object.keys(person1))//输出所有key
console.log(Object.values(person1))//输出所有value
console.log(Object.entries(person1))//输出所有entry
// 遍历person数据
Object.entries(person1).forEach(([key, value]) => {
    console.log(`key = ${key}, value = ${value}`)
})

// 2.合并对象
const source1 = { a: 1 }
const source2 = { b: 2 }
const target = { c: 3 }
console.log(Object.assign(target, source1, source2))// 合并source1，source2到target对象

// 3.声明对象简写
//   旧声明方式
const name1 = 'zhangsan'
const age1 = 23
const person2 = { name: name1, age: age1 }
console.log(person2)
//   新声明方式
const person3 = { name1, age1 }
console.log(person3)

// 4.对象内部函数简写
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

// 5.对象拷贝(深拷贝)
const otherPerson = { ...person1 }
// otherPerson复制了person对象
console.log(otherPerson)// {name: 'zhangsan', age: 30, language: Array(3)}

// 6.合并对象
const user1 = { name: 'zhangsan', age: 22 }
const user2 = { name: 'zhangsan2', gender: '男' }
const targetUser = { ...user1, ...user2 }
// 相同属性，后者会覆盖前者
console.log(targetUser)//{name: 'zhangsan2', age: 22, gender: '男'}

console.log('map reduce-----------------------')
let arr1 = [2, 7, -3, 6, 9]
// 数组中所有元素值+1
arr1 = arr1.map(item => item + 1);
console.log(arr1)// [3, 8, -2, 7, 10]

// 相当于数组求和, 第一次循环时(x, y)分别表示数组元素中第一个和第二个元素
let result = arr1.reduce((x, y) => {
    // 上一次处理后的结果
    console.log('x = ' + x)
    // 下一个数组中待处理的元素
    console.log('y = ' + y)
    return x + y
})
console.log(result)//26

result = arr1.reduce((x, y) => {
    // 上一次处理后的结果
    console.log('x = ' + x)
    // 下一个数组中待处理的元素
    console.log('y = ' + y)
    return x + y
}, 100)// 初值100
console.log(result)//126

console.log('promise----------------------')
// 1.fetch api
// fetch 是浏览器支持从远程获取数据的一个函数，这个函数返回的就是 Promise 对象
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



