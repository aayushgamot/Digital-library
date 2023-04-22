const express = require("express");
const router = express();
const adminController = require("../../controller/admincontroller");
const adminValidation = require("../../validation/adminvalidation");
const { validation } = require("../../middleWares/validator");

//login
router.post(
  "/api/user/admin-login",
  validation.body(adminValidation.login),
  adminController.login
);

module.exports = router;
