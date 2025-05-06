<template>
  <div class="demo">
    <h2 class="qwe">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      address: '北京市',
    }
  }
}
</script>

<!--默认lang属性是css解析，也可以使用less，需要额外的依赖包less和less-loader@7-->
<style lang="less" scoped>
.demo {
  background-color: pink;
  .qwe {
    font-size: 50px;
  }
}
</style>