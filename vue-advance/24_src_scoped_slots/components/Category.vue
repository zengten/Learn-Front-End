<template>
  <div class="category">
    <h3>{{ title }}</h3>
    <!--作用域插槽 传递数据到使用者那边 -->
    <slot :dataList="foods">插槽</slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['title'],
  data() {
    return {
      foods: ['螺狮粉', '老友粉', '烧烤'],
    }
  }
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
}
</style>