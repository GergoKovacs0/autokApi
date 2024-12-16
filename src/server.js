import express from "express";
import cors from "cors";
import carRoutes from "./routes/cars.js";
import { initializeDB } from "./database.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/cars", carRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const startServer = async (port) => {
  try {
    await initializeDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer(PORT);
