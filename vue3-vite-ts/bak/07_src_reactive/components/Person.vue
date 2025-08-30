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
    <hr>
    <h2>测试：{{obj.a.b.c}}</h2>
    <button @click="changeAbc">测试一下</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import {reactive} from "vue";

let car = reactive({brand: '特斯拉', price: 25})

function changePrice() {
  car.price += 1
}

let games = reactive([
  {id: '001', name: "梦幻模拟战"},
  {id: '002', name: "梦幻西游"},
  {id: '003', name: "塞尔达"}
])

function changeFirstName() {
  games[0].name = '仙剑奇侠传'
}


// 测试reactive是不是深层次的
let obj = reactive({
  a: {
    b: {
      c: 666
    }
  }
})

function changeAbc() {
  obj.a.b.c = 999
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