const mongoose = require('mongoose')

const insectSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 2,
    required: [true, '昆虫名称不能为空'],
  },
  engName: String,
  jpnName: String,
  price: Number,
  activeTime: {
    north: Array,
    south: Array
  },
  locale: Array, // 出现地点
  period: String, // 时间段
  periodStart: String,
  periodEnd: String,
  weatherCondition: String, // 出现天气
  unlockCondition: String, // 解锁要求
  elseCondition: Array,
  rarity: String, // 稀有度
  introduction: String,
  photoSrc: String,
})

const Insect = mongoose.model('Insect', insectSchema)

async function createInsect() {
  const insect = await Insect.create({
    name: '白斑狗鱼',
    engName: 'pike',
    jpnName: 'グルミン',
    price: 1800,
    activeTime: {
      north: ['9月', '10月', '11月', '12月'],
      south: ['3月', '4月', '5月', '6月']
    },
    locale: '河流',
    period: '全天',
    unlockCondition: '总钓鱼数满20条',
    rarity: '罕见🌟🌟🌟',
    introduction: '白斑狗鱼啊，即使在鲑鱼的同类里，也算是有名的巨大鱼种！体型大的这种鱼，长度可以超过1.3米......那好像鸭嘴一样大的大大嘴巴，不只是鱼类，就连小型的哺乳类和水鸟也能轻松捕食，是食肉的鱼类......如果在水中遇到的话，会引起恐慌哦',
    photoSrc: '',
  })
}
// createInsect();

module.exports = Insect