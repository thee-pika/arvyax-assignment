import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { userRouter } from "./routes/User";
import { SessionRouter } from "./routes/Session";
import { Express } from "express";
config();

const app: Express = express();
const PORT = process.env.PORT || 5000; 
app.use(express.json());

app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/session", SessionRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});


