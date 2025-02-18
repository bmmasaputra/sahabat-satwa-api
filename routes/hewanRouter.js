import express from "express";
import {
  addNewHewan,
  getHewanByPawrent,
  updateHewanData,
  deleteHewanById,
} from "../controller/hewanController.js";

const router = express.Router();

router.get("/hewan", getHewanByPawrent);
router.post("/hewan", addNewHewan);
router.put("/hewan", updateHewanData);
router.delete("/hewan", deleteHewanById);

export default router;
