import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
  {
    ingredients: {
    type: String,
    required: true,
    unique: true,
},
},
    {
    instructions: {
    type: String,
    required: true,
    unique: true,
    },
},
    {
    cooking_minutes: {
    type: String,
    required: true,
    unique: true,
    },
},
)

const MakananModel = mongoose.model('makanan', schema)
export default MakananModel