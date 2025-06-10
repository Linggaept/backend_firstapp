const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const faqRoutes = require("./routes/faqRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("./config");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api", videoRoutes);
app.use("/api", faqRoutes);
app.use("/api", chapterRoutes);

app.use("/test", (req, res) => {
  return res.json({ test: "success" });
});

app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "reset-password.html"));
});

app.post("/reset-password/:email", (req, res) => {
  const email = req.params.email;
  const { newPassword } = req.body;

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send("Gagal mengenkripsi password");

    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, result) => {
        if (err) return res.status(500).send("Gagal update password");

        res.send("Password berhasil direset!");
      }
    );
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      statusCode: 404,
      stack: "http://localhost:3000/",
    },
    message: "Alamat yang anda akses tidak ditemukan!",
  });
});


// uncoment jika mau local
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
