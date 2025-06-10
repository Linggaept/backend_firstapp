const db = require("../config");

const User = {
  findByKodeAgen: (kodeAgen, callback) => {
    db.query("SELECT * FROM users WHERE kode_agen = ?", [kodeAgen], callback);
  },
};

module.exports = User;
