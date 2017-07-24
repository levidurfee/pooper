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
    key: 'submitHandler',
    value: function submitHandler() {
      var _this = this;

      this.messageSubmitEl.onclick = function () {
        _this.send();
      };

      this.messageInputEl.onkeyup = function (e) {
        if (e.keyCode === 13) {
          _this.send();
        }
      };

      return this;
    }
  }, {
    key: 'send',
    value: function send() {
      var value = this.messageInputEl.value;
      var db = firebase.database();
      var email = firebase.auth().currentUser.email;

      if (value.length === 0) {
        return;
      }

      db.ref('board/').push({
        'message': value,
        'timestamp': Date.now(),
        'email': email
      });

      this.messageInputEl.value = '';
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      var div = void 0,
          message = void 0;

      var board = firebase.database().ref('board/').limitToLast(50);
      board.on('child_added', function (s) {
        message = document.createTextNode(s.val().email + ' [' + _this2.time(s.val().timestamp) + ']: ' + s.val().message);
        div = document.createElement('div');
        div.appendChild(message);
        _this2.messageOutputEl.appendChild(div);
      });

      return this;
    }
  }, {
    key: 'time',
    value: function time(timestamp) {
      var d = new Date(timestamp);
      var hours = void 0;
      var to_return = void 0;
      var ampm = void 0;

      if (d.getHours() > 12) {
        hours = d.getHours() - 12;
      } else {
        hours = d.getHours();
      }

      if (d.getHours() >= 12) {
        ampm = 'pm';
      } else {
        ampm = 'am';
      }

      to_return = hours + ':' + d.getMinutes() + ampm;

      return to_return;
    }
  }, {
    key: 'getEl',
    value: function getEl(elId) {
      return document.getElementById(elId);
    }
  }]);

  return message;
}();