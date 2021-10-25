const mongoose = require('mongoose')

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 1,
    required: [true, '鱼类名称不能为空'],
  },
  engName: String,
  jpnName: String,
  price: Number,
  activeTime: {
    north: Array,
    south: Array
  },
  locale: Array, // 出现地点
  periodStart: String,
  periodEnd: String,
  period: String, // 时间段
  shadow: String, // 鱼影
  unlockCondition: String, // 解锁要求
  rarity: String,// 稀有度
  introduction: String,
  photoSrc: String,
})

const Fish = mongoose.model('Fish', fishSchema)

async function createFish() {
  const fish = await Fish.create({
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
    shadow: '大',
    unlockCondition: '总钓鱼数满20条',
    rarity: '罕见🌟🌟🌟',
    introduction: '白斑狗鱼啊，即使在鲑鱼的同类里，也算是有名的巨大鱼种！体型大的这种鱼，长度可以超过1.3米......那好像鸭嘴一样大的大大嘴巴，不只是鱼类，就连小型的哺乳类和水鸟也能轻松捕食，是食肉的鱼类......如果在水中遇到的话，会引起恐慌哦',
    photoSrc: '',
  })
}
// createFish();

module.exports = Fish