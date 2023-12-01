import express from "express";
import usersRoutes from "./user.routes";

const router = express.Router();

router.use("/auth", usersRoutes);

export default router;
