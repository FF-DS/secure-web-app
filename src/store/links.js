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

  // ---------Award--------//

  award: "/award",
  awardCountry: "/award/countries",
  awardTitle: "/award/award-titles",
  awardAdd: "/award",
  awardEdit: "/award/{award_id}",
  awardDelete: "/award/{award_id}",
  awardFile: "/award/file/{award_id}",
  awardUpdateFile: "/award/file/{award_id}",

  awardUser: "/user-award",
  awardAddUser: "/user-award",
  awardEditUser: "/user-award/{award_id}",
  awardDeleteUser: "/user-award/{award_id}",
  awardFileUser: "/user-award/file/{award_id}",
  awardUpdateFileUser: "/user-award/file/{award_id}",

  awardAdminReview: "/user-award-review/{award_id}",
  awardReviewRequests: "/award-review-request",
  awardByUserId: "/awards-by-user-id",
  // -------Company----------//

  company: "/company",
  companyNames: "/company-names",
  companyCategory: "/company-categories",
  companyCountry: "/company-countries",
  companyAdd: "/company",
  companyEdit: "/company/{company_id}",
  companyDelete: "/company/{company_id}",
  companyFile: "/company/file/{company_id}",
  companyUpdateFile: "/company/file/{company_id}",
  companyUpdateLogo: "/company/logo/{company_id}",

  companyUser: "/user-company",
  companyAddUser: "/user-company",
  companyEditUser: "/user-company/{company_id}",
  companyDeleteUser: "/user-company/{company_id}",
  companyFileUser: "/user-company/file/{company_id}",
  companyUpdateFileUser: "/user-company/file/{company_id}",
  companyUpdateLogoUser: "/user-company/logo/{company_id}",

  companyAdminReview: "/user-company-review/{company_id}",
  companyReviewRequests: "/company-review-request",
  companyByUserId: "/companies-by-user-id",
  // --------Tender---------//

  tender: "/tender",
  tenderSector: "/tender/sectors",
  tenderType: "/tender/types",
  tenderCountry: "/tender/countries",
  tenderAdd: "/tender",
  tenderEdit: "/tender/{tender_id}",
  tenderDelete: "/tender/{tender_id}",
  tenderTitle: "/tender/tender-titles",
  tenderProcurment: "/tender/procurment-types",
  tenderFile: "/tender/file/{tender_id}",
  tenderUpdateFile: "/tender/file/{tender_id}",

  tenderUser: "/user-tender",
  tenderAddUser: "/user-tender",
  tenderEditUser: "/user-tender/{tender_id}",
  tenderDeleteUser: "/user-tender/{tender_id}",
  tenderFileUser: "/user-tender/file/{tender_id}",
  tenderUpdateFileUser: "/user-tender/file/{tender_id}",

  tenderAdminReview: "/user-tender-review/{tender_id}",
  tenderReviewRequests: "/tender-review-request",
  tendersByUserId: "/tenders-by-user-id",
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
