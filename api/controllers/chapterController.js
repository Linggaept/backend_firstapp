const Chapter = require("../models/chapterModel");

const chapterController = {
  getChaptersByVideoId: (req, res) => {
    const { videoId } = req.params;
    Chapter.getByVideoId(videoId, (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error fetching chapters" });
      res.json({
        data: results,
      });
    });
  },
};

module.exports = chapterController;
