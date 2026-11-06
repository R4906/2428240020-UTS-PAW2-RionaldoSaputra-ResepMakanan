import Makanan from '../models/Makanan.model.js'
import { apiResponse } from '../utils/response.js'

class MakananController {
  static async index(req, res) {
    const listMakanan = await Makanan.find()
    return apiResponse({ res, status: 200, data: listMakanan })
  }

  static async show(req, res) {
    const makananId = req.params.id
    const makanan = await Makanan.findById(makananId)

    if (!makanan) {
      return apiResponse({ res, status: 404, message: 'Makanan tidak ditemukan' })
    }

    return apiResponse({ res, status: 200, data: makanan })
  }

  static async store(req, res) {
    const { name, ingredients, instructions, cooking_minutes } = req.body

    if (!name) {
      return apiResponse({ res, status: 400, message: 'Nama makanan wajib diisi' })
    }

    if (!ingredients) {
      return apiResponse({ res, status: 400, message: 'Bahan makanan wajib diisi' })
    }

    const newMakanan = await Makanan.create({ name })
    return apiResponse({ res, status: 201, data: newMakanan })
  }

  static async update(req, res) {
    const makananId = req.params.id
    const { name } = req.body

    const exists = await Makanan.exists({ _id: makananId })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'Makanan tidak ditemukan' })
    }

    const updateMakanan = await Makanan.findOneAndUpdate(
      { _id: makananId },
      { name },
      { new: true }
    )

    return apiResponse({ res, status: 200, data: updateMakanan })
  }

  static async delete(req, res) {
    const makananId = req.params.id

    const exists = await Makanan.exists({ _id: makananId })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'Makanan tidak ditemukan' })
    }

    await Makanan.findOneAndDelete({ _id: makananId })
    return apiResponse({ res, status: 200, message: 'Makanan berhasil dihapus', data: null })
  }

  static async search(req, res) {
    const makananId = req.params.id

    const exists = await Makanan.exists({ _id: makananId })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'Makanan tidak ditemukan' })
    }

    await Makanan.findOneAndDelete({ _id: makananId })
    return apiResponse({ res, status: 200, message: 'Makanan berhasil dihapus', data: null })
  }
}
   static async order(req, res) {
    const makananId = req.params.id

    const exists = await Makanan.exists({ _id: makananId })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'Makanan tidak ditemukan' })
    }

    await Makanan.findOneAndDelete({ _id: makananId })
    return apiResponse({ res, status: 200, message: 'Makanan berhasil dihapus', data: null })
  }
}

export default MakananController