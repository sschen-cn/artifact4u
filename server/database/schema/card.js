const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const cardSchema = new Schema({
  id: {
    type: Number
  },

  name: String,
  name_en: String,

  desc: String,
  desc_en: String,

  type_id: Number,
  type_en: String,

  large_img: String,
  mini_img: String,
  icon_img: String,
  large_img_key: String,
  mini_img_key: String,
  icon_img_key:String,

  author: String,
  color: Number,
  rarity: Number,
  price: Number,
  img: String,
  img_key: String,

  atk: Number,
  hp: Number,
  mana_cost: Number,

  ref: [String],

  skills: [],
  refCards: [],

  // skills: {
  //   img: String,
  //   title: String,
  //   skill: Number,
  //   desc: String
  // },
  // refCards: {
  //   id: Number,
  //   name: String,
  //   img: String,
  //   type: Number,
  //   color: Number,
  //   rarity: Number,
  //   price: Number,
  //   atk: Number,
  //   defense: Number,
  //   hp: Number,
  //   mana_cost: Number,
  //   background: String,
  //   avatar: String,
  //   desc: String
  // },

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