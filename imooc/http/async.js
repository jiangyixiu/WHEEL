let c = 0

function printIt() {
  console.log(c)
}

function plus(callback) {
  setTimeout(function () {
    c++
    callback()
  }, 1000)
}

plus(printIt)