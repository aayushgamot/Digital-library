const express = require("express");
const router = express();
const userController = require("../../controller/userController");
const userValidation = require("../../validation/uservalidation");
const passport = require("passport");
const { validation } = require("../../middleWares/validator");

// Registration;
router.post(
  "/api/user/user-register",
  // passport.authenticate("jwt", { session: false }),
  validation.body(userValidation.register),
  userController.register
);

// get api for fetching user data
router.post(
  "/find-allusers",
  // passport.authenticate("jwt", { session: false }),finduserValidation
  validation.body(userValidation.finduserValidation),

  userController.finduser
);

// update user's  detail api
router.put(
  "/update-user/:id",
  // passport.authenticate("jwt", { session: false }),
  validation.body(userValidation.updateuser),
  userController.updateuser
);

// delete data
router.delete(
  "/delete-user/:id",
  // passport.authenticate("jwt", { session: false }),
  userController.deleteuser
);

module.exports = router;
