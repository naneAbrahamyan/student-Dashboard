import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import "./mongo.js";

import handleError from "./common/error-handler.middleware.js";
import students from "./routes/students.route.js";

const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

// app.use(
//   jwtMiddleware.unless({
//     path: ["/users/login", "/users/", "/movies", "/genres", "/movies/filter", "/genres/", "/movies/add-api"],
//   })
// );

app.use("/students", students);
app.use(handleError);

app.get("/", (req, res) => {
  res.status(200).send("I work!");
});

export default app;
