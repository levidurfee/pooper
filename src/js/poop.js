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
  listen(
    shitElId = 'shit', 
    wipeElId = 'wipe', 
    textElId = 'text', 
    pooperElId = 'pooper',
    timeElId = 'time') {
    // get a reference to the database location.
    let toilet = firebase.database().ref('shitter/');

    // select some elements
    let shit = document.getElementById(shitElId);
    let wipe = document.getElementById(wipeElId);
    let text = document.getElementById(textElId);
    let poop = document.getElementById(pooperElId);
    let time = document.getElementById(timeElId);

    // wait and listen to see if there is a new value added
    toilet.on('value', (s) => {
      text.innerHTML = s.val().text;      // update status text
      poop.innerHTML = s.val().pooper;    // update latest pooper
      time.innerHTML = this.time(s.val().timestamp);

      if(s.val().available === false) {
        // if toilet isn't available
        if(firebase.auth().currentUser.email === 
          document.getElementById('pooper').innerHTML) {
          wipe.disabled = false;
        }
        //wipe.disabled = false;          // enable wipe button
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

  prrt() {
    let prtEl = document.getElementById('prrt');
    prtEl.play();
  }

  flush() {
    let flushEl = document.getElementById('flush');
    flushEl.play();
  }

  /**
   * show the opened image
   */
  open() {
    this.clear();
    let image = document.createElement('img');
    image.src = '/assets/images/open.gif';
    this.status.appendChild(image);
    this.flush();
  }

  /**
   * Show the closed image
   */
  close() {
    this.clear();
    let image = document.createElement('img');
    image.src = '/assets/images/closed.jpg';
    this.status.appendChild(image);
    this.prrt();
  }

  /**
   * empty out the #status div
   */
  clear() {
    let status = document.getElementById(this.statusElId);
    status.innerHTML = '';
    this.status = status;
  }

  time(timestamp) {
    let d = new Date(timestamp);
    let hours;
    let to_return;

    if(d.getHours() > 12) {
      hours = d.getHours() - 12;
    } else {
      hours = d.getHours();
    }

    to_return = d.getFullYear() + '/' 
            + (parseInt(d.getMonth(), 10) + 1).toString() + '/' 
            + d.getDate() + ' ' 
            + hours + ':' 
            + d.getMinutes() + ':' 
            + d.getSeconds();

    return to_return;
  }

  main(loginFormElId, gottaPoopElId, shitElId) {
    firebase.auth().onAuthStateChanged(function(user) {
      // if user logs in
      if (user) {
        let l = document.getElementById(loginFormElId);
        let gp = document.getElementById(gottaPoopElId);
        let shit = document.getElementById(shitElId);
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
              'timestamp': Date.now(),
              'text': 'current pooper:'
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
              'timestamp': Date.now(),
              'text': 'previous pooooper:'
            });
          });

        };
      }
    });
  }

  static run(loginFormElId = 'login__form', gottaPoopElId = 'gotta_poop', shitElId = 'shit') {
    return new poop().login().listen().main(loginFormElId, gottaPoopElId, shitElId);
  }
}

