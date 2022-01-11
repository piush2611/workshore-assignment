import { body, validationResult } from "express-validator";
import express from "express";
import { error } from "../utils/api-responses";

const signUpvalidationRules = () => {
  return [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isLength({ min: 8 }).withMessage("Password is too short"),
    body("name")
      .isLength({ min: 4, max: 50 })
      .withMessage("Name is too short / long"),
  ];
};

const validateSignUp = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((err) => {
      return {
        msg: err.msg,
      };
    });

    return res.status(400).json(error("Invalid email / password", errors, 400));
  }

  next();
};

export { signUpvalidationRules, validateSignUp };
