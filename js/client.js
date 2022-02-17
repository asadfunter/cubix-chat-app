const socket = io(`https://chat-app-cubix.herokuapp.com:${process.env.PORT || 8000}`);

const form = document.getElementById('send-message');
const msgInput = document.getElementById('message_input');
const messageContainer = document.querySelector('.messages');

const append = (message, position, noImage = false) => {
    const messageElement = document.createElement('li');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('avatar');
    messageElement.append(imageDiv);
    console.log(messageElement);
    const html = '<li class="message ' + position + ' appeared"> <div class="avatar"></div><div class="text_wrapper"><div class="text">' + message + '</div></div></li>'
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    $('.messages').append(html);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';

})

const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    console.log("ASDsad");
    append(`${name} joined the chat`, 'right', true);
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
    $('.chat_window').animate({ scrollTop: document.body.scrollHeight }, "fast");
})

socket.on('left', name => {
    if (name != null) {
        append(`${name} left the chat`, 'right');
    }
})