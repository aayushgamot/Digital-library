const express = require("express");
const router = express();
const issued_bookscontroller = require("../../controller/issued_bookscontroller");
const issued_booksvalidation = require("../../validation/issued_booksvalidation");
const passport = require("passport");
const { validation } = require("../../middleWares/validator");

router.post(
  "/issued-books-register",
  // passport.authenticate("jwt", { session: false }),
  validation.body(issued_booksvalidation.issued_user_register),
  issued_bookscontroller.issued_bookAdd
);

// show books details
router.post(
  "/find-issued-books",
  // passport.authenticate("jwt", { session: false }),findIssuedBookValidation
  validation.body(issued_booksvalidation.findIssuedBookValidation),

  issued_bookscontroller.issued_book
);

// update api
router.put(
  "/update-issued-user/:id",
  // passport.authenticate("jwt", { session: false }),
  validation.body(issued_booksvalidation.updateuser),
  issued_bookscontroller.update_user
);

// delete data
router.delete(
  "/delete-issued-user/:id",
  // passport.authenticate("jwt", { session: false }),
  issued_bookscontroller.delete_issued_user
);

// penalty api for issued books
router.get("/penalty-issued-books", issued_bookscontroller.viewpanalty);

module.exports = router;
