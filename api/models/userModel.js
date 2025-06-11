const db = require("../config");

const User = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },
};

module.exports = User;
