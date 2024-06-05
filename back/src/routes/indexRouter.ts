import { Router } from "express";
import turnRouter from "./turnRouter";
import { usersRouter } from "./usersRouter";


const router = Router();

router.use("/users", usersRouter)
router.use("/", turnRouter)


export default router;