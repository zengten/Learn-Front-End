<template>
  <!--用动画实现-->
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition appear>
      <h1 v-show="isShow">你好啊</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Test1',
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<!--v-enter-active表示这个h1的元素进入 DOM 时，会触发一个名为anim的动画，动画持续时间为 0.5 秒，并且是线性的播放速度。-->
<!--v-leave-active表示这个h1的元素从 DOM 中移除时，同样会触发anim动画，不过是反向播放，持续时间同样为 0.5 秒-->
<!--@keyframes规则的作用是定义动画的关键帧，也就是动画在不同时间点的状态。anim是动画名-->
<!--anim是动画让元素从左侧（-100% 的 X 轴位置）平滑地移动到原来的位置（X 轴 0 位置）-->
<style scoped>
h1 {
  background: skyblue;
}

.v-enter-active {
  animation: anim linear 0.5s;
}

.v-leave-active {
  animation: anim linear 0.5s reverse;
}

@keyframes anim {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

</style>