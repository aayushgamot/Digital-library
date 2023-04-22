const express = require("express");
const router = express();
const { upload } = require("../../services/multer");
const bookscontroller = require("../../controller/bookscontroller");
const booksvalidation = require("../../validation/booksvalidation");
const passport = require("passport");
const { validation } = require("../../middleWares/validator");

// Registration of books api
router.post(
  "/books-register",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  validation.body(booksvalidation.Add_books),
  bookscontroller.Add_books
);

// show books details
router.post(
  "/find-books",
  // passport.authenticate("jwt", { session: false }),`
  bookscontroller.find_books
);

router.post(
  "/find-Books_For_update",
  // passport.authenticate("jwt", { session: false }),
  bookscontroller.findUserUpdate
);

// update the books details
router.put(
  "/update-books/:id",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  validation.body(booksvalidation.update_books),
  bookscontroller.update_books
);

// delete books details
router.delete(
  "/delete-books/:id",
  // passport.authenticate("jwt", { session: false }),
  bookscontroller.delete_books
);

// search api for books
router.post(
  "/search_books",
  // passport.authenticate("jwt", { session: false }),
  validation.body(booksvalidation.search_books),
  bookscontroller.searchBooks
);

module.exports = router;
