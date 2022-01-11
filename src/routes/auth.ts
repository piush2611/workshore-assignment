import express from "express";
import bcrypt from "bcryptjs";
import { signUpvalidationRules, validateSignUp } from "../validations/singup";
import { signInvalidationRules, validateSignIn } from "../validations/singin";
import { getData, setData } from "../utils/data";
import { success, error } from "../utils/api-responses";
import JWT from "jsonwebtoken";

const router = express.Router();

router.post(
  "/signup",
  signUpvalidationRules(),
  validateSignUp,
  async (req: express.Request, res: express.Response) => {
    try {
      const filename = "../usersData.json";
      const { email, password, name } = req.body;
      let users = getData("../usersData.json")?.users;

      if (users && users[email]) {
        return res
          .status(400)
          .json(error("User with this email already exists", [], 400));
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email, name, password: hashedPassword };

      users = { ...users, [email]: newUser };

      setData(
        filename,
        JSON.stringify({
          users,
        })
      );

      const token = JWT.sign({ email }, process.env.PRIVATE_KEY as string, {
        expiresIn: 3600,
      });

      res
        .status(201)
        .json(success("user successfully signed up", { token }, 201));
    } catch (err) {
      res.status(500).json(error("Intenal server error", []));
    }
  }
);

router.post(
  "/signin",
  signInvalidationRules(),
  validateSignIn,
  async (req: express.Request, res: express.Response) => {
    try {
      const filename = "../usersData.json";
      const { email, password } = req.body;
      const users = getData(filename)?.users;

      if (users && !users[email]) {
        return res.status(400).json(error("User doesnt exits", [], 400));
      }

      const user = users[email];

      const isPasswordSame = await bcrypt.compare(password, user.password);

      if (!isPasswordSame) {
        return res
          .status(400)
          .json(error("Email / password is incorrect", [], 400));
      }

      const token = JWT.sign({ email }, process.env.PRIVATE_KEY as string, {
        expiresIn: 3600,
      });

      res
        .status(200)
        .json(success("user successfully sign in", { token }, 200));
    } catch (err) {
      res.status(500).json(error("Intenal server error", []));
    }
  }
);

export default router;
