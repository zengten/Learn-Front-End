<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!--          <a class="list-group-item" href="./about.html">About</a>-->
          <!--          <a class="list-group-item active" href="./home.html">Home</a>-->
          <!--路由router-link-->
          <router-link class="list-group-item" active-class="active" to="/Home">Home</router-link>
          <router-link class="list-group-item" active-class="active" to="/About">About</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!--展示路由之后的页面-->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './components/Home'
import About from './components/About'

export default {
  name: 'App',
  components: {Home, About}
}

</script>

<style>


</style>