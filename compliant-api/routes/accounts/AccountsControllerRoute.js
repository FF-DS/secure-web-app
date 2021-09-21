var express = require("express");
var router = express.Router();
const {auth,authorize} = require("../../middlewares/auth.js");

var accountsController = require("../../controllers/accounts/AccountsController");

router.get("/api/accounts", auth, authorize('updateAny','user'),  accountsController.get_users); 
router.post("/api/accounts-state", auth, authorize('updateAny','user'), accountsController.change_account_state);
router.delete("/api/accounts/:id", auth, authorize('updateAny','user'),  accountsController.delete_user);

module.exports = router;