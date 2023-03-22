const express = require("express");
const controller = require("../controller/task");
const Authentication = require("../helper/authentication");

const router = express.Router();

router.get("/", Authentication.VerifyToken, controller.GET);
router.post("/create", Authentication.VerifyToken, controller.CREATE);
router.put("/:id", Authentication.VerifyToken, controller.EDIT);
router.delete("/:id", Authentication.VerifyToken, controller.DELETE);

module.exports = router;
