   //define the socket
  let socket = io.connect();

  let username = prompt('Enter a username');
  displayMessage(`✋ Welcome, ${username}!`);
 // sent the message & the username to the server
 socket.emit('new-user', username);
  
  socket.on('chat message', (message) =>{
    //display the username and the message of that user
    displayMessage(`${message.username}: ${message.message}`);
  })

  socket.on('user-connected', (username) =>{
    displayMessage(`${username} joined the chat..`);
  })

  const sendMessageToAll = () =>{
    let inputField = document.querySelector(".message");
    let inputMessage = inputField.value;
    socket.emit('sendToAll', inputMessage);
  }

  const sendMessageToMe = () =>{
    let inputField = document.querySelector(".message");
    let inputMessage = inputField.value;
    socket.emit('sendToMe', inputMessage);
  }

  function displayMessage(e){
      let par = document.createElement("p");
      const newContent = document.createTextNode(`${e}`);
      par.appendChild(newContent);
      const currentDiv = document.getElementById("messages");
      currentDiv.appendChild(par);
  }
 