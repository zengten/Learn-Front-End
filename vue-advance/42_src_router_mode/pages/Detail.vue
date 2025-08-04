<template>
  <div>
    <ul>
      <li>消息id: {{ id }}</li>
      <li>消息标题：{{ title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["id", "title"],
  mounted() {
    // route里面会有query参数，取出来即可展示
    console.log("detail route @", this.$route);
    console.log("detail router @", this.$router);
  },
  // 在进入当前组件对应的路由前调用，此时组件还未实例化
  beforeRouteEnter(to, from, next) {
    // 不能在这里使用 this
    console.log('detail beforeRouteEnter')
    // 里面的vm就是已经实例化的
    next(vm => {
      // vm 就是组件实例，可以访问 this
      console.log('@@@@detail ', vm)
    });
  },
  // 在离开当前组件对应的路由时调用
  beforeRouteLeave(to, from, next) {
    console.log('detail beforeRouteLeave')
    next()
  },
  // 当当前路由路径发生变化，但对应的组件实例被复用时调用（如动态路由参数变化时）
  beforeRouteUpdate(to, from, next) {
    // 路由参数变化时更新数据
    console.log('detail beforeRouteUpdate')
    next();
  }
};
</script>

<style>
</style>