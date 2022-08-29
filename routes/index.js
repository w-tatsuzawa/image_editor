const express = require('express');
const crypto = require('crypto')

var router = express.Router();

function getRandomString(){
  const N = 16
  return crypto.randomBytes(N).toString('base64').substring(0, N)
};

var multer = require('multer');
var storage = multer.diskStorage({
  //ファイルの保存先を指定(ここでは保存先は./public/images) 
  //Express4の仕様かなんかで画像staticなファイルを保存するときはpublic/以下のフォルダに置かないとダメらしい
  destination: function(req, file, cb){
    cb(null, './public/images/')
  },
  //ファイル名を指定
  filename: function(req, file, cb){
    cb(null, getRandomString())
  }
})

var upload = multer({storage: storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ルート (/) に対する POST リクエスト
//name タグにfileを指定したもののみ受け付ける
router.post('/',upload.single('file'),function(req,res){
  //image.ejsを返す
  res.render('image');
});

module.exports = router;
