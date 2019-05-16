// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const db = cloud.database()
  const users = db.collection("users")
  try{
    await users.where({
      openid: wxContext.OPENID
    }).remove()
  } catch (e) {
    console.error(e)
    return e
  }
  event.openid = wxContext.OPENID
  return await users.add({
    data:event
  })
}