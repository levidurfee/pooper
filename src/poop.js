class poop {
    constructor(statusElId = 'status') {
        this.statusElId = statusElId;
    }

    /**
     * Listen for a user logging in.
     *
     * @param {string} loginElId    ID of login button
     * @param {string} emailElId    ID of email input
     * @param {string} passwordElId ID of password input
     */
    login(loginElId = 'login', emailElId = 'email', passwordElId = 'password') {
        let loginBtn = document.getElementById(loginElId);

        // listen for someone to click the login button
        loginBtn.onclick = () => {
            // get some elements
            let email = document.getElementById(emailElId).value;
            let password = document.getElementById(passwordElId).value;

            // try and login via firebase
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
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
    listen(shitElId = 'shit', wipeElId = 'wipe', textElId = 'text', pooperElId = 'pooper') {
        // get a reference to the database location.
        let toilet = firebase.database().ref('shitter/');

        // select some elements
        let shit = document.getElementById(shitElId);
        let wipe = document.getElementById(wipeElId);
        let text = document.getElementById(textElId);
        let poop = document.getElementById(pooperElId);

        // wait and listen to see if there is a new value added
        toilet.on('value', (s) => {
            text.innerHTML = s.val().text;      // update status text
            poop.innerHTML = s.val().pooper;    // update latest pooper

            if(s.val().available === false) {
                // if toilet isn't available
                wipe.disabled = false;          // enable wipe button
                shit.disabled = true;           // disable poop button
                this.close();                   // change image
            } else {
                // if toilet is available
                wipe.disabled = true;           // disable wipe button
                shit.disabled = false;          // enable poop button
                this.open();                    // change image
            }
        });

        return this;
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
        let status = document.getElementById(this.statusElId);
        status.innerHTML = '';
        this.status = status;
    }

    main() {
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
    }

    static run() {
        return new poop().login().listen().main();
    }
}

