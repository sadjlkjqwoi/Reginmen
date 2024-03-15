// //userApi.js
// var models = require('../db')//连接数据库
// var express = require('express')
// var router = express.Router()
// var mysql = require('mysql')
// var $sql = require('../sqlMap')

// // 连接数据库
// var conn = mysql.createConnection(models.mysql)

// conn.connect()
// var jsonWrite = function (res, ret) {
//   if (typeof ret === 'undefined') {
//     res.json({
//       code: '1',
//       msg: '操作失败'
//     })
//   } else {
//     res.json(ret)
//   }
// }

// //获取Label
// router.get('/GuidanceCom',(req,res)=>{
//     var sql = $sql.label.search;
//     var params = req.body;
//     conn.query(sql,[params.context],function(err,result){
//         if(err){
//             console.log(err);
//         }
//         if(result){
//             jsonWrite(res,result);
//         }
//     })
// })
// 左侧导航
// router.get('/addUser', (req, res) => {
//   var sql = $sql.leftList.search;
//   var params = req.body;
//   conn.query(sql, [params.loginname, params.password], function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     if (result) {
//       jsonWrite(res, result);
//     }
//   })
// })




// 根据某个项目查询系统详情信息
// router.post('/system', (req, res) => {
//   var sql = $sql.system.search
//   var params = req.body
//   console.log(params)
//   console.log(sql);
  
//   conn.query(sql, [params.entryName], function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     if (result) {
//       jsonWrite(res, result)
//     }
//   })
// })


module.exports = router