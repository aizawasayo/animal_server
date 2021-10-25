"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listProcess = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.string.includes.js");

const listProcess = data => {
  const processedData = Object.assign({}, data);
  const {
    query,
    topic,
    user,
    sort
  } = data;
  const nameReg = new RegExp(query.trim(), 'i');
  let condition = {
    name: nameReg
  };

  if (topic) {
    if (!topic.includes('不限话题')) {
      condition['topic'] = {
        $in: topic
      };
    }
  }

  if (user) {
    condition['user'] = {
      $in: user
    };
  }

  let sortCondition = {
    created_time: 1
  };
  if (sort) sortCondition = JSON.parse(sort);
  processedData.condition = condition;
  processedData.sortCondition = sortCondition;
  return processedData;
};

exports.listProcess = listProcess;