
const models = require('../db')
const express = require('express')
var router = express.Router()
const mysql = require('mysql')
//加密但是不会用
// const crypto = require('crypto')
// var $sql = require('../sqlMap')
 
// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}

//获取Label
router.get('/getLabel', (req, res) => {
    var sql = 'SELECT * FROM LABEL;';
    var params = req.query; 
    conn.query(sql, [params.context], function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
      }
    })
  })
  


module.exports = router
