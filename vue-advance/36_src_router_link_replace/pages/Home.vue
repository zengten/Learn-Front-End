<template>
  <div>
    <h2>我是Home的内容</h2>
    <ul class="nav nav-tabs">
      <li>
        <!--router-link写replace属性，替换浏览器的当前堆栈，默认是push（追加）默认，不简写-->
        <router-link :replace="true" class="list-group-item" to="/home/message" active-class="active">Message
        </router-link>
      </li>
      <li>
        <!--简写replace-->
        <router-link replace class="list-group-item" to="/home/news" active-class="active">News</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  beforeDestroy() {
    console.log('Home beforeDestroy')
  }
}
</script>

<style scoped>

</style>