import express from "express";
import {
  addNewPawrent,
  getPawrentById,
  updatePawrentData,
  deletePawrentById,
  getPawrentByPhoneNumb,
} from "../controller/pawrentController.js";

const router = express.Router();

router.get("/pawrent/:id", getPawrentById);
router.get("/pawrent/login/:no", getPawrentByPhoneNumb);
router.post("/pawrent", addNewPawrent);
router.put("/pawrent", updatePawrentData);
router.delete("/pawrent", deletePawrentById);

export default router;
