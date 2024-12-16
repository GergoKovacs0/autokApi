import express from "express";
import * as carController from "../controllers/carController";
const router = express.Router();

router.get("/", carController.getAllCars);
router.get("/:id", carController.getCar);
router.post("/", carController.createCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

export default router;
