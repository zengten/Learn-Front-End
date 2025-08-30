<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeUsername">修改用户名</button>
  </div>
</template>

<script lang="ts" setup name="Person">

import {toRefs, toRef, reactive} from "vue";

let person = reactive({name: "张三", age: 18})

// 使用toRefs从person这个响应式对象中，解构出name、age，且name和age依然是响应式的
// name和age的值是ref类型，其value值指向的是person.name和person.age
let {name, age} = toRefs(person)

let username = toRef(person, 'name')

function changeName() {
  person.name += '~'
  console.log(name.value, person.name)
}

function changeAge() {
  person.age += 1
  console.log(age.value, person.age)
}

// 会同时改变username和person的name属性值
function changeUsername() {
  username.value += '!'
  console.log(username.value, person.name)
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