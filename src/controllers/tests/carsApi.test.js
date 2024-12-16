import * as carsController from "../cars.js";
import * as database from "../../database.js";

jest.mock("../../database");

describe("carsController", () => {
  describe("GET - getCars", () => {
    let res;
    let next;

    beforeEach(() => {
      jest.clearAllMocks();
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it("should return all cars", async () => {
      const req = {};

      // Mock the dbQuerry function to return all cars
      database.dbQuerry.mockResolvedValue([
        {
          id: 1,
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
        {
          id: 2,
          brand: "Honda",
          model: "Civic",
          color: "Blue",
          year: 2019,
        },
      ]);

      await carsController.getCars(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 1,
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
        {
          id: 2,
          brand: "Honda",
          model: "Civic",
          color: "Blue",
          year: 2019,
        },
      ]);
    });
  });

  describe("GET - getCar", () => {
    let res;
    let next;

    beforeEach(() => {
      jest.clearAllMocks();
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it("should return a car", async () => {
      const req = { params: { id: 1 } };

      // Mock the dbQuerry function to return a car
      database.dbQuerry.mockResolvedValue([
        {
          id: 1,
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      ]);

      await carsController.getCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        color: "Red",
        year: 2020,
      });
    });

    it("should return 400 if ID is not a number", async () => {
      const req = { params: { id: "asd" } };

      await carsController.getCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID must be a number",
      });
    });

    it("should return 422 if ID is not a valid number", async () => {
      const req = { params: { id: -1 } };

      await carsController.getCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID must be a positive number",
      });
    });
  });

  describe("POST - createCar", () => {
    let res;
    let next;

    beforeEach(() => {
      jest.clearAllMocks();
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it("should create a car", async () => {
      const req = {
        body: {
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      database.dbRun.mockResolvedValue({ lastID: 1 });

      await carsController.createCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Car created" });
    });

    it("should return an error if some parameters are missing", async () => {
      const req = {
        body: {
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      await carsController.createCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });

    it("should return an error if year is not a number", async () => {
      const req = {
        body: {
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: "2020",
        },
      };

      await carsController.createCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Year must be a number",
      });
    });
  });

  describe("PUT - updateCar", () => {
    let res;
    let next;

    beforeEach(() => {
      jest.clearAllMocks();
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it("should update a car", async () => {
      const req = {
        params: { id: 1 },
        body: {
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      // Mock dbRun to simulate a successful update
      database.dbRun.mockResolvedValue({ changes: 1 });

      await carsController.updateCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Car updated" });
    });

    it("should return 400 if ID is not a number", async () => {
      const req = {
        params: { id: "asd" },
        body: {
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      await carsController.updateCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID must be a number",
      });
    });

    it("should return 422 if ID is not a valid number", async () => {
      const req = {
        params: { id: -1 },
        body: {
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      await carsController.updateCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID must be a positive number",
      });
    });

    it("should return 400 if some parameters are missing", async () => {
      const req = {
        params: { id: 1 },
        body: {
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      await carsController.updateCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "At least one field is required",
      });
    });

    it("should return 404 if car not found", async () => {
      const req = {
        params: { id: 1000 },
        body: {
          brand: "Toyota",
          model: "Corolla",
          color: "Red",
          year: 2020,
        },
      };

      database.dbRun.mockResolvedValue({ changes: 0 });

      await carsController.updateCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });
  });

  describe("DELETE - deleteCar", () => {
    let res;
    let next;

    beforeEach(() => {
      jest.clearAllMocks();
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it("should delete a car", async () => {
      const req = { params: { id: 1 } };

      database.dbRun.mockResolvedValue({ changes: 1 });

      await carsController.deleteCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Car deleted" });
    });

    it("should return 400 if ID is not a number", async () => {
      const req = { params: { id: "asd" } };

      await carsController.deleteCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID must be a number",
      });
    });

    it("should return 422 if ID is not a valid number", async () => {
      const req = { params: { id: -1 } };

      await carsController.deleteCar(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID must be a positive number",
      });
    });
  });
});
