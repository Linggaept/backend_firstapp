const db = require("../config");

const Video = {
  getAllVideos: (req, res) => {
    const sql = `
      SELECT 
        v.*,
        c.*
      FROM videos v
      LEFT JOIN chapter c ON v.video_id = c.video_id
    `;

    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err });

      const videoMap = {};

      results.forEach((row) => {
        if (!videoMap[row.video_id]) {
          videoMap[row.video_id] = {
            video_id: row.video_id,
            intro_link: row.intro_link,
            thumbnail: row.thumbnail,
            genre: row.genre,
            description: row.description,
            chapters: [],
            name: row.name,
          };
        }

        if (row.chapter_id) {
          videoMap[row.video_id].chapters.push({
            chapter_id: row.chapter_id,
            chapter_name: row.chapter_name,
            chapter_content: row.chapter_content,
            chapter_link: row.chapter_link,
            description: row.description,
            name: row.name,
          });
        }
      });

      const videos = Object.values(videoMap).map((video) => ({
        ...video,
        chapter_count: video.chapters.length,
      }));

      return res.json({ data: videos });
    });
  },
};

module.exports = Video;
