const express = require("express");
const chapterController = require("../controllers/chapterController");

const router = express.Router();

router.get("/chapters/:videoId", chapterController.getChaptersByVideoId);

module.exports = router;
