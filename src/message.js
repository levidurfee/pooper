class message {
	constructor(
    messageInputElId = 'new_message', 
    messageSubmitElId = 'submit_message',
    messageOutputElId = 'messages'
    ) {
    this.messageInputEl = this.getEl(messageInputElId);
    this.messageSubmitEl = this.getEl(messageSubmitElId);
    this.messageOutputEl = this.getEl(messageOutputElId);
  }

  submitHandler() {
    this.messageSubmitEl.onclick = () => {
      let value = this.messageInputEl.value;
      let db = firebase.database();
      let email = firebase.auth().currentUser.email;

      db.ref('board/').push({
        'message': value,
        'timestamp': Date.now(),
        'email': email
      });

      this.messageInputEl.value = '';
    };

    return this;
  }

  listen() {
    let div, message;

    let board = firebase.database().ref('board/').limitToLast(50);
    board.on('child_added', (s) => {      
      message = document.createTextNode(
        s.val().email + ' [' + this.time(s.val().timestamp) + ']: ' +
        s.val().message
      );
      div = document.createElement('div');
      div.appendChild(message);
      this.messageOutputEl.appendChild(div);
    });

    return this;
  }

  time(timestamp) {
    let d = new Date(timestamp);
    let hours;
    let to_return;
    let ampm;

    if(d.getHours() > 12) {
      hours = d.getHours() - 12;
    } else {
      hours = d.getHours();
    }

    if(d.getHours() >= 12) {
      ampm = 'pm';
    } else {
      ampm = 'am';
    }

    to_return =  
            hours + ':' 
            + d.getMinutes() + ampm;

    return to_return;
  }

  getEl(elId) {
    return document.getElementById(elId);
  }
}
