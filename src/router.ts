import Vue from 'vue';
import Router from 'vue-router';

import store from './store/index';
import Home from './views/Home.vue';

export const SIGN_IN_URL: string = '/auth';
const REGISTER_URL: string = '/register';

// the authGuard`s clousure for redirect after sign in
let redirectURL: string = '';

const authGuard = (to: { path: string }, from: any, next: (path: string|void) => void) => {


  if (store.getters['auth/isLogin']) {
    if (redirectURL === '') {
      return next();
    }

    const url = redirectURL;
    redirectURL = '';
    return next(url);

  } else {
    if ([SIGN_IN_URL, REGISTER_URL].includes(to.path)) {
      return next();
    }
    redirectURL = to.path;
    return next(SIGN_IN_URL);
  }
};

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: SIGN_IN_URL,
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/SignIn.vue'),
    },
    {
      path: REGISTER_URL,
      name: 'register',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/Register.vue'),
    },
  ],
});

router.beforeEach(authGuard);

export default router;
