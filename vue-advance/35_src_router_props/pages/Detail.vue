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
};
</script>

<style>
</style>