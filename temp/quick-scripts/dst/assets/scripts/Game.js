
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '423d8F4veVGwr81Oo++HlaK', 'Game');
// scripts/Game.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    // 地面节点，用于确定星星生成的高度
    ground: {
      "default": null,
      type: cc.Node
    },
    // Player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
      "default": null,
      type: cc.Node
    },
    beginPrefab: {
      "default": null,
      type: cc.Prefab
    },
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    // 得分音效资源
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    },
    isBegin: false,
    starProgress: {
      // 设置星星消失的进度条
      "default": null,
      type: cc.ProgressBar
    },
    instructionLabel: {
      "default": null,
      type: cc.Label
    } // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },

  },
  onLoad: function onLoad() {
    // 获取地平面的 y 轴坐标
    this.starProgress.node.active = false;
    this.groundY = this.ground.y + this.ground.height / 2; // 初始化计时器

    this.timer = 0;
    this.starDuration = 0; // 生成一个新的星星

    this.onStartGame();
    this.score = 0;
  },
  onStartGame: function onStartGame() {
    var newBegin = cc.instantiate(this.beginPrefab); // 将新增的节点添加到 Canvas 节点下面

    this.node.addChild(newBegin); // 为星星设置一个随机位置

    newBegin.setPosition(0, 0);
    newBegin.on(cc.Node.EventType.TOUCH_START, function (t) {
      this.isBegin = true;
      this.instructionLabel.destroy();
      this.spawnNewStar();
      newBegin.destroy();
    }, this);
  },
  spawnNewStar: function spawnNewStar() {
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab); // 将新增的节点添加到 Canvas 节点下面

    this.node.addChild(newStar); // 为星星设置一个随机位置

    newStar.setPosition(this.getNewStarPosition()); // 在星星脚本组件上保存 Game 对象的引用

    newStar.getComponent('Star').game = this; // 重置计时器，根据消失时间范围随机取一个值

    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
    this.starProgress.node.active = true;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0; // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标

    var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50; // 根据屏幕宽度，随机得到一个星星 x 坐标

    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX; // 返回星星坐标

    return cc.v2(randX, randY);
  },
  gainScore: function gainScore() {
    this.score += 1; // 更新 scoreDisplay Label 的文字

    this.scoreDisplay.string = 'Score: ' + this.score;
  },
  gameOver: function gameOver() {
    // 停止 Player 节点的跳跃动作
    this.player.stopAllActions(); // 重新加载场景 game

    cc.director.loadScene('game');
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  update: function update(dt) {
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
      this.gameOver();
      this.isBegin = false;
      return;
    }

    this.timer += dt;

    if (this.isBegin) {
      this.starProgress.progress = this.starDuration && this.timer / this.starDuration;
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsIm1heFN0YXJEdXJhdGlvbiIsIm1pblN0YXJEdXJhdGlvbiIsImdyb3VuZCIsIk5vZGUiLCJwbGF5ZXIiLCJiZWdpblByZWZhYiIsInNjb3JlRGlzcGxheSIsIkxhYmVsIiwic2NvcmVBdWRpbyIsIkF1ZGlvQ2xpcCIsImlzQmVnaW4iLCJzdGFyUHJvZ3Jlc3MiLCJQcm9ncmVzc0JhciIsImluc3RydWN0aW9uTGFiZWwiLCJvbkxvYWQiLCJub2RlIiwiYWN0aXZlIiwiZ3JvdW5kWSIsInkiLCJoZWlnaHQiLCJ0aW1lciIsInN0YXJEdXJhdGlvbiIsIm9uU3RhcnRHYW1lIiwic2NvcmUiLCJuZXdCZWdpbiIsImluc3RhbnRpYXRlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJ0IiwiZGVzdHJveSIsInNwYXduTmV3U3RhciIsIm5ld1N0YXIiLCJnZXROZXdTdGFyUG9zaXRpb24iLCJnZXRDb21wb25lbnQiLCJnYW1lIiwiTWF0aCIsInJhbmRvbSIsInJhbmRYIiwicmFuZFkiLCJqdW1wSGVpZ2h0IiwibWF4WCIsIndpZHRoIiwidjIiLCJnYWluU2NvcmUiLCJzdHJpbmciLCJnYW1lT3ZlciIsInN0b3BBbGxBY3Rpb25zIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJzdGFydCIsInVwZGF0ZSIsImR0IiwicHJvZ3Jlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUNS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TUFBTCxDQUFZNkMsY0FBWixHQUZpQixDQUlqQjs7QUFDQXhELElBQUFBLEVBQUUsQ0FBQ3lELFFBQUgsQ0FBWUMsU0FBWixDQUFzQixNQUF0QjtBQUNILEdBN0hJO0FBK0hMO0FBRUE7QUFFQUMsRUFBQUEsS0FuSUssbUJBbUlHLENBRVAsQ0FySUk7QUF1SUxDLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsRUFBVCxFQUFhO0FBQ2pCO0FBQ0E7QUFDQSxRQUFJLEtBQUtsQyxLQUFMLEdBQWEsS0FBS0MsWUFBdEIsRUFBb0M7QUFDaEMsV0FBSzJCLFFBQUw7QUFDQSxXQUFLdEMsT0FBTCxHQUFlLEtBQWY7QUFDQTtBQUNIOztBQUVELFNBQUtVLEtBQUwsSUFBY2tDLEVBQWQ7O0FBQ0EsUUFBSSxLQUFLNUMsT0FBVCxFQUFrQjtBQUNkLFdBQUtDLFlBQUwsQ0FBa0I0QyxRQUFsQixHQUE2QixLQUFLbEMsWUFBTCxJQUFzQixLQUFLRCxLQUFMLEdBQWEsS0FBS0MsWUFBckU7QUFDSDtBQUNKO0FBcEpJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxuICAgICAgICBzdGFyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxuXG4gICAgICAgIC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxuICAgICAgICBncm91bmQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUGxheWVyIOiKgueCue+8jOeUqOS6juiOt+WPluS4u+inkuW8uei3s+eahOmrmOW6pu+8jOWSjOaOp+WItuS4u+inkuihjOWKqOW8gOWFs1xuICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGJlZ2luUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOW+l+WIhumfs+aViOi1hOa6kFxuICAgICAgICBzY29yZUF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIGlzQmVnaW46IGZhbHNlLFxuICAgICAgICBzdGFyUHJvZ3Jlc3M6IHsgLy8g6K6+572u5pif5pif5raI5aSx55qE6L+b5bqm5p2hXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXJcbiAgICAgICAgfSxcbiAgICAgICAgaW5zdHJ1Y3Rpb25MYWJlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIOiOt+WPluWcsOW5s+mdoueahCB5IOi9tOWdkOagh1xuICAgICAgICB0aGlzLnN0YXJQcm9ncmVzcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyO1xuICAgICAgICAvLyDliJ3lp4vljJborqHml7blmahcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcbiAgICAgICAgLy8g55Sf5oiQ5LiA5Liq5paw55qE5pif5pifXG4gICAgICAgIHRoaXMub25TdGFydEdhbWUoKVxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB9LFxuXG4gICAgb25TdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV3QmVnaW4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJlZ2luUHJlZmFiKTtcbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld0JlZ2luKTtcbiAgICAgICAgLy8g5Li65pif5pif6K6+572u5LiA5Liq6ZqP5py65L2N572uXG4gICAgICAgIG5ld0JlZ2luLnNldFBvc2l0aW9uKDAsIDApXG4gICAgICAgIG5ld0JlZ2luLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICB0aGlzLmlzQmVnaW4gPSB0cnVlXG4gICAgICAgICAgICB0aGlzLmluc3RydWN0aW9uTGFiZWwuZGVzdHJveSgpXG4gICAgICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigpXG4gICAgICAgICAgICBuZXdCZWdpbi5kZXN0cm95KCk7XG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcblxuICAgIHNwYXduTmV3U3RhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIOS9v+eUqOe7meWumueahOaooeadv+WcqOWcuuaZr+S4reeUn+aIkOS4gOS4quaWsOiKgueCuVxuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgLy8g5Li65pif5pif6K6+572u5LiA5Liq6ZqP5py65L2N572uXG4gICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24odGhpcy5nZXROZXdTdGFyUG9zaXRpb24oKSk7IC8vIOWcqOaYn+aYn+iEmuacrOe7hOS7tuS4iuS/neWtmCBHYW1lIOWvueixoeeahOW8leeUqFxuICAgICAgICBuZXdTdGFyLmdldENvbXBvbmVudCgnU3RhcicpLmdhbWUgPSB0aGlzO1xuICAgICAgICAvLyDph43nva7orqHml7blmajvvIzmoLnmja7mtojlpLHml7bpl7TojIPlm7Tpmo/mnLrlj5bkuIDkuKrlgLxcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSB0aGlzLm1pblN0YXJEdXJhdGlvbiArIE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhTdGFyRHVyYXRpb24gLSB0aGlzLm1pblN0YXJEdXJhdGlvbik7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJQcm9ncmVzcy5ub2RlLmFjdGl2ZSA9IHRydWVcblxuICAgIH0sXG5cbiAgICBnZXROZXdTdGFyUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZFggPSAwO1xuICAgICAgICAvLyDmoLnmja7lnLDlubPpnaLkvY3nva7lkozkuLvop5Lot7Pot4Ppq5jluqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ/nmoQgeSDlnZDmoIdcbiAgICAgICAgdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGggLyAyO1xuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICAvLyDov5Tlm57mmJ/mmJ/lnZDmoIdcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcbiAgICBnYWluU2NvcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgICAgIC8vIOabtOaWsCBzY29yZURpc3BsYXkgTGFiZWwg55qE5paH5a2XXG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmU7XG4gICAgfSxcbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIOWBnOatoiBQbGF5ZXIg6IqC54K555qE6Lez6LeD5Yqo5L2cXG4gICAgICAgIHRoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7XG5cbiAgICAgICAgLy8g6YeN5paw5Yqg6L295Zy65pmvIGdhbWVcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkdCkge1xuICAgICAgICAvLyDmr4/luKfmm7TmlrDorqHml7blmajvvIzotoXov4fpmZDluqbov5jmsqHmnInnlJ/miJDmlrDnmoTmmJ/mmJ9cbiAgICAgICAgLy8g5bCx5Lya6LCD55So5ri45oiP5aSx6LSl6YC76L6RXG4gICAgICAgIGlmICh0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaXNCZWdpbiA9IGZhbHNlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVyICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5pc0JlZ2luKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJQcm9ncmVzcy5wcm9ncmVzcyA9IHRoaXMuc3RhckR1cmF0aW9uICYmICh0aGlzLnRpbWVyIC8gdGhpcy5zdGFyRHVyYXRpb24pXG4gICAgICAgIH1cbiAgICB9LFxufSk7Il19