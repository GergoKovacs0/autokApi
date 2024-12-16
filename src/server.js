import express from "express";
import carRoutes from "./routes/cars";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/api/cars", carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
