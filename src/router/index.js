import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        name: "ToDoList",
          component: () => import(
            /* webpackChunkName: "AllBreweries" */ '../components/ToDoList.vue')
    },
    {
      // path: "/fetch-test",
      path: "/fetch-test",
      name: "FetchTest",
        component: () => import(
          /* webpackChunkName: "FetchTest" */ '../components/FetchTest.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 