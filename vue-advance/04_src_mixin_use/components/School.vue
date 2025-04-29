<template>
  <div class="demo">
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
import {mixinMethod, commonData} from '@/mixin'

export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      address: '北京市',
      //如果混合中配置了与data(或者配置了相同的methods)相同的属性值，则以你的配置的属性为主(而不以mixin为主)
      x: 99
    }
  },
  methods: {
    showName() {
      alert(this.name)
    }
  },
  mounted() {
    // 如果mixin和组件都写了mounted，则都会执行，mixin的mounted先执行
    console.log('school mounted...')
  },
  mixins: [mixinMethod, commonData]
}
</script>

<style>
.demo {
  background-color: greenyellow;
}
</style>