import Vue from 'vue'
import VueRouter from 'vue-router'
import myMain from "@/views/my-main";
import shan from "@/views/shan";
import woshizhu from "@/views/woshizhu";
import ceshi from "@/views/ceshi";
import Login from "@/views/Login";
import Regiter from "@/views/Regiter";
import gouwuche from "@/views/gouwuche";
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    component:myMain,

  },

  {
    path:'/shan'
    ,component: shan
  },
  {
    path:'/woshizhu',
    name:'woshizhu'
    ,component:woshizhu
  },
  {
    path:'/ceshi',
    name:ceshi
    ,component:ceshi
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/regiter',
    component: Regiter
  },
  {
    path: '/gouwuche',
    component:gouwuche
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
