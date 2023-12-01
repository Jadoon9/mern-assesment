import { Router } from "express";
const taskRoutes = require("./task.routes");

const router = Router();

router.use("/task", taskRoutes);
export default router;
