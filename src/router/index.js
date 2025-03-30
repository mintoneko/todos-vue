import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/date/:id/',
    name: 'weekday',
    component: () => import('@/components/Test.vue')
  },
  {
    path: '/:catchAll(.*)', // 兜底路由
    redirect: '/date/0/'
  }
];

const router = createRouter({
  history: createWebHistory('/todos-vue/'), // 匹配vite配置的base路径
  routes,
  linkActiveClass: 'weekday-active'
})

export default router