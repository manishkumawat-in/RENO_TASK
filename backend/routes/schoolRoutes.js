import { Router } from "express";
import upload from "../middleware/multer.js";
import { addSchool, getSchools } from "../controllers/schoolController.js";

const schoolRouter = Router();

schoolRouter.get("/get_all", getSchools);

schoolRouter.post("/add", upload.single("image"), addSchool);

export default schoolRouter;
