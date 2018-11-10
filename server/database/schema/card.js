const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const cardSchema = new Schema({
  id: {
    unique: true,
    type: Number
  },

  nmae: String,
  name_en: String,

  desc: String,
  desc_en: String,

  type: String,
  type_en: String,

  large_img: String,
  mini_img: String,
  icon_img: String,
  large_img_key: String,
  mini_img_key: String,
  icon_img_key:String,

  author: String,
  color: String,
  rarity: String,

  atk: String,
  hp: String,
  mana_cost: String,


  ref: [String],

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

cardSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Card', cardSchema)