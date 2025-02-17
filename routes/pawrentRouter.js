import express from "express";
import {
  addNewPawrent,
  getPawrentById,
  updatePawrentData,
  deletetPawrentById,
} from "../controller/pawrentController";

const router = express.Router();

router.get("/pawrent", getPawrentById);
router.post("/pawrent", addNewPawrent);
router.put("/pawrent", updatePawrentData);
router.delete("/pawrent", deletetPawrentById);

export default router;
