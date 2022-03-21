import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import RouteNames from '@/enums/routes';
import HomeView from '../views/home-page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: HomeView,
  },
  {
    path: '/todo',
    name: RouteNames.Todo,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/todo-page.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
