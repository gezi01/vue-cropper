import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Cropper from '@/components/cropper/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
      // 裁剪图片
    {
        path: '/Cropper',
        name: 'Cropper',
        component: Cropper
    },
  ]
})
