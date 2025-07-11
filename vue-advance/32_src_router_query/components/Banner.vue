<template>
  <div class="row">
    <div class="col-xs-offset-2 col-xs-8">
      <div class="page-header">
        <h2>Vue Router Demo</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  beforeDestroy() {
    console.log('Banner beforeDestroy')
  },
  mounted(){
    // console.log('@banner', this.$route);
  }
}
</script>

<style scoped>

</style>