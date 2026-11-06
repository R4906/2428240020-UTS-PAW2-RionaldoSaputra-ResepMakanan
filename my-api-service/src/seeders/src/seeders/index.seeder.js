import mongoose, { connectDB } from '../config/database.js'
import FakultasModel from '../models/fakultas.model.js'
import ProdiModel from '../models/prodi.model.js'

const samples = [
  {
    resep : 'resep makanan',
    makanan: [
      { kode: 'NG', nama_makanan: 'nasi goreng' },
      { kode: 'NU', nama_makanan: 'nasi uduk' },
      { kode: 'PEK', nama_makanan: 'pempek' },
      { kode: 'NP', nama_makanan: 'nasi padang' },
      { kode: 'ST', nama_makanan: 'sate' },
    ],
  },
]

const counts = { fakultas: 0, prodi: 0 }

try {
  await connectDB()
  await Promise.all([FakultasModel.init(), ProdiModel.init()])
  await mongoose.connection.dropDatabase()
  console.log('Database cleared')
  await FakultasModel.createIndexes()
  await ProdiModel.createIndexes()

  const faculties = []
  for (const sample of samples) {
    faculties.push(await FakultasModel.create({ name: sample.resep }))
    counts.fakultas += 1
  }

  for (const [index, sample] of samples.entries()) {
    const facultyId = faculties[index]._id
    for (const makanan of sample.makanan) {
      await ProdiModel.create({ ...makanan, fakultas: facultyId })
      counts.prodi += 1
    }
  }
} catch (error) {
  console.error('Seeding failed:', error.message)
  process.exitCode = 1
} finally {
  for (const [model, count] of Object.entries(counts)) {
    console.log(`${model}: ${count} inserted`)
  }
  try {
    await mongoose.disconnect()
  } catch (error) {
    console.error('MongoDB disconnect failed:', error.message)
    process.exitCode = 1
  }
}