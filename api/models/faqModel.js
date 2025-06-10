const db = require("../config");

const Faq = {
  getAll: (callback) => {
    db.query("SELECT * FROM faq", callback);
  },
};

module.exports = Faq;
