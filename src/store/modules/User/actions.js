import API from "@/store/api";
import { getLink } from "@/store/links";

const actions = {
  setSelectedObject({ commit }, selectedObject) {
    commit("setSelectedObjectValue", selectedObject);
  },
  setNotificationDialogState({ commit }, flag) {
    commit("setNotificationDialogStateValue", flag);
  },
  setProfileDialogState({ commit }, stateFlag) {
    commit("setProfileDialogStateFlag", stateFlag);
  },
  setSnakBarMessage({ commit }, message) {
    commit("setSnakBarMessageValue", message);
  },
  setSideBarState({ commit }, stateFlag) {
    commit("setSideBarStateFlag", stateFlag);
  },
  setSideBarBurgerState({ commit }, stateFlag) {
    commit("setSideBarBurgerStateFlag", stateFlag);
  },
  setProfileEditDialogState({ commit }, stateFlag) {
    commit("setProfileEditDialogStateFlag", stateFlag);
  },
  registerUser({ commit }, userObject) {
    API.post(getLink("registerUser", {}), userObject)
      .then((response) => {
        commit("setUser", response.user);
        commit("setUserTypeValue", response.user.role);
        commit("setLoggedInState", true);
        localStorage.setItem("accessToken", response.token);
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "register";
        commit("setUserError", errorObj);
      });
  },
  updateUser({ commit }, userObject) {
    API.put(getLink("updateUser", {}), userObject)
      .then((response) => {
        commit("setUserError", { type: "profileSuccess" });
        commit("setUser", response);
      })
      .catch((error) => {
        console.log(error, error.response.data);
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "update";
        commit("setUserError", errorObj);
      });
  },
  loginUser({ commit }, loginObject) {
    API.post(getLink("loginUser", {}), loginObject)
      .then((response) => {
        commit("setLoggedInState", true);
        commit("setUser", response.user);
        commit("setUserTypeValue", response.user.role);
        localStorage.setItem("accessToken", response.token);
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "login";
        commit("setUserError", errorObj);
      });
  },
  logoutUser({ commit }) {
    API.get(getLink("logout", {}), null).then(() => {});
    commit("setLoggedInState", false);
    commit("setUser", null);
    commit("setUserTypeValueUser", "Basic");
    localStorage.setItem("accessToken", null);
  },
  changeProfilePicture({ commit }, picture) {
    API.post(getLink("changeProfile", {}), picture)
      .then(() => {
        API.get(getLink("getUser", {}), null).then((user) => {
          commit("setUser", user);
        });
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  },
  changePassword({ commit }, password) {
    API.post(getLink("changePassword", {}), password)
      .then((response) => {
        commit("setUser", response.user);
        localStorage.setItem("accessToken", response.token);
        commit("setUserError", { type: "passwordSuccess" });
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "changePassword";
        commit("setUserError", errorObj);
      });
  },
  sendAccountUnblockRequest({ dispatch }, params) {
    API.post(getLink("changeAccountState", params), {
      account_state: "Unblocked",
    })
      .then(() => {
        const searchQueries = {
          query: true,
          queries: {
            size: 12,
          },
        };

        dispatch("setSnakBarMessage", {
          message: "The account has been successfully unblocked",
          random: new Date().getTime(),
        });
        dispatch("searchAccounts", searchQueries);
      })
      .catch((result) => {
        console.log(result);
        dispatch("setSnakBarMessage", {
          message: result.response.data.account_state.msg,
          random: new Date().getTime(),
        });
      });
  },
  sendAccountBlockRequest({ dispatch }, params) {
    API.post(getLink("changeAccountState", params), {
      account_state: "Blocked",
    })
      .then(() => {
        const searchQueries = {
          query: true,
          queries: {
            size: 12,
          },
        };
        dispatch("setSnakBarMessage", {
          message: "The account has been successfully blocked",
          random: new Date().getTime(),
        });
        dispatch("searchAccounts", searchQueries);
      })
      .catch((result) => {
        dispatch("setSnakBarMessage", {
          message: result.response.data.account_state.msg,
          random: new Date().getTime(),
        });
      });
  },
};

export default actions;
