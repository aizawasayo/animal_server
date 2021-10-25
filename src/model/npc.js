const mongoose = require('mongoose')

const npcSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 2,
    required: [true, 'npc名称不能为空'],
  },
  engName: String,
  jpnName: String,
  birth: String,
  service: String,
  appearTime: String,
  photoSrc: String,
})

const Npc = mongoose.model('Npc', npcSchema)

module.exports = Npc