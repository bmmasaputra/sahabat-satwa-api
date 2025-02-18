import prisma from "../prisma/prismaClient.js";
import { nanoid } from "nanoid";
import Joi from "joi";

const hewanSchema = Joi.object({
  nama_hewan: Joi.string().min(2).required(),
  tahun_lahir_hewan: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  jenis_hewan: Joi.string().min(2).required(),
  id_pawrent: Joi.string().required(),
});

const idSchema = Joi.string().required(); // Updated for parameter validation

async function addNewHewan(req, res) {
  const { error } = hewanSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const hewanId = nanoid();

  try {
    const result = await prisma.hewan.create({
      data: {
        id_hewan: hewanId,
        ...req.body,
      },
    });

    res.status(201).json({ success: true, message: "New hewan added", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function getHewanByPawrent(req, res) {
  const { error } = idSchema.validate(req.params.id); // Validate parameter
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.hewan.findMany({
      where: { id_pawrent: req.params.id }, // Access parameter
    });

    res.status(200).json({ success: true, message: "Hewan found", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function updateHewanData(req, res) {
  const updateSchema = Joi.object({
    id_hewan: Joi.string().required(),
    ...hewanSchema,
  });

  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.hewan.update({
      where: { id_hewan: req.body.id_hewan },
      data: {
        nama_hewan: req.body.nama_hewan,
        tahun_lahir_hewan: req.body.tahun_lahir_hewan,
        jenis_hewan: req.body.jenis_hewan,
        id_pawrent: req.body.id_pawrent,
      },
    });

    res.status(200).json({ success: true, message: "Hewan updated", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

async function deleteHewanById(req, res) {
  const { error } = idSchema.validate(req.body.id_hewan); // Validate body
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const result = await prisma.hewan.delete({ where: { id_hewan: req.body.id_hewan } });
    res.status(200).json({ success: true, message: "Hewan deleted", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
}

export { addNewHewan, getHewanByPawrent, updateHewanData, deleteHewanById };
