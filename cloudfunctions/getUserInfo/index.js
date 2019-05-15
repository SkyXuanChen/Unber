// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const users = db.collection("users")
  try {
    return await users.where({
      openid: wxContext.OPENID
    }).get()
  }catch(e){
    console.error(e)
  }
}