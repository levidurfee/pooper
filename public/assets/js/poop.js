'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var poop = function () {
  function poop() {
    var statusElId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'status';

    _classCallCheck(this, poop);

    this.statusElId = statusElId;
  }

  /**
   * Listen for a user logging in.
   *
   * @param {string} loginElId    ID of login button
   * @param {string} emailElId    ID of email input
   * @param {string} passwordElId ID of password input
   */


  _createClass(poop, [{
    key: 'login',
    value: function login() {
      var loginElId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login';
      var emailElId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'email';
      var passwordElId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'password';

      var loginBtn = document.getElementById(loginElId);
      // listen for someone to click the login button
      loginBtn.onclick = function () {
        // get some elements
        var email = document.getElementById(emailElId).value;
        var password = document.getElementById(passwordElId).value;

        // try and login via firebase
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          console.error(error.message);
        });
      };

      return this;
    }

    /**
     * listen for changes to the database then update the page
     *
     * @param {string} shitElId     ID of button for going to poop
     * @param {string} wipeElId     ID of button when doing pooping
     * @param {string} textElId     ID of span for status text
     * @param {string} pooperElId   ID of span for person pooper
     */

  }, {
    key: 'listen',
    value: function listen() {
      var shitElId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'shit';
      var wipeElId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'wipe';

      var _this = this;

      var textElId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';
      var pooperElId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'pooper';

      // get a reference to the database location.
      var toilet = firebase.database().ref('shitter/');

      // select some elements
      var shit = document.getElementById(shitElId);
      var wipe = document.getElementById(wipeElId);
      var text = document.getElementById(textElId);
      var poop = document.getElementById(pooperElId);

      // wait and listen to see if there is a new value added
      toilet.on('value', function (s) {
        text.innerHTML = s.val().text; // update status text
        poop.innerHTML = s.val().pooper; // update latest pooper

        if (s.val().available === false) {
          // if toilet isn't available
          wipe.disabled = false; // enable wipe button
          shit.disabled = true; // disable poop button
          _this.close(); // change image
        } else {
          // if toilet is available
          wipe.disabled = true; // disable wipe button
          shit.disabled = false; // enable poop button
          _this.open(); // change image
        }
      });

      return this;
    }

    /**
     * show the opened image
     */

  }, {
    key: 'open',
    value: function open() {
      this.clear();
      var image = document.createElement('img');
      image.src = '/assets/images/open.gif';
      this.status.appendChild(image);
    }

    /**
     * Show the closed image
     */

  }, {
    key: 'close',
    value: function close() {
      this.clear();
      var image = document.createElement('img');
      image.src = '/assets/images/closed.jpg';
      this.status.appendChild(image);
    }

    /**
     * empty out the #status div
     */

  }, {
    key: 'clear',
    value: function clear() {
      var status = document.getElementById(this.statusElId);
      status.innerHTML = '';
      this.status = status;
    }
  }, {
    key: 'main',
    value: function main(loginFormElId, gottaPoopElId, shitElId) {
      firebase.auth().onAuthStateChanged(function (user) {
        // if user logs in
        if (user) {
          var l = document.getElementById(loginFormElId);
          var gp = document.getElementById(gottaPoopElId);
          var shit = document.getElementById(shitElId);
          var uid = firebase.auth().currentUser.uid;
          var db = firebase.database();

          l.style.display = 'none';
          gp.style.display = 'block';

          shit.onclick = function () {

            db.ref('poopers/' + uid).push({
              'available': false,
              'timestamp': Date.now(),
              'user': user.email
            }).then(function () {
              firebase.database().ref('shitter/').set({
                'available': false,
                'pooper': user.email,
                'text': 'current pooper'
              });
            });
          };

          var wipe = document.getElementById('wipe');
          wipe.onclick = function () {

            db.ref('poopers/' + uid).push({
              'available': true,
              'timestamp': Date.now(),
              'user': user.email
            }).then(function () {
              firebase.database().ref('shitter/').set({
                'available': true,
                'pooper': user.email,
                'text': 'previous pooooper'
              });
            });
          };
        }
      });
    }
  }], [{
    key: 'run',
    value: function run() {
      var loginFormElId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login__form';
      var gottaPoopElId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'gotta_poop';
      var shitElId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'shit';

      return new poop().login().listen().main(loginFormElId, gottaPoopElId, shitElId);
    }
  }]);

  return poop;
}();