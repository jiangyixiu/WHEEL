var express = require('express');
var countstream = require('./countstream');
console.log(typeof express);
console.log(typeof countstream);
console.log(require.resolve('./countstream'))

delete require.cache(require.resolve('./countstream'));