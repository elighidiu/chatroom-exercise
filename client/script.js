   //define the socket
  let socket = io.connect();
  
  socket.on('chat message', (message) =>{
    displayMessage(message);
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
 