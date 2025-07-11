<template>
  <div>
    <h2>我是Home的内容</h2>
    <ul class="nav nav-tabs">
      <li>
        <!--        <a class="list-group-item" href="./home-news.html">News</a>-->
        <router-link class="list-group-item" to="/home/message" active-class="active">Message</router-link>
      </li>
      <li>
        <!--        <a class="list-group-item active" href="./home-message.html">Message</a>-->
        <router-link class="list-group-item" to="/home/news" active-class="active">News</router-link>
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