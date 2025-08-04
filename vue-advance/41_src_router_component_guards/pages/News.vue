<template>
  <div>
    <!--完整写法v-bind:style="{opacity: opacity}-->
    <li :style="{opacity}">欢迎学习Vue</li>
    <!--使用路由缓存keep-alive之后，输入框里面的内容不会消失-->
    <li>news01<input type="text"></li>
    <li>news02<input type="text"></li>
    <li>news03<input type="text"></li>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      opacity: 1
    }
  },
  // 如果这个组件使用了keep-alive进行缓存，那使用mounted就不合适，因为不会触发beforeDestroy钩子，也就不会结束死循环
  // mounted() {
  //   console.log("News mounted....")
  //   this.timer = setInterval(() => {
  //     console.log('@')
  //     this.opacity -= 0.01
  //     while (this.opacity <= 0) {
  //       this.opacity = 1
  //     }
  //   }, 30)
  // },
  beforeDestroy() {
    console.log('news beforeDestroy')
    // clearInterval(this.timer)
  },
  // 激活(路由组件独有的钩子)，来实现之前mounted时的功能
  activated() {
    console.log("News activated....")
    this.timer = setInterval(() => {
      console.log('@')
      this.opacity -= 0.01
      while (this.opacity <= 0) {
        this.opacity = 1
      }
    }, 30)
  },
  // 失活(路由组件独有的钩子)，来实现之前beforeDestroy的功能
  deactivated() {
    console.log("News deactivated....")
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>