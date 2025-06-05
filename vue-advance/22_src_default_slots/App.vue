<template>
  <div class="container">
    <Category title="美食">
      <img src="https://qcloud.dpfile.com/pc/e7D3x6FmIrlZDyyCwEuSncQdWyaKAg8RRXIA8rKux8psuQrXyupf9pvQVGuOrnk2Y0q73sB2DyQcgmKUxZFQtw.jpg">
    </Category>
    <Category title="游戏" :dataList="games">
      <ul>
        <li v-for="(item, index) in games" :key="index">
          {{ item }}
        </li>
      </ul>
    </Category>
    <Category title="电影" :dataList="films">
      <ol>
        <li v-for="(item, index) in films" :key="index">
          {{ item }}
        </li>
      </ol>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category'

export default {
  name: 'App',
  components: {Category},
  data() {
    return{
      foods:['螺狮粉', '老友粉', '烧烤'],
      games:['梦幻西游', '梦幻模拟战', '王者荣耀'],
      films:['《功夫》', '《大话西游》', '《喜剧之王》'],
    }
  }
}

</script>

<style>
.container{
  display: flex;
  justify-content: space-around;
}

img {
  width: 100%;
}

</style>