var SaveElementScreenshotAction, easyimg, events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

events = require('events');

easyimg = require('easyimage');

SaveElementScreenshotAction = (function(_super) {
  __extends(SaveElementScreenshotAction, _super);

  function SaveElementScreenshotAction() {
    return SaveElementScreenshotAction.__super__.constructor.apply(this, arguments);
  }

  SaveElementScreenshotAction.prototype.command = function(elementSelector, fileName) {
    this.api.getElementSize(elementSelector, (function(_this) {
      return function(sizeResult) {
        return _this.api.getLocation(elementSelector, function(locationResult) {
          return _this.api.saveScreenshot(fileName, function() {
            return _this.crop(fileName, sizeResult.value, locationResult.value);
          });
        });
      };
    })(this));
    return this;
  };

  SaveElementScreenshotAction.prototype.crop = function(fileName, size, location) {
    easyimg.crop({
      src: fileName,
      dst: fileName,
      cropwidth: size.width,
      cropheight: size.height,
      x: location.x,
      y: location.y,
      gravity: 'North-West'
    }).then((function(_this) {
      return function(file) {
        return _this.emit("complete");
      };
    })(this), (function(_this) {
      return function(err) {
        console.error(err);
        return _this.emit("complete");
      };
    })(this));
  };

  return SaveElementScreenshotAction;

})(events.EventEmitter);

module.exports = SaveElementScreenshotAction;
