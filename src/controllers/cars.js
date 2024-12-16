import { dbRun, dbQuerry } from "../database.js";
import isIdValid from "./idValidation.js";

export const getCar = async (req, res, next) => {
  const id = req.params.id;
  const idValidation = isIdValid(id);
  if (!idValidation.validID) {
    return res
      .status(idValidation.status)
      .json({ message: idValidation.message });
  }
  const query = "SELECT * FROM cars WHERE id = ?";
  try {
    const car = await dbQuerry(query, [id]);
    if (car.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(car[0]);
  } catch (error) {
    next(error);
  }
};

export const getCars = async (req, res, next) => {
  const query = "SELECT * FROM cars";
  try {
    const cars = await dbQuerry(query);
    return res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req, res, next) => {
  const { brand, model, color, year } = req.body;
  if (!brand || !model || !color || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (typeof year !== "number") {
    return res.status(400).json({ message: "Year must be a number" });
  }
  if (year < 0) {
    return res.status(422).json({ message: "Year must be a positive number" });
  }
  const query =
    "INSERT INTO cars (brand, model, color, year) VALUES (?, ?, ?, ?)";
  try {
    await dbRun(query, [brand, model, color, year]);
    return res.status(201).json({ message: "Car created" });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  const id = req.params.id;
  const idValidation = isIdValid(id);
  if (!idValidation.validID) {
    return res
      .status(idValidation.status)
      .json({ message: idValidation.message });
  }

  const { brand, model, color, year } = req.body;
  if (!brand && !model && !color && !year) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  if (typeof year !== "number") {
    return res.status(400).json({ message: "Year must be a number" });
  }

  if (year < 0) {
    return res.status(422).json({ message: "Year must be a positive number" });
  }

  const query =
    "UPDATE cars SET brand = ?, model = ?, color = ?, year = ? WHERE id = ?";
  try {
    await dbRun(query, [brand, model, color, year, id]);
    return res.status(200).json({ message: "Car updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  const id = req.params.id;
  const idValidation = isIdValid(id);
  if (!idValidation.validID) {
    return res
      .status(idValidation.status)
      .json({ message: idValidation.message });
  }

  const query = "DELETE FROM cars WHERE id = ?";
  try {
    await dbRun(query, [id]);
    return res.status(200).json({ message: "Car deleted" });
  } catch (error) {
    next(error);
  }
};
