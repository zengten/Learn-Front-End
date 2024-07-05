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