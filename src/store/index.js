import Vue from 'vue';
import Vuex from 'vuex';
import shopModule from '../store/shop';
import bankModule from '../store/bank';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shop: shopModule,
    bank: bankModule,
  },
})