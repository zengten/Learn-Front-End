<template>
  <div class="person">
    <h2>一辆品牌是{{ car.brand }}的车，价格：{{ car.price }}</h2>
    <button @click="changePrice">修改汽车价格</button>
    <button @click="changeCar">修改汽车全部属性</button>
    <h2>测试数据：{{num}}</h2>
    <button @click="changeNum">修改测试数据</button>
  </div>
</template>

<script lang="ts" setup name="Person">
// ref 可以定义基本类型的数据，也可以定义对象类型的数据（此时底层依旧使用的是reactive实现的）
// reactive 只能定义对象类型的数据
import {ref, reactive} from "vue";

let car = reactive({brand: '特斯拉', price: 25})

function changePrice() {
  car.price += 1
}

// 整体修改car的属性
function changeCar() {
  // 直接使用对象赋值，页面是不会更新的
  // car = {brand: '丰田', price: 12}
  // 继续使用reactive也不行，因为原来的car和现在的car不是一个数据对象，监测不到数据变化，页面也就不更新
  // car = reactive({brand: '丰田', price: 12})
  // 下面这个写法页面可以更新(覆盖追加到原对象里面)
  Object.assign(car, {brand: '丰田', price: 12})
}

let num = ref(3)

function changeNum() {
  // 这么写，页面数据也不会变化的，与重新赋值reactive的数据引发的问题是一样的
  // num = ref(6)
  num.value += 1
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