window.__require = function t(e, i, n) {
function s(o, a) {
if (!i[o]) {
if (!e[o]) {
var r = o.split("/");
r = r[r.length - 1];
if (!e[r]) {
var u = "function" == typeof __require && __require;
if (!a && u) return u(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + o + "'");
}
o = r;
}
var h = i[o] = {
exports: {}
};
e[o][0].call(h.exports, function(t) {
return s(e[o][1][t] || t);
}, h, h.exports, t, e, i, n);
}
return i[o].exports;
}
for (var c = "function" == typeof __require && __require, o = 0; o < n.length; o++) s(n[o]);
return s;
}({
Game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "423d8F4veVGwr81Oo++HlaK", "Game");
cc.Class({
extends: cc.Component,
properties: {
starPrefab: {
default: null,
type: cc.Prefab
},
maxStarDuration: 0,
minStarDuration: 0,
ground: {
default: null,
type: cc.Node
},
player: {
default: null,
type: cc.Node
},
scoreDisplay: {
default: null,
type: cc.Label
},
scoreAudio: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
this.groundY = this.ground.y + this.ground.height / 2;
this.timer = 0;
this.starDuration = 0;
this.spawnNewStar();
this.score = 0;
},
spawnNewStar: function() {
var t = cc.instantiate(this.starPrefab);
this.node.addChild(t);
t.setPosition(this.getNewStarPosition());
t.getComponent("Star").game = this;
this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
this.timer = 0;
},
getNewStarPosition: function() {
var t, e = this.groundY + Math.random() * this.player.getComponent("Player").jumpHeight + 50, i = this.node.width / 2;
t = 2 * (Math.random() - .5) * i;
return cc.v2(t, e);
},
gainScore: function() {
this.score += 1;
this.scoreDisplay.string = "Score: " + this.score;
cc.audioEngine.playEffect(this.scoreAudio, !1);
},
gameOver: function() {
this.player.stopAllActions();
cc.director.loadScene("game");
},
start: function() {},
update: function(t) {
this.timer > this.starDuration ? this.gameOver() : this.timer += t;
}
});
cc._RF.pop();
}, {} ],
Player: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "8db2eE9TdlHvYD5wdkzMR79", "Player");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 1e3,
jumpDuration: 0,
maxMoveSpeed: 0,
accel: 0,
jumpAudio: {
default: null,
type: cc.AudioClip
}
},
runJumpAction: function() {
var t = cc.tween().by(this.jumpDuration, {
y: this.jumpHeight
}, {
easing: "sineOut"
}), e = cc.tween().by(this.jumpDuration, {
y: -this.jumpHeight
}, {
easing: "sineIn"
}), i = cc.tween().sequence(t, e).call(this.playJumpSound, this);
return cc.tween().repeatForever(i);
},
onKeyDown: function(t) {
switch (t.keyCode) {
case cc.macro.KEY.a:
this.accLeft = !0;
break;

case cc.macro.KEY.d:
this.accRight = !0;
}
},
onKeyUp: function(t) {
switch (t.keyCode) {
case cc.macro.KEY.a:
this.accLeft = !1;
break;

case cc.macro.KEY.d:
this.accRight = !1;
}
},
playJumpSound: function() {
cc.audioEngine.playEffect(this.jumpAudio, !1);
},
onLoad: function() {
var t = this.runJumpAction();
cc.tween(this.node).then(t).start();
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 0;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onDestroy: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
start: function() {},
update: function(t) {
this.accLeft ? this.xSpeed -= this.accel * t : this.accRight && (this.xSpeed += this.accel * t);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
console.log(this.player.getComponent("Game"));
this.node.x += this.xSpeed * t;
}
});
cc._RF.pop();
}, {} ],
Star: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "df9eav1jsREjbQk6+wUjvwh", "Star");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 0
},
onLoad: function() {
this.getPlayerDistance() < this.pickRadius && this.onPicked();
},
getPlayerDistance: function() {
var t = this.game.player.getPosition();
return this.node.position.sub(t).mag();
},
onPicked: function() {
this.game.spawnNewStar();
this.game.gainScore();
this.node.destroy();
},
start: function() {},
update: function(t) {
if (this.getPlayerDistance() < this.pickRadius) this.onPicked(); else {
var e = 1 - this.game.timer / this.game.starDuration;
this.node.opacity = 50 + Math.floor(205 * e);
}
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Game", "Player", "Star" ]);