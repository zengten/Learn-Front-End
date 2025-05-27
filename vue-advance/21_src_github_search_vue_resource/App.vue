<template>
  <div class="container">
    <Search/>
    <List/>
  </div>
</template>

<script>
import Search from './components/Search'
import List from './components/List'

// 如果使用import导入库包，会进行严格的检查，不存在就会报错
// 有时候存在一些不太需要的静态资源不想进行导入，这时可以使用标签<link>的形式引入

export default {
  name: 'App',
  components: {Search, List}
}

</script>

<style>


</style>