const AccessControl = require("accesscontrol");

const ac = new AccessControl();

module.exports = (function () {
  ac.grant("Admin")
    .updateAny("accounts")
    .deleteAny("compliant")
    .readAny("compliant")

    .grant("Basic")
    .createOwn("compliant")
    .updateOwn("compliant")
    .deleteOwn("compliant")
    .readOwn("compliants");

  return ac;
})();
