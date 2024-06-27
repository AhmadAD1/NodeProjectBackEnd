import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import { validateCard } from "../middleware/joi";
import { cardService } from "../services/card-service";

const router = Router();

router.post("/", validateToken, validateCard, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    //TODO: move the if to the service:
    if (req.payload.isBusiness) {
      const result = await cardService.createCard(req.body, userId);
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: "Only business users may create cards" });
    }
  } catch (e) {
    next(e);
  }
});

export { router as cardRouter };
