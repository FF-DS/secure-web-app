const SiteLinks = {
  compliant: "/compliant",
  compliantTitle: "/compliant/title",
  compliantId: "/compliant/{compliant_id}",
  compliantByUserId: "/compliant/by-user",
  compliantDelete: "/compliant/{compliant_id}",

  compliantUser: "/compliant-user",
  compliantUserId: "/compliant-user/{compliant_id}",
  compliantUserPost: "/compliant-user",
  compliantUserEdit: "/compliant-user/{compliant_id}",
  compliantUserDelete: "/compliant-user/{compliant_id}",
  compliantUserFile: "/compliant-user/file/{compliant_id}",
  compliantUserUpdateFile: "/compliant-user/file/{compliant_id}",

  // -------User----------//

  getAccounts: "/accounts",
  changeAccountState: "/accounts-state/{user_id}",
  deleteAccount: "/accounts/{user_id}",

  registerUser: "/auth/register",
  loginUser: "/auth/login",
  logout: "/auth/logout",
  getUser: "/auth/user",
  updateUser: "/user",

  getNotification: "/user/notification",
  updateNotification: "/user/notification",

  changeProfile: "/user/profile",
  changePassword: "/auth/change-password",
  // -------Public----------//

  verifyUser: "/verify-account",
  sendResetLink: "/send-reset-link",
  resetPassword: "/reset-account",
  getcsrftoken: "/getcsrftoken",
};

const encodeURL = (link, req) => {
  if (req.param) {
    for (let key in req.params) {
      if (req.params[key]) link = link.replaceAll(`{${key}}`, req.params[key]);
    }
  }

  if (req.query) {
    let queryStr = "";
    for (let key in req.queries) {
      if (req.queries[key]) queryStr += `&${key}=${req.queries[key]}`;
    }
    queryStr = queryStr.replace("&", "?");
    link += queryStr;
  }

  return link;
};

exports.getLink = (key, req = null) => {
  return encodeURL(SiteLinks[key], req);
};
