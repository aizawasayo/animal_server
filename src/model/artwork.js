const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 4,
    required: [true, '艺术品名称不能为空'],
  },
  engName: String,
  jpnName: String,
  realName: String,
  price: Number,
  salePrice: Number, // 售出价格
  size: String, // 占地面积
  hasFake: Boolean,
  fakeCharacter: String, // 赝品特征
  introduction: String,
  photoSrc: Array
})

const Artwork = mongoose.model('Artwork', artworkSchema)

module.exports = Artwork