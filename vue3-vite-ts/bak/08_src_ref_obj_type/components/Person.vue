<template>
  <div class="person">
    <h2>一辆品牌是{{ car.brand }}的车，价格：{{ car.price }}</h2>
    <button @click="changePrice">修改汽车价格</button>
    <ul>
      <li v-for="item in games" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <button @click="changeFirstName">修改第一个游戏的名字</button>
    <h2>测试reactive：{{ hello }}</h2>
  </div>
</template>

<script lang="ts" setup name="Person">
// ref 可以定义基本类型的数据，也可以定义对象类型的数据（此时底层依旧使用的是reactive实现的）
// reactive 只能定义对象类型的数据
import {ref, reactive} from "vue";

let car = ref({brand: '特斯拉', price: 25})

function changePrice() {
  car.value.price += 1
}

let games = ref([
  {id: '001', name: "梦幻模拟战"},
  {id: '002', name: "梦幻西游"},
  {id: '003', name: "塞尔达"}
])

function changeFirstName() {
  games.value[0].name = '仙剑奇侠传'
}

// 测试reactive定义基本类型，会出现警告 [Vue warn] value cannot be made reactive: 测试数据
let hello = reactive('测试数据')
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