import express from "express";
import cors from "cors";
import eventsRouter from "./routes/event";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "https://mellifluous-faun-0202a8.netlify.app"
}));
app.use(express.json());
app.use("/events", eventsRouter);

app.get("/", (_req, res) => {
  res.send("API is running.");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
