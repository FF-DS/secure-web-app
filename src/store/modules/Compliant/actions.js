import API from "@/store/api";
import { getLink } from "@/store/links";

const actions = {
  setCompliantFileDialogState({ commit }, flag) {
    commit("setCompliantFileDialogStateFlag", flag);
  },
  setCompliantEditDialogState({ commit }, flag) {
    commit("setCompliantEditDialogFlag", flag);
  },
  setCompliantData({ commit }, compliantData) {
    commit("setCompliantData", compliantData);
  },

  searchCompliants({ commit, getters }, params) {
    params.queries.size = getters.getAmountOfDataItem;

    let link = getters.getUserType == "Admin" ? "compliant" : "compliantUser";

    API.get(getLink(link, params), null)
      .then((compliantData) => {
        commit("setCompliantData", compliantData.data);
        commit("setCompliantPageInfo", compliantData);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  publishedUserCompliants({ commit, getters }, params) {
    params.queries.size = getters.getAmountOfDataItem;

    API.get(getLink("compliantByUserId", params), null)
      .then((compliantData) => {
        commit("setUserPublishedCompliant", compliantData);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addCompliant({ commit, dispatch }, compliantObject) {
    compliantObject._csrf = localStorage.getItem("csrfToken");

    API.post(getLink("compliantUserPost", {}), compliantObject)
      .then((compliant) => {
        commit("setCompliantError", { type: "compliantAddSuccess" });
        compliant;

        if (compliantObject.myService) dispatch("myServiceTab");
        else dispatch("populateFirstPage");
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "compliantAddError";
        commit("setCompliantError", errorObj);
      });
  },

  updateCompliant({ commit, dispatch }, compliantObject) {
    compliantObject.compliantData._csrf = localStorage.getItem("csrfToken");

    API.put(
      getLink("compliantUserEdit", compliantObject.compliantParams),
      compliantObject.compliantData
    )
      .then((compliant) => {
        commit("setCompliantError", { type: "compliantEditSuccess" });
        compliant;

        if (compliantObject.myService) dispatch("myServiceTab");
        else if (compliantObject.adminService) dispatch("usersReviewRequests");
        else dispatch("populateFirstPage");
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "compliantEditError";
        commit("setCompliantError", errorObj);
      });
  },

  deleteCompliant({ commit, dispatch, getters }, compliantParams) {
    let link =
      getters.getUserType == "Admin"
        ? "compliantDelete"
        : "compliantUserDelete";

    API.delete(getLink(link, compliantParams), {
      _csrf: localStorage.getItem("csrfToken"),
    })
      .then((compliant) => {
        commit("setCompliantError", { type: "compliantDeleteSuccess" });
        compliant;

        if (compliantParams.myService) dispatch("myServiceTab");
        else if (compliantParams.adminService) dispatch("usersReviewRequests");
        else dispatch("populateFirstPage");
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "compliantDeleteError";
        commit("setCompliantError", errorObj);
      });
  },

  setCompliantErrorData({ commit }, compliantError) {
    commit("setCompliantError", compliantError);
  },

  addCompliantFile({ commit }, compliantData) {
    // compliantData.file._csrf = localStorage.getItem("csrfToken");

    API.post(
      getLink("compliantUserFile", compliantData.params),
      compliantData.file
    )
      .then((file_address) => {
        var errorObj = { type: "compliantFileSuccess", file: file_address };
        commit("setCompliantError", errorObj);
        return file_address;
      })
      .catch((error) => {
        var errorObj = { type: "compliantFileError" };
        error;
        commit("setCompliantError", errorObj);
      });
  },

  updateCompliantFile({ commit }, compliantData) {
    API.put(getLink("compliantUserUpdateFile", compliantData.params), {
      file_links: compliantData.file,
      _csrf: localStorage.getItem("csrfToken"),
    })
      .then(() => {
        var errorObj = { type: "compliantFileSuccess" };
        commit("setCompliantError", errorObj);
      })
      .catch((error) => {
        var errorObj = { type: "compliantFileError" };
        error;
        commit("setCompliantError", errorObj);
      });
  },
};

export default actions;
