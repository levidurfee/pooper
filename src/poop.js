class poop {
    /**
     * login event listener
     */
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

    /**
     * listen for changes to the database then update the page
     */
    listen() {
        let self = this;
        let toilet = firebase.database().ref('shitter/');
        let shit = document.getElementById('shit');
        let wipe = document.getElementById('wipe');
        let text = document.getElementById('text');
        let poop = document.getElementById('pooper');
        toilet.on('value', (s) => {
            text.innerHTML = s.val().text;
            poop.innerHTML = s.val().pooper;
            if(s.val().available === false) {
                wipe.disabled = false;
                shit.disabled = true;
                this.close();
            } else {
                wipe.disabled = true;
                shit.disabled = false;
                this.open();
            }
        });
    }

    /**
     * show the opened image
     */
    open() {
        this.clear();
        let image = document.createElement('img');
        image.src = '/open.gif';
        this.status.appendChild(image);
    }

    /**
     * Show the closed image
     */
    close() {
        this.clear();
        let image = document.createElement('img');
        image.src = '/closed.jpg';
        this.status.appendChild(image);
    }

    /**
     * empty out the #status div
     */
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
  // if user logs in
  if (user) {
    let l = document.getElementById('login__form');
    let gp = document.getElementById('gotta_poop');
    let shit = document.getElementById('shit');
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.database();
    
    l.style.display = 'none';
    gp.style.display = 'block';

    shit.onclick = () => {

        db.ref('poopers/' + uid).push({
            'available': false,
            'timestamp': Date.now(),
            'user': user.email
        }).then( () => {
            firebase.database().ref('shitter/').set({
                'available': false,
                'pooper': user.email,
                'text': 'current pooper'
            });
        });

    };

    let wipe = document.getElementById('wipe');
    wipe.onclick = () => {

        db.ref('poopers/' + uid).push({
            'available': true,
            'timestamp': Date.now(),
            'user': user.email
        }).then( () => {
            firebase.database().ref('shitter/').set({
                'available': true,
                'pooper': user.email,
                'text': 'previous pooooper'
            });
        });

    };
  }
});

