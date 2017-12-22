var util = require('util');
var events = require('events');

function MusicPlayer() {
  this.playing = false;
  events.EventEmitter.call(this);
}

util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();

// 事件监听
musicPlayer.on('play', function (track) {
  this.playing = true;
});

musicPlayer.on('stop', function () {
  this.playing = false;
});

musicPlayer.on('play', function (track) {
  console.log('Track now playing:', track);
});

// emit方法用于触发事件监听
musicPlayer.emit('play', 'The Roots - The Fire');

setTimeout(function () {
  // 触发sotp事件监听
  musicPlayer.emit('stop');
}, 1000);


// 删除事件监听
function play(){
  this.playing = true;
}
musicPlayer.on('play', play);

musicPlayer.removeListener('play', play);
