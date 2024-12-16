import express from "express";
import * as carController from "../controllers/cars.js";
const router = express.Router();

router.get("/", carController.getCars);
router.get("/:id", carController.getCar);
router.post("/", carController.createCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

export default router;
