import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

const routes = [
    {
        // path: "/157.230.93.52/vue-app/dist/",
        path: "/",
        name: "ToDoList",
          component: () => import(
            /* webpackChunkName: "ToDoList" */ '../components/ToDoList.vue')
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
  // history: createWebHistory(),
  history: createMemoryHistory(),
  routes
})

export default router 