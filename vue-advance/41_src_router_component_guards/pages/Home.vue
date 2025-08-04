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
    <!--include的值代表要缓存的组件，比如下面代表在Home组件中要缓存News组件(组件名)-->
    <!--如果要缓存多个路由组件就改写为:include="['News', 'Message']"，注意冒号-->
    <keep-alive include="News">
      <router-view></router-view>
    </keep-alive>
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