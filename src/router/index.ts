import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Detail from '@/views/Detail.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/money'
  },
  {
    path: '/detail',
    name:'Detail',
    component:Detail
  },
  {
    path: '/money',
    name:'Money',
    component:Money
  },
  {
    path: '/statistics',
    name:'Statistics',
    component:Statistics
  },
  {
    // 捕获除上述路径外的其他所有路径
    path:'*',
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
