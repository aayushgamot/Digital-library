const express = require("express");
const router = express();
const staffcontroller = require("../../controller/staffcontroller");
const staffvalidation = require("../../validation/staffvalidation");
const passport = require("passport");
const { validation } = require("../../middleWares/validator");

// Registration;
router.post(
  "/staffregister",
  // passport.authenticate("jwt", { session: false }),
  validation.body(staffvalidation.addstaff),
  staffcontroller.staffregister
);

router.post(
  "/find-allstaff",
  // passport.authenticate("jwt", { session: false }),
  validation.body(staffvalidation.findstaffValidation),
  staffcontroller.findstaff
);

router.put(
  "/update-staff/:id",
  // passport.authenticate("jwt", { session: false }),
  validation.body(staffvalidation.updatestaff),
  staffcontroller.updatestaff
);

router.delete(
  "/delete-staff/:id",
  // passport.authenticate("jwt", { session: false }),
  staffcontroller.deletestaff
);

module.exports = router;
