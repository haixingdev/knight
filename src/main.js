import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import store from './store';
import FastClick from 'fastclick';
import { sync } from 'vuex-router-sync';
import Cellar from './util/storage';
import App from './App.vue';
import MuseUI from 'muse-ui';
import VuePreview from 'vue-preview'
import hljs from 'highlight.js';
import 'muse-ui/dist/muse-ui.css';
import teal from 'muse-ui/dist/theme-teal.css'
import './assets/hljs.css';
import './assets/common.css';
import './assets/reset.css';
import './assets/md-icon.css';


window.hljs = hljs;
Vue.use(MuseUI);
Vue.use(VuePreview);
const storage = new Cellar();
const env = process.env.NODE_ENV;
window.addEventListener('load', () => {
  FastClick.attach(document.body)
});
Vue.use(VueRouter);
export const router = new VueRouter({
  mode: env !== 'develop' ? 'hash' : 'hash',
  routes,
});

router.beforeEach((to, from, next, ...rest) => {
  const meta = to.meta || {};
  const user = storage.getUser();
  const path = to.path;
  if (meta.auth && !user && path !== '/login') {
    return next({ path: '/login' });
  }
  if(user && path === '/login' ){
    return next({ path: '/admin/home' });
  }
  next();
});
window.$router = router;
sync(store, router);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');




