<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="showMobile">点击展示手机号</button>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<!-- 使用name属性需要插件支持-->
<!-- npm i vite-plugin-vue-setup-extend -D -->
<!-- 并修改vite.config.ts-->
<script lang="ts" setup name="Person111">
let name = '张三'
let age = 20
let mobile = '18112344321'
let showMobile = () => alert(mobile)
let changeName = () => {
  name = 'zhang-san'
  console.log(name)
}
let changeAge = () => {
  age++
  console.log(age)
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