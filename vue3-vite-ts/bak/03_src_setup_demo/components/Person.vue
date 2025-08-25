<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="showMobile">点击展示手机号</button>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  setup() {
    // setup函数中的this是undefined，vue3中已经弱化this了
    console.log('@setup', this)
    // 数据原来是写在data里面的，此时的name，age，mobile都不是响应式的数据
    let name = '张三'
    let age = 20
    let mobile = '18112344321'
    // 可以成功打印
    let showMobile = () => alert(mobile)
    // 注意这里的name和age确实改了，但是页面是没有变化的，原因是没有响应式
    let changeName = () => {
      name = 'zhang-san'
      console.log(name)
    }
    let changeAge = () => {
      age++
      console.log(age)
    }
    // 完整写法
    // return {name: name, age: age, mobile: mobile, showMobile: showMobile, changeName: changeName, changeAge: changeAge}
    // 简写
    // return {name, age, mobile, showMobile, changeName, changeAge}
    // setup函数返回值可以是个对象，也可以是个渲染函数，返回的内容直接会展示在页面
    return () => "哈哈"
  },
  beforeCreate() {
    // setup方法比beforeCreate钩子的执行时间还要早
    console.log('beforeCreate')
  }
}
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>