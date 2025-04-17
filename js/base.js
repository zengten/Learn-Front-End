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