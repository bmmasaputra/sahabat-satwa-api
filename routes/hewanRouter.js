import express from "express";
import {
  addNewHewan,
  getHewanByPawrent,
  updateHewanData,
  deletetHewanById,
} from "../controller/hewanController";

const router = express.Router();

router.get("/hewan", getHewanByPawrent);
router.post("/hewan", addNewHewan);
router.put("/hewan", updateHewanData);
router.delete("/hewan", deletetHewanById);

export default router;
