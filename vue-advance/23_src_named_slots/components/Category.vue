<template>
  <div class="category">
    <h3>{{ title }}</h3>
    <!--具名插槽-->
    <slot name="center">插槽1</slot>
    <slot name="footer">插槽2</slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['title', 'dataList']
}
</script>

<style scoped>
.category {
  background: skyblue;
  width: 200px;
  height: 300px;
}

h3 {
  text-align: center;
  background: orange;
}

img {
  width: 100%;
  height: 50%;
}
</style>