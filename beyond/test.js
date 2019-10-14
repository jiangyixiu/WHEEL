async function fn1(params) {
  console.log(params)
}

console.log(fn1('hello').then(res=>{console.log(res)}))