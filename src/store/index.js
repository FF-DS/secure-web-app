import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import Public from "./modules/Public";
import Compliant from "./modules/Compliant";
import Admin from "./modules/Admin";
import User from "./modules/User";
import Auth from "./modules/User/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Public,
    Compliant,
    User,
    Auth,
    Admin,
  },
  plugins: [
    createPersistedState({
      paths: ["Auth"],
    }),
  ],
});
