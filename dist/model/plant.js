"use strict";

const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 2,
    required: [true, '植物名称不能为空']
  },
  engName: String,
  jpnName: String,
  price: Number,
  type: Array,
  channel: String,
  seed: Object,
  mixPlant: Array,
  growStage: Array,
  photoSrc: String
});
const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;