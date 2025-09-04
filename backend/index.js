import "dotenv/config.js";
import express from "express";
import cors from "cors";
import schoolRouter from "./routes/schoolRoutes.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/school", schoolRouter);

app.listen(port || 5000, () => {
  console.log(`Server is running on port ${port}`);
});
