function loadImg(src) {
  let promise = new Promise(function (resolve, reject) {
    let img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
    img.src = src;
  });
  return promise;
}

let src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
let result = loadImg(src);

result.then(function (img) {
  console.log(`width: ${img.width}`)
  return img;
}).then(function (img) {
  console.log(`height: ${img.height}`)
  return img;
}).then(function (img) {
  console.log(`src: ${img.src}`)
}).catch(function (err) {
  console.log(err);
})