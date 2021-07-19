
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/scripts/Begin');
require('./assets/scripts/Game');
require('./assets/scripts/Player');
require('./assets/scripts/Star');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8db2eE9TdlHvYD5wdkzMR79', 'Player');
// scripts/Player.js

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
    // 主角跳跃高度
    jumpHeight: 1000,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 最大移动速度
    maxMoveSpeed: 0,
    // 加速度
    accel: 0,
    jumpAudio: {
      "default": null,
      type: cc.AudioClip
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
  runJumpAction: function runJumpAction() {
    // 跳跃上升
    var jumpUp = cc.tween().by(this.jumpDuration, {
      y: this.jumpHeight
    }, {
      easing: 'sineOut'
    }); // 下落

    var jumpDown = cc.tween().by(this.jumpDuration, {
      y: -this.jumpHeight
    }, {
      easing: 'sineIn'
    }); // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作

    var tween = cc.tween().sequence(jumpUp, jumpDown).call(this.playJumpSound, this); // 添加一个回调函数，在前面的动作都结束时调用我们定义的 playJumpSound() 方法
    // 不断重复

    return cc.tween().repeatForever(tween);
  },
  onKeyDown: function onKeyDown(event) {
    // set a flag when key pressed
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;

      case cc.macro.KEY.d:
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    // unset a flag when key released
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;

      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  },
  playJumpSound: function playJumpSound() {
    // 调用声音引擎播放声音
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var jumpAction = this.runJumpAction();
    cc.tween(this.node).then(jumpAction).start(); // 加速度方向开关

    this.accLeft = false;
    this.accRight = false; // 主角当前水平方向速度

    this.xSpeed = 0; // 初始化键盘输入监听

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  onDestroy: function onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  start: function start() {},
  update: function update(dt) {
    // 根据当前加速度方向每帧更新速度
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    } // 限制主角的速度不能超过最大值


    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // if speed reach limit, use max speed with current direction
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    } // 根据当前速度更新主角的位置（不能超过视窗大小）


    var distance = this.node.parent.width / 2 - this.node.width / 2;

    if (this.node.x > -distance - this.xSpeed * dt && this.node.x < distance - this.xSpeed * dt) {
      this.node.x += this.xSpeed * dt;
    } else {
      this.xSpeed = 0; // 超过视窗时令其速度为零，这样可以快速切换方向
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1BsYXllci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImp1bXBIZWlnaHQiLCJqdW1wRHVyYXRpb24iLCJtYXhNb3ZlU3BlZWQiLCJhY2NlbCIsImp1bXBBdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJydW5KdW1wQWN0aW9uIiwianVtcFVwIiwidHdlZW4iLCJieSIsInkiLCJlYXNpbmciLCJqdW1wRG93biIsInNlcXVlbmNlIiwiY2FsbCIsInBsYXlKdW1wU291bmQiLCJyZXBlYXRGb3JldmVyIiwib25LZXlEb3duIiwiZXZlbnQiLCJrZXlDb2RlIiwibWFjcm8iLCJLRVkiLCJhIiwiYWNjTGVmdCIsImQiLCJhY2NSaWdodCIsIm9uS2V5VXAiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJvbkxvYWQiLCJqdW1wQWN0aW9uIiwibm9kZSIsInRoZW4iLCJzdGFydCIsInhTcGVlZCIsInN5c3RlbUV2ZW50Iiwib24iLCJTeXN0ZW1FdmVudCIsIkV2ZW50VHlwZSIsIktFWV9ET1dOIiwiS0VZX1VQIiwib25EZXN0cm95Iiwib2ZmIiwidXBkYXRlIiwiZHQiLCJNYXRoIiwiYWJzIiwiZGlzdGFuY2UiLCJwYXJlbnQiLCJ3aWR0aCIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRSxJQUZKO0FBR1I7QUFDQUMsSUFBQUEsWUFBWSxFQUFFLENBSk47QUFLUjtBQUNBQyxJQUFBQSxZQUFZLEVBQUUsQ0FOTjtBQU9SO0FBQ0FDLElBQUFBLEtBQUssRUFBRSxDQVJDO0FBU1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUEMsTUFBQUEsSUFBSSxFQUFFVCxFQUFFLENBQUNVO0FBRkYsS0FUSCxDQWFSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUEzQlEsR0FIUDtBQWdDTEMsRUFBQUEsYUFoQ0ssMkJBZ0NXO0FBQ1o7QUFDQSxRQUFJQyxNQUFNLEdBQUdaLEVBQUUsQ0FBQ2EsS0FBSCxHQUFXQyxFQUFYLENBQWMsS0FBS1QsWUFBbkIsRUFBaUM7QUFBRVUsTUFBQUEsQ0FBQyxFQUFFLEtBQUtYO0FBQVYsS0FBakMsRUFBeUQ7QUFBRVksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FBekQsQ0FBYixDQUZZLENBR1o7O0FBQ0EsUUFBSUMsUUFBUSxHQUFHakIsRUFBRSxDQUFDYSxLQUFILEdBQVdDLEVBQVgsQ0FBYyxLQUFLVCxZQUFuQixFQUFpQztBQUFFVSxNQUFBQSxDQUFDLEVBQUUsQ0FBQyxLQUFLWDtBQUFYLEtBQWpDLEVBQTBEO0FBQUVZLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBQTFELENBQWYsQ0FKWSxDQU1aOztBQUNBLFFBQUlILEtBQUssR0FBR2IsRUFBRSxDQUFDYSxLQUFILEdBQVdLLFFBQVgsQ0FBb0JOLE1BQXBCLEVBQTRCSyxRQUE1QixFQUFzQ0UsSUFBdEMsQ0FBMkMsS0FBS0MsYUFBaEQsRUFBK0QsSUFBL0QsQ0FBWixDQVBZLENBT3NFO0FBQ2xGOztBQUNBLFdBQU9wQixFQUFFLENBQUNhLEtBQUgsR0FBV1EsYUFBWCxDQUF5QlIsS0FBekIsQ0FBUDtBQUNILEdBMUNJO0FBMkNMUyxFQUFBQSxTQTNDSyxxQkEyQ0tDLEtBM0NMLEVBMkNZO0FBQ2I7QUFDQSxZQUFRQSxLQUFLLENBQUNDLE9BQWQ7QUFDSSxXQUFLeEIsRUFBRSxDQUFDeUIsS0FBSCxDQUFTQyxHQUFULENBQWFDLENBQWxCO0FBQ0ksYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQTs7QUFDSixXQUFLNUIsRUFBRSxDQUFDeUIsS0FBSCxDQUFTQyxHQUFULENBQWFHLENBQWxCO0FBQ0ksYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBO0FBTlI7QUFRSCxHQXJESTtBQXVETEMsRUFBQUEsT0F2REssbUJBdURHUixLQXZESCxFQXVEVTtBQUNYO0FBQ0EsWUFBUUEsS0FBSyxDQUFDQyxPQUFkO0FBQ0ksV0FBS3hCLEVBQUUsQ0FBQ3lCLEtBQUgsQ0FBU0MsR0FBVCxDQUFhQyxDQUFsQjtBQUNJLGFBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0E7O0FBQ0osV0FBSzVCLEVBQUUsQ0FBQ3lCLEtBQUgsQ0FBU0MsR0FBVCxDQUFhRyxDQUFsQjtBQUNJLGFBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQTtBQU5SO0FBUUgsR0FqRUk7QUFrRUxWLEVBQUFBLGFBQWEsRUFBRSx5QkFBVztBQUN0QjtBQUNBcEIsSUFBQUEsRUFBRSxDQUFDZ0MsV0FBSCxDQUFlQyxVQUFmLENBQTBCLEtBQUt6QixTQUEvQixFQUEwQyxLQUExQztBQUNILEdBckVJO0FBdUVMO0FBRUEwQixFQUFBQSxNQXpFSyxvQkF5RUk7QUFDTCxRQUFJQyxVQUFVLEdBQUcsS0FBS3hCLGFBQUwsRUFBakI7QUFDQVgsSUFBQUEsRUFBRSxDQUFDYSxLQUFILENBQVMsS0FBS3VCLElBQWQsRUFBb0JDLElBQXBCLENBQXlCRixVQUF6QixFQUFxQ0csS0FBckMsR0FGSyxDQUdEOztBQUNKLFNBQUtWLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQixLQUFoQixDQUxLLENBTUw7O0FBQ0EsU0FBS1MsTUFBTCxHQUFjLENBQWQsQ0FQSyxDQVNMOztBQUNBdkMsSUFBQUEsRUFBRSxDQUFDd0MsV0FBSCxDQUFlQyxFQUFmLENBQWtCekMsRUFBRSxDQUFDMEMsV0FBSCxDQUFlQyxTQUFmLENBQXlCQyxRQUEzQyxFQUFxRCxLQUFLdEIsU0FBMUQsRUFBcUUsSUFBckU7QUFDQXRCLElBQUFBLEVBQUUsQ0FBQ3dDLFdBQUgsQ0FBZUMsRUFBZixDQUFrQnpDLEVBQUUsQ0FBQzBDLFdBQUgsQ0FBZUMsU0FBZixDQUF5QkUsTUFBM0MsRUFBbUQsS0FBS2QsT0FBeEQsRUFBaUUsSUFBakU7QUFDSCxHQXJGSTtBQXNGTGUsRUFBQUEsU0F0RkssdUJBc0ZPO0FBQ1I7QUFDQTlDLElBQUFBLEVBQUUsQ0FBQ3dDLFdBQUgsQ0FBZU8sR0FBZixDQUFtQi9DLEVBQUUsQ0FBQzBDLFdBQUgsQ0FBZUMsU0FBZixDQUF5QkMsUUFBNUMsRUFBc0QsS0FBS3RCLFNBQTNELEVBQXNFLElBQXRFO0FBQ0F0QixJQUFBQSxFQUFFLENBQUN3QyxXQUFILENBQWVPLEdBQWYsQ0FBbUIvQyxFQUFFLENBQUMwQyxXQUFILENBQWVDLFNBQWYsQ0FBeUJFLE1BQTVDLEVBQW9ELEtBQUtkLE9BQXpELEVBQWtFLElBQWxFO0FBQ0gsR0ExRkk7QUE0RkxPLEVBQUFBLEtBNUZLLG1CQTRGRyxDQUVQLENBOUZJO0FBZ0dMVSxFQUFBQSxNQWhHSyxrQkFnR0VDLEVBaEdGLEVBZ0dNO0FBQ1A7QUFDQSxRQUFJLEtBQUtyQixPQUFULEVBQWtCO0FBQ2QsV0FBS1csTUFBTCxJQUFlLEtBQUtoQyxLQUFMLEdBQWEwQyxFQUE1QjtBQUNILEtBRkQsTUFFTyxJQUFJLEtBQUtuQixRQUFULEVBQW1CO0FBQ3RCLFdBQUtTLE1BQUwsSUFBZSxLQUFLaEMsS0FBTCxHQUFhMEMsRUFBNUI7QUFDSCxLQU5NLENBUVA7OztBQUNBLFFBQUlDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtaLE1BQWQsSUFBd0IsS0FBS2pDLFlBQWpDLEVBQStDO0FBQzNDO0FBQ0EsV0FBS2lDLE1BQUwsR0FBYyxLQUFLakMsWUFBTCxHQUFvQixLQUFLaUMsTUFBekIsR0FBa0NXLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtaLE1BQWQsQ0FBaEQ7QUFDSCxLQVpNLENBY1A7OztBQUNBLFFBQU1hLFFBQVEsR0FBRyxLQUFLaEIsSUFBTCxDQUFVaUIsTUFBVixDQUFpQkMsS0FBakIsR0FBeUIsQ0FBekIsR0FBNkIsS0FBS2xCLElBQUwsQ0FBVWtCLEtBQVYsR0FBa0IsQ0FBaEU7O0FBQ0EsUUFBSSxLQUFLbEIsSUFBTCxDQUFVbUIsQ0FBVixHQUFlLENBQUNILFFBQUQsR0FBWSxLQUFLYixNQUFMLEdBQWNVLEVBQXpDLElBQWdELEtBQUtiLElBQUwsQ0FBVW1CLENBQVYsR0FBZUgsUUFBUSxHQUFHLEtBQUtiLE1BQUwsR0FBY1UsRUFBNUYsRUFBaUc7QUFDN0YsV0FBS2IsSUFBTCxDQUFVbUIsQ0FBVixJQUFlLEtBQUtoQixNQUFMLEdBQWNVLEVBQTdCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS1YsTUFBTCxHQUFjLENBQWQsQ0FERyxDQUNjO0FBQ3BCO0FBQ0o7QUFySEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5Li76KeS6Lez6LeD6auY5bqmXG4gICAgICAgIGp1bXBIZWlnaHQ6IDEwMDAsXG4gICAgICAgIC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxuICAgICAgICBqdW1wRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOacgOWkp+enu+WKqOmAn+W6plxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDAsXG4gICAgICAgIC8vIOWKoOmAn+W6plxuICAgICAgICBhY2NlbDogMCxcbiAgICAgICAganVtcEF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcbiAgICBydW5KdW1wQWN0aW9uKCkge1xuICAgICAgICAvLyDot7Pot4PkuIrljYdcbiAgICAgICAgdmFyIGp1bXBVcCA9IGNjLnR3ZWVuKCkuYnkodGhpcy5qdW1wRHVyYXRpb24sIHsgeTogdGhpcy5qdW1wSGVpZ2h0IH0sIHsgZWFzaW5nOiAnc2luZU91dCcgfSk7XG4gICAgICAgIC8vIOS4i+iQvVxuICAgICAgICB2YXIganVtcERvd24gPSBjYy50d2VlbigpLmJ5KHRoaXMuanVtcER1cmF0aW9uLCB7IHk6IC10aGlzLmp1bXBIZWlnaHQgfSwgeyBlYXNpbmc6ICdzaW5lSW4nIH0pO1xuXG4gICAgICAgIC8vIOWIm+W7uuS4gOS4que8k+WKqO+8jOaMiSBqdW1wVXDjgIFqdW1wRG93biDnmoTpobrluo/miafooYzliqjkvZxcbiAgICAgICAgdmFyIHR3ZWVuID0gY2MudHdlZW4oKS5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duKS5jYWxsKHRoaXMucGxheUp1bXBTb3VuZCwgdGhpcyk7IC8vIOa3u+WKoOS4gOS4quWbnuiwg+WHveaVsO+8jOWcqOWJjemdoueahOWKqOS9nOmDvee7k+adn+aXtuiwg+eUqOaIkeS7rOWumuS5ieeahCBwbGF5SnVtcFNvdW5kKCkg5pa55rOVXG4gICAgICAgIC8vIOS4jeaWremHjeWkjVxuICAgICAgICByZXR1cm4gY2MudHdlZW4oKS5yZXBlYXRGb3JldmVyKHR3ZWVuKTtcbiAgICB9LFxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICAvLyBzZXQgYSBmbGFnIHdoZW4ga2V5IHByZXNzZWRcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kOlxuICAgICAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgLy8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g6LCD55So5aOw6Z+z5byV5pOO5pKt5pS+5aOw6Z+zXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5qdW1wQXVkaW8sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBqdW1wQWN0aW9uID0gdGhpcy5ydW5KdW1wQWN0aW9uKCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudGhlbihqdW1wQWN0aW9uKS5zdGFydCgpXG4gICAgICAgICAgICAvLyDliqDpgJ/luqbmlrnlkJHlvIDlhbNcbiAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgLy8g5Li76KeS5b2T5YmN5rC05bmz5pa55ZCR6YCf5bqmXG4gICAgICAgIHRoaXMueFNwZWVkID0gMDtcblxuICAgICAgICAvLyDliJ3lp4vljJbplK7nm5jovpPlhaXnm5HlkKxcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIOWPlua2iOmUruebmOi+k+WFpeebkeWQrFxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy8g5qC55o2u5b2T5YmN5Yqg6YCf5bqm5pa55ZCR5q+P5bin5pu05paw6YCf5bqmXG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDpmZDliLbkuLvop5LnmoTpgJ/luqbkuI3og73otoXov4fmnIDlpKflgLxcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueFNwZWVkKSA+IHRoaXMubWF4TW92ZVNwZWVkKSB7XG4gICAgICAgICAgICAvLyBpZiBzcGVlZCByZWFjaCBsaW1pdCwgdXNlIG1heCBzcGVlZCB3aXRoIGN1cnJlbnQgZGlyZWN0aW9uXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IHRoaXMubWF4TW92ZVNwZWVkICogdGhpcy54U3BlZWQgLyBNYXRoLmFicyh0aGlzLnhTcGVlZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmoLnmja7lvZPliY3pgJ/luqbmm7TmlrDkuLvop5LnmoTkvY3nva7vvIjkuI3og73otoXov4fop4bnqpflpKflsI/vvIlcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLm5vZGUucGFyZW50LndpZHRoIC8gMiAtIHRoaXMubm9kZS53aWR0aCAvIDJcbiAgICAgICAgaWYgKHRoaXMubm9kZS54ID4gKC1kaXN0YW5jZSAtIHRoaXMueFNwZWVkICogZHQpICYmIHRoaXMubm9kZS54IDwgKGRpc3RhbmNlIC0gdGhpcy54U3BlZWQgKiBkdCkpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IDA7IC8vIOi2hei/h+inhueql+aXtuS7pOWFtumAn+W6puS4uumbtu+8jOi/meagt+WPr+S7peW/q+mAn+WIh+aNouaWueWQkVxuICAgICAgICB9XG4gICAgfSxcbn0pOyJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Begin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70740xg1vhOkKD6EiULw5W2', 'Begin');
// scripts/Begin.js

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
    isBegin: false // foo: {
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
  onLoad: function onLoad() {},
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0JlZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaXNCZWdpbiIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFLEtBREQsQ0FFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBaEJJLEdBSFA7QUFzQkw7QUFFQUMsRUFBQUEsTUF4Qkssb0JBd0JJLENBQUUsQ0F4Qk47QUEwQkxDLEVBQUFBLEtBMUJLLG1CQTBCRyxDQUVQLENBNUJJLENBOEJMOztBQTlCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpc0JlZ2luOiBmYWxzZVxuICAgICAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTsiXX0=
//------QC-SOURCE-SPLIT------
