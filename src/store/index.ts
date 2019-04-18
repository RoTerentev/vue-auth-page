import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { auth } from './modules/auth';

export interface RootState {}

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  modules: {
    auth
  }
};

export default new Vuex.Store<RootState>(store);
