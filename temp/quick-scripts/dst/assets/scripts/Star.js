
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df9eav1jsREjbQk6+wUjvwh', 'Star');
// scripts/Star.js

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
    pickRadius: 0 // foo: {
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
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // 每帧判断星星和主角之间的距离是否小于收集距离
    if (this.getPlayerDistance() < this.pickRadius) {
      // 调用收集行为
      this.onPicked();
      return;
    }
  },
  getPlayerDistance: function getPlayerDistance() {
    // 根据 Player 节点位置判断距离
    var playerPos = this.game && this.game.player && this.game.player.getPosition(); // 根据两点位置计算两点之间距离

    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onPicked: function onPicked() {
    console.log(this.node.parent); // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星

    this.game.spawnNewStar(); // 调用 Game 脚本的得分方法

    this.game.gainScore(); // 然后销毁当前星星节点

    this.node.destroy();
  },
  start: function start() {},
  update: function update(dt) {
    // 每帧判断星星和主角之间的距离是否小于收集距离
    if (this.getPlayerDistance() < this.pickRadius) {
      // 调用收集行为
      this.onPicked();
      return;
    } // 根据 Game 脚本中的计时器更新星星的透明度


    var opacityRatio = 1 - this.game.timer / this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1N0YXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwaWNrUmFkaXVzIiwib25Mb2FkIiwiZ2V0UGxheWVyRGlzdGFuY2UiLCJvblBpY2tlZCIsInBsYXllclBvcyIsImdhbWUiLCJwbGF5ZXIiLCJnZXRQb3NpdGlvbiIsImRpc3QiLCJub2RlIiwicG9zaXRpb24iLCJzdWIiLCJtYWciLCJjb25zb2xlIiwibG9nIiwicGFyZW50Iiwic3Bhd25OZXdTdGFyIiwiZ2FpblNjb3JlIiwiZGVzdHJveSIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJvcGFjaXR5UmF0aW8iLCJ0aW1lciIsInN0YXJEdXJhdGlvbiIsIm1pbk9wYWNpdHkiLCJvcGFjaXR5IiwiTWF0aCIsImZsb29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFLENBREosQ0FFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBaEJRLEdBSFA7QUFzQkw7QUFFQUMsRUFBQUEsTUF4Qkssb0JBd0JJO0FBQ0w7QUFDQSxRQUFJLEtBQUtDLGlCQUFMLEtBQTJCLEtBQUtGLFVBQXBDLEVBQWdEO0FBQzVDO0FBQ0EsV0FBS0csUUFBTDtBQUNBO0FBQ0g7QUFDSixHQS9CSTtBQWdDTEQsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVc7QUFDMUI7QUFDQSxRQUFJRSxTQUFTLEdBQUcsS0FBS0MsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVUMsTUFBdkIsSUFBaUMsS0FBS0QsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxXQUFqQixFQUFqRCxDQUYwQixDQUcxQjs7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxRQUFWLENBQW1CQyxHQUFuQixDQUF1QlAsU0FBdkIsRUFBa0NRLEdBQWxDLEVBQVg7QUFDQSxXQUFPSixJQUFQO0FBQ0gsR0F0Q0k7QUF3Q0xMLEVBQUFBLFFBQVEsRUFBRSxvQkFBVztBQUNqQlUsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS0wsSUFBTCxDQUFVTSxNQUF0QixFQURpQixDQUViOztBQUNKLFNBQUtWLElBQUwsQ0FBVVcsWUFBVixHQUhpQixDQUlqQjs7QUFDQSxTQUFLWCxJQUFMLENBQVVZLFNBQVYsR0FMaUIsQ0FNakI7O0FBQ0EsU0FBS1IsSUFBTCxDQUFVUyxPQUFWO0FBQ0gsR0FoREk7QUFrRExDLEVBQUFBLEtBbERLLG1CQWtERyxDQUVQLENBcERJO0FBc0RMQyxFQUFBQSxNQXRESyxrQkFzREVDLEVBdERGLEVBc0RNO0FBQ1A7QUFDQSxRQUFJLEtBQUtuQixpQkFBTCxLQUEyQixLQUFLRixVQUFwQyxFQUFnRDtBQUM1QztBQUNBLFdBQUtHLFFBQUw7QUFDQTtBQUNILEtBTk0sQ0FPUDs7O0FBQ0EsUUFBSW1CLFlBQVksR0FBRyxJQUFJLEtBQUtqQixJQUFMLENBQVVrQixLQUFWLEdBQWtCLEtBQUtsQixJQUFMLENBQVVtQixZQUFuRDtBQUNBLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBLFNBQUtoQixJQUFMLENBQVVpQixPQUFWLEdBQW9CRCxVQUFVLEdBQUdFLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixZQUFZLElBQUksTUFBTUcsVUFBVixDQUF2QixDQUFqQztBQUNIO0FBakVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBpY2tSYWRpdXM6IDAsXG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyDmr4/luKfliKTmlq3mmJ/mmJ/lkozkuLvop5LkuYvpl7TnmoTot53nprvmmK/lkKblsI/kuo7mlLbpm4bot53nprtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSA8IHRoaXMucGlja1JhZGl1cykge1xuICAgICAgICAgICAgLy8g6LCD55So5pS26ZuG6KGM5Li6XG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFBsYXllckRpc3RhbmNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g5qC55o2uIFBsYXllciDoioLngrnkvY3nva7liKTmlq3ot53nprtcbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuZ2FtZSAmJiB0aGlzLmdhbWUucGxheWVyICYmIHRoaXMuZ2FtZS5wbGF5ZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy8g5qC55o2u5Lik54K55L2N572u6K6h566X5Lik54K55LmL6Ze06Led56a7XG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihwbGF5ZXJQb3MpLm1hZygpO1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9LFxuXG4gICAgb25QaWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vZGUucGFyZW50KVxuICAgICAgICAgICAgLy8g5b2T5pif5pif6KKr5pS26ZuG5pe277yM6LCD55SoIEdhbWUg6ISa5pys5Lit55qE5o6l5Y+j77yM55Sf5oiQ5LiA5Liq5paw55qE5pif5pifXG4gICAgICAgIHRoaXMuZ2FtZS5zcGF3bk5ld1N0YXIoKTtcbiAgICAgICAgLy8g6LCD55SoIEdhbWUg6ISa5pys55qE5b6X5YiG5pa55rOVXG4gICAgICAgIHRoaXMuZ2FtZS5nYWluU2NvcmUoKTtcbiAgICAgICAgLy8g54S25ZCO6ZSA5q+B5b2T5YmN5pif5pif6IqC54K5XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICAvLyDmr4/luKfliKTmlq3mmJ/mmJ/lkozkuLvop5LkuYvpl7TnmoTot53nprvmmK/lkKblsI/kuo7mlLbpm4bot53nprtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSA8IHRoaXMucGlja1JhZGl1cykge1xuICAgICAgICAgICAgLy8g6LCD55So5pS26ZuG6KGM5Li6XG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8g5qC55o2uIEdhbWUg6ISa5pys5Lit55qE6K6h5pe25Zmo5pu05paw5pif5pif55qE6YCP5piO5bqmXG4gICAgICAgIHZhciBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyIC8gdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcbiAgICAgICAgdmFyIG1pbk9wYWNpdHkgPSA1MDtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjU1IC0gbWluT3BhY2l0eSkpO1xuICAgIH0sXG59KTsiXX0=