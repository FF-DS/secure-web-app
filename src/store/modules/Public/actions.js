import API from "@/store/api";
import { getLink } from "@/store/links";

const actions = {
  setSearchParams({ commit }, flag) {
    commit("setSearchProgressValue", flag);
  },
  setCurrentSearchParams({ commit }, searchParams) {
    commit("setCurrentSearchParams", searchParams);
  },

  setAmountOfDataItem({ commit }, amount) {
    commit("setAmountOfDataItemValue", amount);
  },

  changeSidBarTab({ commit }, tabName) {
    commit("setSidBarTab", tabName);
  },
  setFabVisibility({ commit }, fabState) {
    commit("setFabState", fabState);
  },
  changeSearchTab({ commit }, searchTab) {
    commit("setSearchTab", searchTab);
  },
  changeViewOption({ commit }, option) {
    commit("setViewOption", option);
  },

  populateFirstPage({ commit, dispatch }) {
    const searchQueries = {
      query: true,
      queries: {
        size: 12,
      },
    };

    dispatch("setCompliantData", []);
    dispatch("searchCompliants", searchQueries);

    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("accessToken") != "null"
    ) {
      API.get(getLink("getUser", {}), null)
        .then((user) => {
          commit("setUser", user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};

export default actions;
