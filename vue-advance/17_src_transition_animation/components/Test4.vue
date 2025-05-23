<template>
  <!--使用第三方动画animate.css-->
  <!--  分三步使用这个库，
  1.import 'animate.css'
  2.配置name="animate__animated animate__bounce"
  3.配置enter-active-class和leave-active-class属性
  -->
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition
        name="animate__animated animate__bounce"
        appear
        enter-active-class="animate__bounce"
        leave-active-class="animate__fadeOutBottomRight"
    >
      <h1 v-show="isShow">你好啊2</h1>
    </transition>
  </div>
</template>

<script>
import 'animate.css'

export default {
  name: 'Test4',
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
h1 {
  background: pink;
}
</style>