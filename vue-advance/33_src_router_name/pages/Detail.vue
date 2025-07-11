<template>
  <div>
    <ul>
        <li>消息id: {{ $route.query.id }}</li>
        <li>消息标题：{{ $route.query.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
 name:'Detail',
 mounted() {
    // route里面会有query参数，取出来即可展示r
    console.log('detail route @', this.$route);
    console.log('detail router @', this.$router);
 }
}
</script>

<style>

</style>