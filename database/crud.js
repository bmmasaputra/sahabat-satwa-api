import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

async function addDokterData() {
  const insertNewDokter = await prisma.dokter.create({
    data: {
      id_dokter: nanoid().toString(),
      nama_lengkap_dokter: "Dr. Gita Allamanda Lestari",
      no_telepon_dokter: "0840484837837",
      tgl_mulai_kerja: new Date().toISOString(),
    },
  });

  return insertNewDokter;
}

async function getDokterData() {
  const result = await prisma.dokter.findMany();

  return result;
}

async function updateDokterData() {
  const update = await prisma.dokter.update({
    where: {
      id_dokter: "MTJIh5MJTMLraK5BwKsf4",
    },
    data: {
      nama_lengkap_dokter: "Dr. Irma Kristiani Putri",
    },
  });

  return update;
}

async function deleteDokterData() {
  const deleteData = await prisma.dokter.delete({
    where: {
      id_dokter: "rMJnp1Xo0-8hHHfqOz_VD",
    },
  });

  return deleteData;
}

const response = await addDokterData();
// const update = await updateDokterData();
//const deleteDokter = await deleteDokterData();

// console.log(deleteDokter);
