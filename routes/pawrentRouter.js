import express from "express";
import {
  addNewPawrent,
  getPawrentById,
  updatePawrentData,
  deletePawrentById,
} from "../controller/pawrentController.js";

const router = express.Router();

router.get("/pawrent", getPawrentById);
router.post("/pawrent", addNewPawrent);
router.put("/pawrent", updatePawrentData);
router.delete("/pawrent", deletePawrentById);

export default router;
