<template>
  <div class="person">
    <!--模板里面不需要.value-->
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="showMobile">点击展示手机号</button>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script lang="ts" setup name="Person">
// 引入响应式ref，注意操作ref对象时，需要使用.value
import {ref} from 'vue'

let name = ref('张三')
let age = ref(20)
// 这个参数并不变化，所以无需响应式
let mobile = '18112344321'
let showMobile = () => alert(mobile)
let changeName = () => {
  // JS中操作ref对象时候需要.value
  name.value = 'zhang-san'
  console.log(name.value)
}
let changeAge = () => {
  // JS中操作ref对象时候需要.value
  age.value++
  console.log(age.value)
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