import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import post from './modules/post';
import article from './modules/article';
import admin from './modules/admin';
import actions from './actions';
import getters from './getters';
import comment from './modules/comment';
import category from './modules/category';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    post,
    article,
    admin,
    comment,
    category
  },
  strict: true,
  actions,
  getters,
  debug: true,
});