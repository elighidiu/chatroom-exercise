   //define the socket
  let socket = io.connect();

  let allUsers= document.getElementById('allUsers');
  
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
    outputUser(`${username}`);
  })

 
  socket.on('user-disconnected', (username) =>{
    displayMessage(`${username} left the chat..`)
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
 
  function outputUser(e){
    let list = document.createElement("li");
    const newContent = document.createTextNode(e);
    list.appendChild(newContent);
    const unordered = document.querySelector("ul");
    unordered.appendChild(list);
  }