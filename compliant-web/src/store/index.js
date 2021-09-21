import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import Public from './modules/Public'
import Award from './modules/Award'
import Company from './modules/Company'
import Tender from './modules/Tender'
import Admin from './modules/Admin'
import User from './modules/User'
import Auth from './modules/User/auth'

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        Public,
        Award,
        Company,
        Tender,
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