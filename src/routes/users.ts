import { Router } from "express";
import { createUser, loginUser } from "../services/users-service";
import { validateLogin, validateUser } from "../middleware/joi";
const router = Router();



router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const jwt =  await loginUser(req.body);
    res.send(jwt);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateUser, async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    const { password, ...saved } = result.toJSON();
    //return all data but saved!
    res.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

export default router;
