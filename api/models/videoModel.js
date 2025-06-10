const db = require("../config");

const Video = {
  getAll: (callback) => {
    db.query("SELECT * FROM videos", callback);
  },
};

module.exports = Video;
