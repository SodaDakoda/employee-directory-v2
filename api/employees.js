import express from "express";
import { getEmployees, getEmployeeById, addEmployee } from "../db/employees.js";

const router = express.Router();

router.get("/random", (req, res) => {
  const employees = getEmployees();
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/", (req, res) => {
  res.send(getEmployees());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = getEmployeeById(id);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(employee);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).send("Request must include a valid 'name' field.");
  }

  const newEmployee = addEmployee(name);
  res.status(201).send(newEmployee);
});

export default router;
