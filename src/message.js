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

  submit() {

    return this;
  }

  listen() {

    return this;
  }

  getEl(elId) {
    return document.getElementById(elId);
  }
}
