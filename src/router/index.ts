import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // component: () => import('../views/Auth.vue'),
    component: Auth,
    props: {
      isSignUp: false,
    },
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    // component: () => import('../views/Auth.vue'),
    component: Auth,
    props: {
      isSignUp: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
