import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/date/:id/',
    name: 'weekday',
    component: () => import('@/components/Test.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: to => ({
      path: `/date/${new Date().getDay()}/#/all ` // 重定向到当前日期的路由
    })
  }
];

const router = createRouter({
  history: createWebHistory('/todos-vue/'),
  routes,
  linkActiveClass: 'weekday-active'
})

// 添加全局路由守卫->解决最开始未匹配到任意路由时到hash问题
let hasInitialized = false
router.afterEach((to) => {
  if (!hasInitialized && !window.location.hash) {
    hasInitialized = true
    router.replace({
      name: to.name,
      params: to.params,
      query: to.query,
      hash: '#/all'
    })
  } 
})

export default router