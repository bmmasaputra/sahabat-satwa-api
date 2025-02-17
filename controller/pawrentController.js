import prisma from "../prisma/prismaClient.js";
import { nanoid } from "nanoid";

async function addNewPawrent(req, res) {
  const { nama_lengkap_pawrent, no_telepon_pawrent } = req.body;

  if (!nama_lengkap_pawrent || !no_telepon_pawrent) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const pawrentId = nanoid();

  try {
    const result = await prisma.pawrent.create({
      data: {
        id_pawrent: pawrentId,
        nama_lengkap_pawrent: nama_lengkap_pawrent,
        no_telepon_pawrent: no_telepon_pawrent,
      },
    });

    res.status(201).json({
      success: true,
      message: "New pawrent added",
      data: pawrentId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getPawrentById(req, res) {
  const pawrentId = req.body.id_pawrent;

  if (!pawrentId) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const result = await prisma.pawrent.findFirst({
      where: {
        id_pawrent: pawrentId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pawrent found",
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

async function updatePawrentData(req, res) {
  const { id_pawrent, nama_lengkap_pawrent, no_telepon_pawrent } = req.body;

  if (!id_pawrent || !nama_lengkap_pawrent || !no_telepon_pawrent) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const result = await prisma.pawrent.update({
      where: {
        id_pawrent: id_pawrent,
      },
      data: {
        nama_lengkap_pawrent: nama_lengkap_pawrent,
        no_telepon_pawrent: no_telepon_pawrent,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pawrent updated",
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

async function deletetPawrentById(req, res) {
  const pawrentId = req.body.id_pawrent;

  if (!pawrentId) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const result = await prisma.pawrent.delete({
      where: {
        id_pawrent: pawrentId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pawrent deleted",
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

export { addNewPawrent, getPawrentById, updatePawrentData, deletetPawrentById };
