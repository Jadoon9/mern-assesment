import express from "express";
const router = express.Router({ mergeParams: true });
import { Task } from "../../controllers";
import { validationCatches, catchAsyncErrors } from "../../utils/tryCatch";
import { taskValidation } from "../../utils/validation";

router.get("/getAllTask", Task.getAllTask);
router.get("/getById/:id", Task.getTaskById);
router.post(
  "/add",
  validationCatches(taskValidation),
  catchAsyncErrors(Task.addTask)
);
router.patch(
  "/update/:id",
  validationCatches(taskValidation),
  catchAsyncErrors(Task.updateTask)
);
router.delete("/delete/:id", catchAsyncErrors(Task.deleteTask));

module.exports = router;
