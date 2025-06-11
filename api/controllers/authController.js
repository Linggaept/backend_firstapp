const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const db = require("../config");
const nodemailer = require("nodemailer");
require("dotenv").config();

const authController = {
  register: (req, res) => {
    const { email, password, nama } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password" });
      db.query(
        "INSERT INTO users (email, password, nama) VALUES (?, ?, ?)",
        [email, hashedPassword, nama],
        (err, result) => {
          if (err)
            return res.status(500).json( err);
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, results) => {
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = results[0];
      
      // Direct password comparison
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.kode_agen, email: user.email },
        "secretkey",
        { expiresIn: "1h" }
      );
      
      res.json({ token });
    });
  },

  forgotPassword: (req, res) => {
    const { email } = req.body;

    User.findByEmail(email, (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(200)
          .json({ message: "Silahkan check email kamu!" });
      }

      const user = results[0];

      const resetLink = `${process.env.APP_URL}/reset-password?email=${user.email}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        html: `<p>Klik link berikut untuk reset password: <a href="${resetLink}">${resetLink}</a></p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        console.log(err);
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).json({ message: "Gagal mengirim email" });
        }
        res
          .status(200)
          .json({ message: "Jika email terdaftar, link reset telah dikirim." });
      });
    });
  },
};

module.exports = authController;
