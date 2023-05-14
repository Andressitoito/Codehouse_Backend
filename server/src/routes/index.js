import { Router } from "express";
import api_router from "./api/index.js";
import views from './views/index.js'

const router = Router();

router.use("/api", api_router);
router.use("/", views);

export default router;
