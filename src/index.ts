import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth";

const app = express();

dotenv.config();
app.use(bodyParser.json());

app.use("/auth", AuthRoutes);

app.listen(8080, () => {
  console.log("listening on PORT 8080 updated");
});
