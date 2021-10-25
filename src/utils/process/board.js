export const listProcess = data => {
  const processedData = Object.assign({}, data)
  const { query, topic, user, sort } = data

  const nameReg = new RegExp(query.trim(), 'i')
  let condition = {
    name: nameReg,
  }

  if (topic) {
    if (!topic.includes('不限话题')) {
      condition['topic'] = {
        $in: topic,
      }
    }
  }
  if (user) {
    condition['user'] = {
      $in: user,
    }
  }

  let sortCondition = {
    created_time: 1,
  }
  if (sort) sortCondition = JSON.parse(sort)

  processedData.condition = condition
  processedData.sortCondition = sortCondition

  return processedData
}
