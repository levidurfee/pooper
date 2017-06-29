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
            var toilet = firebase.database().ref('available');
            var shit = document.getElementById('shit');
            var wipe = document.getElementById('wipe');
            toilet.on('value', function (s) {
                console.log(s.val());
                if (s.val() === false) {
                    wipe.disabled = false;
                    shit.disabled = true;
                } else {
                    wipe.disabled = true;
                    shit.disabled = false;
                }
            });
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

            db.ref('poopers').push({
                available: false,
                'timestamp': Date.now()
            }).then(function () {
                firebase.database().ref('/').set({ available: false });
            });
        };

        var wipe = document.getElementById('wipe');
        wipe.onclick = function () {

            db.ref('poopers').push({
                available: true,
                'timestamp': Date.now()
            }).then(function () {
                firebase.database().ref('/').set({ available: true });
            });
        };
    }
});