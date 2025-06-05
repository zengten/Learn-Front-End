<template>
  <div class="container">
    <Category title="美食">
      <img slot="center"
           src="https://qcloud.dpfile.com/pc/e7D3x6FmIrlZDyyCwEuSncQdWyaKAg8RRXIA8rKux8psuQrXyupf9pvQVGuOrnk2Y0q73sB2DyQcgmKUxZFQtw.jpg"
           alt="food"
      >
      <ul slot="footer">
        <li v-for="(item, index) in foods" :key="index">
          {{ item }}
        </li>
      </ul>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(item, index) in games" :key="index">
          {{ item }}
        </li>
      </ul>
      <div slot="footer" class="footer">
        <a slot="center" href="https://www.baidu.com">单机游戏</a>
        <!--注意使用&nbsp;是不生效的-->
        <a slot="footer" href="https://www.baidu.com">网络游戏</a>
      </div>
    </Category>
    <Category title="电影">
      <ol slot="center">
        <li v-for="(item, index) in films" :key="index">
          {{ item }}
        </li>
      </ol>
      <!--注意v-slot仅仅只能被用在组件上或者template标签上-->
      <template v-slot:footer>
        <div class="footer">
          <a href="https://www.baidu.com">经典电影</a>
          <a href="https://www.baidu.com">热门推荐</a>
        </div>
        <h4>欢迎前来观看</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category'

export default {
  name: 'App',
  components: {Category},
  data() {
    return {
      foods: ['螺狮粉', '老友粉', '烧烤'],
      games: ['梦幻西游', '梦幻模拟战', '王者荣耀'],
      films: ['《功夫》', '《大话西游》', '《喜剧之王》'],
    }
  }
}

</script>

<style>
.container, .footer {
  display: flex;
  justify-content: space-around;
}

img {
  width: 100%;
}

h4{
  text-align: center;
}

</style>