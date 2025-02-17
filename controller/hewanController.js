import prisma from "../prisma/prismaClient.js";
import { nanoid } from "nanoid";

async function addNewHewan(req, res) {
  const { nama_hewan, tahun_lahir_hewan, jenis_hewan, id_pawrent } = req.body;

  if (!nama_hewan || !tahun_lahir_hewan || !jenis_hewan || !id_pawrent) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const hewanId = nanoid();

  try {
    const result = await prisma.hewan.create({
      data: {
        id_hewan: hewanId,
        nama_hewan,
        tahun_lahir_hewan,
        jenis_hewan,
        id_pawrent,
      },
    });

    res.status(201).json({
      success: true,
      message: "New hewan added",
      data: hewanId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getHewanByPawrent(req, res) {
  const pawrentId = req.body.id_pawrent;

  if (!pawrentId) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const result = await prisma.hewan.findMany({
      where: {
        pawrent: {
          id_pawrent: pawrentId,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Hewan found",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function updateHewanData(req, res) {
  const { id_hewan, nama_hewan, tahun_lahir_hewan, jenis_hewan, id_pawrent } = req.body;

  if (!id_hewan || !nama_hewan || !tahun_lahir_hewan || !jenis_hewan || !id_pawrent) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const result = await prisma.hewan.update({
      where: {
        id_hewan: id_hewan,
      },
      data: {
        nama_hewan,
        tahun_lahir_hewan,
        jenis_hewan,
        id_pawrent,
      },
    });

    res.status(200).json({
      success: true,
      message: "Hewan updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function deletetHewanById(req, res) {
  const id_hewan = req.body.id_hewan;

  if (!id_hewan) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const result = await prisma.hewan.delete({
      where: {
        id_hewan,
      },
    });

    res.status(200).json({
      success: true,
      message: "Hewan deleted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export { addNewHewan, getHewanByPawrent, updateHewanData, deletetHewanById };
