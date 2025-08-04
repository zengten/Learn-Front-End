<template>
  <div class="row">
    <div class="col-xs-offset-2 col-xs-8">
      <div class="page-header">
        <h2>Vue Router Demo</h2>
      </div>
      <button @click="back">后退</button>
      <button @click="forward">前进</button>
      <button @click="testRouter">测试一下</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  beforeDestroy() {
    console.log('Banner beforeDestroy')
  },
  methods:{
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
    testRouter() {
      // 回退2步
      this.$router.go(-2);
    }
  },
  mounted(){
    // console.log('@banner', this.$route);
  }
}
</script>

<style scoped>

</style>