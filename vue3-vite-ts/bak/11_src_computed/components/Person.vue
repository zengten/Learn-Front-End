<template>
  <div class="person">
    <h2>姓：<input type="text" v-model="firstName"></h2>
    <h2>名：<input type="text" v-model="lastName"></h2>
    <button @click="changeData">修改姓名</button>
    <button @click="changeFullName">修改全名</button>
    <h2>全名：{{ fullName }}</h2>
    <h2>全名：{{ fullName }}</h2>
    <h2>全名：{{ fullName }}</h2>
  </div>
</template>

<script lang="ts" setup name="Person">

import {ref, computed} from "vue";

let firstName = ref('zhang')
let lastName = ref('san')

// 计算属性只会调用一次
// 第一种写法，返回结果是只读的
// let fullName = computed(() => {
//   console.log('@@@')
//   return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
// })

// 第二种写法，可以另外修改计算属性的值
let fullName = computed({
  get() {
    console.log('get@')
    console.log(firstName)
    console.log(lastName)

    return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
  },
  set(val) {
    // 注意这里是数组解构，而不是对象解构，不然解构出来的数据是undefined，踩大坑-.-
    const [str1, str2] = val.split('-')
    firstName.value = str1
    lastName.value = str2
    console.log('set@')
  }
})

// 直接报错 Attempt to assign to const or readonly variable，不能修改只读属性
// function changeFullName() {
//   fullName.value = 'li-si'
// }

function changeFullName() {
  fullName.value = 'li-si'
}

function changeData() {
  firstName.value = 'li'
  lastName.value = 'si'
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