import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决路由重复点击问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter)
import { routes } from './routes'

const router = new VueRouter({
  routes
})

export default router
