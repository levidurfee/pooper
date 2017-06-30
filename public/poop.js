'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var poop = function () {
    function poop() {
        _classCallCheck(this, poop);
    }

    _createClass(poop, [{
        key: 'login',
        value: function login() {
            var loginBtn = document.getElementById('login');

            loginBtn.onclick = function () {
                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                    console.error(error.message);
                });
            };
        }
    }, {
        key: 'listen',
        value: function listen() {
            var _this = this;

            var self = this;
            var toilet = firebase.database().ref('shitter/');
            var shit = document.getElementById('shit');
            var wipe = document.getElementById('wipe');
            var text = document.getElementById('text');
            var poop = document.getElementById('pooper');
            toilet.on('value', function (s) {
                text.innerHTML = s.val().text;
                poop.innerHTML = s.val().pooper;
                if (s.val().available === false) {
                    wipe.disabled = false;
                    shit.disabled = true;
                    _this.close();
                } else {
                    wipe.disabled = true;
                    shit.disabled = false;
                    _this.open();
                }
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.clear();
            var status = document.getElementById('status');
            var image = document.createElement('img');
            image.src = '/open.gif';
            status.appendChild(image);
        }
    }, {
        key: 'close',
        value: function close() {
            this.clear();
            var image = document.createElement('img');
            image.src = '/closed.jpg';
            this.status.appendChild(image);
        }
    }, {
        key: 'clear',
        value: function clear() {
            var status = document.getElementById('status');
            status.innerHTML = '';
            this.status = status;
        }
    }]);

    return poop;
}();

var p = new poop();
p.login();
p.listen();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var l = document.getElementById('login__form');
        l.style.display = 'none';
        var gp = document.getElementById('gotta_poop');
        gp.style.display = 'block';
        var shit = document.getElementById('shit');

        var uid = firebase.auth().currentUser.uid;

        var db = firebase.database();
        shit.onclick = function () {

            db.ref('poopers/' + uid).push({
                'available': false,
                'timestamp': Date.now(),
                'user': user.email
            }).then(function () {
                firebase.database().ref('shitter/').set({
                    available: false,
                    pooper: user.email,
                    text: 'current pooper'
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
                    available: true,
                    pooper: user.email,
                    text: 'previous pooooper'
                });
            });
        };
    }
});