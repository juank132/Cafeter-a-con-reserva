import { Router } from "express";
import { createTurn, getTurns, statusTurn, getTurnData } from "../controllers/turnController";

const turnRouter = Router();

turnRouter.get("/appointments", getTurns)

turnRouter.get("/appointment/:id", getTurnData)

turnRouter.post("/appointment/schedule", createTurn)

turnRouter.put("/appointment/cancel/:id", statusTurn)

export default turnRouter