import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Items from './components/items.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
          path: '',
          component: Items
        },
        {
          path: 'list/:cate',
          name: 'list',
          component: Items,
          props: true
        },
        {
          path: 'list/:cate/:sec',
          name: 'list',
          component: Items,
          props: true
        }
      ]
    },
    // 利用子路由进行嵌套视图的渲染，不然最高级路由都会被渲染到第一个视图
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})