const state = {
    user: {},
    loggedIn : false,
    userType : 'Basic',
}
const getters = {
    getUser: (state) => state.user,
    getLoggedInState: (state) => state.loggedIn,
    getUserType: (state) => state.userType,
}

const actions = {
    setUserType({ commit }, value) {
        commit("setUserTypeValue", value);
    },
    setUserValue({ commit }, value) {
        commit("setUser", value);
    },
    setLoggedInStateValue({ commit }, value) {
        commit("setLoggedInState", value);
    },
}

const mutations = {
    setUser: (state, user) => (state.user = user),
    setLoggedInState: (state, loggedIn) => (state.loggedIn = loggedIn),
    setUserTypeValue: (state, type) => (state.userType = type)
}

export default {
    state,
    getters,
    actions,
    mutations,
  };