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
    API.put(
      getLink("compliantUserEdit", compliantObject.compliantParams),
      compliantObject.compliantData
    )
      .then((compliant) => {
        commit("setCompliantError", { type: "tenderEditSuccess" });
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
        errorObj["type"] = "tenderEditError";
        commit("setCompliantError", errorObj);
      });
  },

  deleteCompliant({ commit, dispatch, getters }, tenderParams) {
    let link =
      getters.getUserType == "Admin"
        ? "compliantDelete"
        : "compliantUserDelete";

    API.delete(getLink(link, tenderParams), null)
      .then((compliant) => {
        commit("setCompliantError", { type: "tenderDeleteSuccess" });
        compliant;

        if (tenderParams.myService) dispatch("myServiceTab");
        else if (tenderParams.adminService) dispatch("usersReviewRequests");
        else dispatch("populateFirstPage");
      })
      .catch((error) => {
        var errorObj = {};
        for (var key in error.response.data) {
          errorObj[key] = error.response.data[key].msg;
        }
        errorObj["type"] = "tenderDeleteError";
        commit("setCompliantError", errorObj);
      });
  },

  setCompliantErrorData({ commit }, tenderError) {
    commit("setCompliantError", tenderError);
  },

  addCompliantFile({ commit }, tenderData) {
    API.post(getLink("compliantUserFile", tenderData.params), tenderData.file)
      .then((file_address) => {
        var errorObj = { type: "tenderFileSuccess", file: file_address };
        commit("setCompliantError", errorObj);
        return file_address;
      })
      .catch((error) => {
        var errorObj = { type: "tenderFileError" };
        error;
        commit("setCompliantError", errorObj);
      });
  },

  updateCompliantFile({ commit }, tenderData) {
    API.put(getLink("compliantUserUpdateFile", tenderData.params), {
      file_links: tenderData.file,
    })
      .then(() => {
        var errorObj = { type: "tenderFileSuccess" };
        commit("setCompliantError", errorObj);
      })
      .catch((error) => {
        var errorObj = { type: "tenderFileError" };
        error;
        commit("setCompliantError", errorObj);
      });
  },
};

export default actions;
