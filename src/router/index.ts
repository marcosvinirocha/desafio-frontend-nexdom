import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import MovimentationView from "@/views/MovimentationView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/produtos",
    name: "Products",
    component: ProductView,
  },
  {
    path: "/movimentacao",
    name: "Movimentation",
    component: MovimentationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
