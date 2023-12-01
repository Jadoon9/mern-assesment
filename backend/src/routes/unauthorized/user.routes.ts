import express from "express";
import { User } from "../../controllers";
import { validationCatches, catchAsyncErrors } from "../../utils/tryCatch";
import { signUpValidation } from "../../utils/validation";

const router = express.Router({ mergeParams: true });

router.post(
  "/signUp",
  validationCatches(signUpValidation),
  catchAsyncErrors(User.signUp)
);
router.post("/login", User.login);

export default router;
