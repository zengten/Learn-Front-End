import VueRouter from "vue-router";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Message from "@/pages/Message";
import News from "@/pages/News";
import Detail from "@/pages/Detail";

export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
      // 注意子路由不用写斜杠+路径
      children: [
        {
          path: "news",
          component: News,
        },
        {
          path: "message",
          component: Message,
          children: [
            {
              path: "detail",
              component: Detail,
            },
          ],
        },
      ],
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
