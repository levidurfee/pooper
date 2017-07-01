class poop {
    /**
     * Listen for a user logging in.
     *
     * @param {string} loginElId    ID of login button
     * @param {string} emailElId    ID of email input
     * @param {string} passwordElId ID of password input
     */
    login(loginElId = 'login', emailElId = 'email', passwordElId = 'password') {
        let loginBtn = document.getElementById(loginElId);

        loginBtn.onclick = () => {
            let email = document.getElementById(emailElId).value;
            let password = document.getElementById(passwordElId).value;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
                console.error(error.message);
            });
        };
    }

    /**
     * listen for changes to the database then update the page
     *
     * @param {string} shitElId     ID of button for going to poop
     * @param {string} wipeElId     ID of button when doing pooping
     * @param {string} textElId     ID of span for status text
     * @param {string} pooperElId   ID of span for person pooper
     */
    listen(shitElId = 'shit', wipeElId = 'wipe', textElId = 'text', pooperElId = 'pooper') {
        let toilet = firebase.database().ref('shitter/');
        let shit = document.getElementById(shitElId);
        let wipe = document.getElementById(wipeElId);
        let text = document.getElementById(textElId);
        let poop = document.getElementById(pooperElId);
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

