const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

router.post("/createContact", contactController.createContact);
router.post("/getContact", contactController.getContact);
router.post("/updateContact", contactController.updateContact);
router.post("/deleteContact", contactController.deleteContact);

module.exports = router;
