let c = 0

function printIt() {
  console.log(c)
}

function plus() {
  setTimeout(function () {
    c++
  }, 1000)
}

plus()
printIt()