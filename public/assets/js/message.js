'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var message = function () {
  function message() {
    var messageInputElId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new_message';
    var messageSubmitElId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'submit_message';
    var messageOutputElId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'messages';

    _classCallCheck(this, message);

    this.messageInputEl = this.getEl(messageInputElId);
    this.messageSubmitEl = this.getEl(messageSubmitElId);
    this.messageOutputEl = this.getEl(messageOutputElId);
  }

  _createClass(message, [{
    key: 'getEl',
    value: function getEl(elId) {
      return document.getElementById(elId);
    }
  }]);

  return message;
}();