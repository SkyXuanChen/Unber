//云函数入口文件
const cloud=require('wx-server-sdk')

cloud.init()
const db=cloud.database()
//云函数入口函数
exports.main = async (event, context) => {
    console.log("Yunhanshu")
    console.log(event.target)
  return await db.collection('waitings').where({
    _id: event.target
  }).remove(
    {

      success: res => {
        console.log('云函数成功')
        return True
      },
      fail: err => {
        console.error('云函数 [删除记录] 失败：', err)
        return False
      }
    }
  )
}