const db = require("../config");

const Chapter = {
  getByVideoId: (videoId, callback) => {
    db.query("SELECT * FROM chapter WHERE video_id = ?", [videoId], callback);
  },
};

module.exports = Chapter;
