var courseId = '848';
var _key = '30695';


// 图片上传七牛云
var qiniu = require('qiniu');
var util = require('../public/commons/js/util.js');

// 上传凭证
var accessKey = '-X5dFx3g2b5RmH0kErVLdtP5dFwyGDg-fmJ6TDWX';
var secretKey = 'O2ygLYUxRSP26wHqqdBNDq5zJCNyvgIHQc78Hwd0';
var bucket = 'ichazuo';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: bucket,
  expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
// 是否使用https域名
config.useHttpsDomain = true;
// 上传是否使用cdn加速
config.useCdnDomain = true;

var localFile = "./" + app.srcPath + courseId + '/' + _key + ".png";
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key = 'jyzs' + util.randomWord(false, 43) + '.png';

// 文件上传

formUploader.putFile(uploadToken, key, localFile, putExtra,
  (respErr, respBody, respInfo) => {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody);
      var poster_url = 'https://sslfile.ichazuo.cn/' + respBody.key;
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });