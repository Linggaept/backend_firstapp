const express = require("express");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("nama").notEmpty().withMessage("Name is required"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateResetPassword = [
  body("email").isEmail().withMessage("Invalid email format"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  authController.register
);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  authController.login
);

router.post(
  "/reset-password",
  validateResetPassword,
  handleValidationErrors,
  authController.forgotPassword
);

module.exports = router;
