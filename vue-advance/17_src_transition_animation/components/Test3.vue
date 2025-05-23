<template>
  <!--使用transition-group包裹多个元素的动画-->
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="hello" appear>
      <h1 v-show="isShow" key="1">你好啊1</h1>
      <h1 v-show="!isShow" key="2">你好啊2</h1>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Test3',
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
h1 {
  background: skyblue;
}

/*动画进入的起点,离开的终点*/
.hello-enter,.hello-leave-to {
  transform: translateX(-100%);
}
/*进入的过程中，离开的过程中*/
.hello-enter-active,.hello-leave-active{
  transition: linear 0.5s;
}
/*动画进入的终点,离开的起点*/
.hello-enter-to,.hello-leave {
  transform: translateX(0);
}
</style>