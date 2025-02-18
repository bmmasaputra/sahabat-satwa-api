import express from "express";
import {
  addNewHewan,
  getHewanByPawrent,
  updateHewanData,
  deleteHewanById,
} from "../controller/hewanController.js";

const router = express.Router();

router.get("/hewan/pawrent/:id", getHewanByPawrent);
router.post("/hewan", addNewHewan);
router.put("/hewan", updateHewanData);
router.delete("/hewan", deleteHewanById);

export default router;
