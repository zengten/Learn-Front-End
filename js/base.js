// 一些js基础语法
// set使用
console.log('base.js------------------------------')
arr = [1, 2, 2]
st = new Set(arr)
// set添加元素
st.add(5)
console.log(st)
// 遍历set元素
for (let x of st) {
    console.log(x)
    // 判断是否包含某个元素
    console.log(st.has(x))
}

// Map使用
console.log('map使用------------------------------')
map = new Map()
map.set('a', 1)
map.set('b', 2)
console.log(map)
// 遍历map元素
for (let [k, v] of map) {
    console.log(k, v)
}
// 判断是否包含某个元素
console.log(map.has('a'))
// 获取map的元素个数
console.log(map.size)
// 删除map的元素
map.delete('a')
console.log(map)
// 清空map
map.clear()
console.log(map)

// 栈的使用
console.log('栈的使用------------------------------')
let stack = []
stack.push(1)
stack.push(2)
console.log(stack)
console.log(stack.pop())
console.log(stack)
// 栈顶元素
console.log(stack[stack.length - 1])

// 数组的使用
console.log('数组的使用------------------------------')
// 创建数组,并将数组元素全部置为9
arr = new Array(4).fill(9)
arr = [1, 2, 3]
// 数组长度
console.log(arr.length)
// 数组遍历
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}
// 数组遍历2
for (let x of arr) {
    console.log(x)
}
// 数组遍历3
arr.forEach((x) => {
    console.log(x)
})
// 数组查找
console.log(arr.indexOf(2))
// 数组删除
arr.splice(1, 1)
console.log(arr)
// 数组拼接
arr = arr.concat([4, 5])
console.log(arr)
// 数组排序
arr.sort((a, b) => {
    return b - a
})
console.log('排序后数组：' + arr)
// 数组去重
arr = Array.from(new Set(arr))
console.log(arr)
