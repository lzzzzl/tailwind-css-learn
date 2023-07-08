import { createRouter, createWebHistory } from 'vue-router';
import CityView from '../views/CityView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Home",
    }
  },
  {
    path: '/weather/:state/:city',
    name: 'cityView',
    component: CityView,
    meta: {
      title: "Weather",
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state
    ? `${to.params.city}, ${to.params.state}`
    : to.meta.title
    } | The Local Weather`;
  next();
})

export default router
