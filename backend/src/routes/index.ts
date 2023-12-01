import express from "express";
import { authToken } from "../middleware";
import authorizedRoutes from "./authorized";
import unAuthorizedRoutes from "./unauthorized";
const router = express.Router();

router.use(unAuthorizedRoutes);
router.use(authToken);
router.use(authorizedRoutes);

export default router;
