
class poop {
    login() {
        let loginBtn = document.getElementById('login');

        loginBtn.onclick = () => {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
                console.error(error.message);
            });
        };
    }

    listen() {
        let toilet = firebase.database().ref('shitter/available');
        let shit = document.getElementById('shit');
        let wipe = document.getElementById('wipe');
        toilet.on('value', (s) => {
            if(s.val() === false) {
                wipe.disabled = false;
                shit.disabled = true;
                this.close();
            } else {
                this.open();
                wipe.disabled = true;
                shit.disabled = false;
            }
        });
    }

    open() {
        this.clear();
        let status = document.getElementById('status');
        let image = document.createElement('img');
        image.src = '/open.gif';
        status.appendChild(image);
    }

    close() {
        this.clear();
        let image = document.createElement('img');
        image.src = '/closed.jpg';
        this.status.appendChild(image);
    }

    clear() {
        let status = document.getElementById('status');
        status.innerHTML = '';
        this.status = status;
    }
}

let p = new poop();
p.login();
p.listen();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let l = document.getElementById('login__form');
    l.style.display = 'none';
    let gp = document.getElementById('gotta_poop');
    gp.style.display = 'block';
    let shit = document.getElementById('shit');

    let uid = firebase.auth().currentUser.uid;

    let db = firebase.database();
    shit.onclick = () => {

        db.ref('poopers/' + uid).push({
            'available': false,
            'timestamp': Date.now(),
            'user': user.email
        }).then( () => {
            firebase.database().ref('shitter/').set({available: false});
        });

    };

    let wipe = document.getElementById('wipe');
    wipe.onclick = () => {

        db.ref('poopers/' + uid).push({
            'available': true,
            'timestamp': Date.now(),
            'user': user.email
        }).then( () => {
            firebase.database().ref('shitter/').set({available: true});
        });

    };
  }
});

