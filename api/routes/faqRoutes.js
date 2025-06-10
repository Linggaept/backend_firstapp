const express = require("express");
const faqController = require("../controllers/faqController");

const router = express.Router();

router.get("/faq", faqController.getAllFaq);

module.exports = router;
