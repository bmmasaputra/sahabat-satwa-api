import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const klinikId = [nanoid().toString(), nanoid().toString()];
const pawrentId = nanoid().toString();
const obatId = [nanoid().toString(), nanoid().toString()];
const hewanId = nanoid();
const kunjunganId = nanoid();

async function addDokterData() {
  const insertNewDokter = await prisma.dokter.create({
    data: {
      id_dokter: nanoid().toString(),
      nama_lengkap_dokter: "Dr. Putri Pradiastiwi",
      no_telepon_dokter: "0840484837837",
      tgl_mulai_kerja: new Date().toISOString(),
    },
  });

  return insertNewDokter;
}

async function addKlinikData() {
  await prisma.klinik.createMany({
    data: [
      {
        id_klinik: klinikId[0],
        nama_klinik: "Klinik Yos Sudarso",
        alamat_klinik: "JL. Yos Sudarso",
        no_telepon_klinik: "082323327469",
        id_dokter_tetap: "KJG8dXFfrtv_u4TZnLCVF",
      },
      {
        id_klinik: klinikId[1],
        nama_klinik: "Klinik G.Obos",
        alamat_klinik: "JL. G.Obos Induk",
        no_telepon_klinik: "082321037479",
        id_dokter_tetap: "MTJIh5MJTMLraK5BwKsf4",
      },
    ],
  });

  return;
}

async function addDokterSpesialisData() {
  const insertNewData = await prisma.dokter_spesialis.createMany({
    data: [
      {
        id_dokter_spesialis: nanoid().toString(),
        id_dokter: "KJG8dXFfrtv_u4TZnLCVF",
        id_klinik: klinikId[0],
        spesialis_dokter: "Dermatologi",
      },
      {
        id_dokter_spesialis: nanoid().toString(),
        id_dokter: "KJG8dXFfrtv_u4TZnLCVF",
        id_klinik: klinikId[1],
        spesialis_dokter: "Dermatologi",
      },
      {
        id_dokter_spesialis: nanoid().toString(),
        id_dokter: "MTJIh5MJTMLraK5BwKsf4",
        id_klinik: klinikId[0],
        spesialis_dokter: "Kardiologi",
      },
      {
        id_dokter_spesialis: nanoid().toString(),
        id_dokter: "MTJIh5MJTMLraK5BwKsf4",
        id_klinik: klinikId[1],
        spesialis_dokter: "Kardiologi",
      },
    ],
  });

  return insertNewData;
}

async function addPawrentData() {
  await prisma.pawrent.create({
    data: {
      id_pawrent: pawrentId,
      nama_lengkap_pawrent: "Nurdin",
      no_telepon_pawrent: "0840484837837",
    },
  });

  return;
}

async function addHewanData() {
  await prisma.hewan.create({
    data: {
      id_hewan: hewanId,
      nama_hewan: "Febri",
      tahun_lahir_hewan: "2004",
      jenis_hewan: "Anjing",
      id_pawrent: pawrentId,
    },
  });

  return;
}

async function addObatData() {
  await prisma.obat.createMany({
    data: [
      {
        id_obat: obatId[0],
        nama_obat: "Anthelmintik",
        petunjuk_penggunaan_obat: "Diminum langsung atau dicampur dengan makanan.",
      },
      {
        id_obat: obatId[1],
        nama_obat: "Otolin",
        petunjuk_penggunaan_obat: "Dit teteskan ke dalam telinga, lalu dipijat agar menyebar",
      },
    ],
  });

  return;
}

async function addKunjunganData() {
  await prisma.kunjungan.create({
    data: {
      id_kunjungan: kunjunganId,
      tanggal_kunjungan: new Date().toISOString(),
      diagnosa: "Gatal-gatal di telinga",
      id_hewan: hewanId,
      id_dokter: "KJG8dXFfrtv_u4TZnLCVF",
      id_klinik: klinikId[0],
    },
  });

  return;
}

async function addResepData() {
  await prisma.resep.create({
    data: {
      id_resep: nanoid(),
      frekuensi_resep: "3x Sehari",
      dosis_resep: "1 Tetes",
      id_kunjungan: kunjunganId,
      id_obat: obatId[0],
    },
  });
}

await addDokterData();
await addKlinikData();
await addDokterSpesialisData();
await addPawrentData()
await addHewanData();
await addObatData();
await addKunjunganData();

const done = await addResepData()

console.log(done, "Done")