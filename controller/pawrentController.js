import prisma from "../prisma/prismaClient.js";
import { nanoid } from "nanoid";
import Joi from "joi";

const pawrentSchema = Joi.object({
  nama_lengkap_pawrent: Joi.string().min(3).required(),
  no_telepon_pawrent: Joi.string().pattern(/^\d+$/).min(10).max(15).required(),
});

const phoneSchema = Joi.string().pattern(/^\d+$/).min(10).max(15).required();

const idSchema = Joi.string().required();

const updateSchema = Joi.object({
  id_pawrent: Joi.string().required(),
  nama_lengkap_pawrent: Joi.string().min(3).required(),
  no_telepon_pawrent: Joi.string().pattern(/^\d+$/).min(10).max(15).required(),
});

async function addNewPawrent(req, res) {
  const { error } = pawrentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const pawrentId = nanoid();

  try {
    const result = await prisma.pawrent.create({
      data: {
        id_pawrent: pawrentId,
        nama_lengkap_pawrent: req.body.nama_lengkap_pawrent,
        no_telepon_pawrent: req.body.no_telepon_pawrent,
      },
    });

    res.status(201).json({
      success: true,
      message: "New pawrent added",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function getPawrentByPhoneNumb(req, res) {
  const { error } = phoneSchema.validate(req.params.no);

  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.pawrent.findFirst({
      where: { no_telepon_pawrent: req.params.no },
    });

    if (!result) {
      return res.status(404).json({ success: false, message: "Pawrent not found" });
    }

    res.status(200).json({ success: true, message: "Pawrent found", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function getPawrentById(req, res) {
  const { error } = idSchema.validate(req.params.id);

  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.pawrent.findFirst({
      where: { id_pawrent: req.params.id },
    });

    if (!result) {
      return res.status(404).json({ success: false, message: "Pawrent not found" });
    }

    res.status(200).json({ success: true, message: "Pawrent found", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function updatePawrentData(req, res) {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.pawrent.update({
      where: { id_pawrent: req.body.id_pawrent },
      data: {
        nama_lengkap_pawrent: req.body.nama_lengkap_pawrent,
        no_telepon_pawrent: req.body.no_telepon_pawrent,
      },
    });

    res.status(200).json({ success: true, message: "Pawrent updated", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function deletePawrentById(req, res) {
  const { error } = idSchema.validate(req.body.id_pawrent);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.pawrent.delete({ where: { id_pawrent: req.body.id_pawrent } });
    res.status(200).json({ success: true, message: "Pawrent deleted", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

export {
  addNewPawrent,
  getPawrentByPhoneNumb,
  getPawrentById,
  updatePawrentData,
  deletePawrentById,
};
