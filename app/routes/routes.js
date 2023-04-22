let express = require("express");
let router = express.Router();

const userRoutes = require("./router/userRoutes");
const adminRoutes = require("./router/adminRoutes");
const booksRoutes = require("./router/booksRoutes");
const issued_booksRoutes = require("./router/issued_booksRoutes");
const staffRoutes = require("./router/staffRoutes");

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/", booksRoutes);
router.use("/", issued_booksRoutes);
router.use("/", staffRoutes);

module.exports = router;
