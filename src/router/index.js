import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Cropper from '@/components/cropper/index.vue'
import Calendar from '@/components/calendar/index.vue'

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
      // 日历
      {
        path: '/Calendar',
        name: 'Calendar',
        component: Calendar
    },
  ]
})
