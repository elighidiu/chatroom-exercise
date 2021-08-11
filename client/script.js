   //define the socket
  let socket = io.connect();

  let inputField = document.getElementById("message");
  let buttonAll = document.getElementById("all");
  
  socket.on('chat message', (message) =>{
    displayMessage(message);
  })

  const sendMessageToAll = () =>{
    let inputField = document.querySelector(".message");
    let inputMessage = inputField.value;
    socket.emit('chat message', inputMessage);
  }

  function displayMessage(e){
      let par = document.createElement("p");
      const newContent = document.createTextNode(`${e}`);
      par.appendChild(newContent);
      const currentDiv = document.getElementById("messages");
      currentDiv.appendChild(par);
  }
 