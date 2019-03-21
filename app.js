import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import logger from "morgan";


import authRouter from "./server/routes/auth";
import messageRouter from "./server/routes/messages";
import userRouter from "./server/routes/users";
import contactRouter from "./server/routes/contacts";
import groupRouter from "./server/routes/groups";

import Db from "./server/db";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(logger("dev"));

app.get("/", (req, res) => res.json({ message: "Hello world" }));

// Routers middleware config
app.use("/api/v2/auth", authRouter);
app.use("/api/v2/messages", messageRouter);
app.use("/api/v2/users", userRouter);
app.use("/api/v2/contacts", contactRouter);
app.use("/api/v2/groups", groupRouter);

app.get("*", (req, res) => res.status(404).json({ status: 404, error: "404 not found" }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    /* eslint-disable-next-line */
  console.log(`Server is running on port ${PORT}`);
});


export default app;
