
const socket = io('http://localhost:4545')
socket.on('connection')

const form = document.getElementById('Send-Cont');
const messageInput = document.querySelector('.message')
const msgcont = document.getElementById('Datax')
const msgDiv = document.querySelector('.MsgDiv')
const audio = new Audio('tone.mp3')
console.log(msgDiv);

const appendFunc = (msg) => {
    console.log(msg);
    const msgElement = document.createElement('div');
    msgElement.classList.add('ml-auto')
    msgElement.classList.add('card')
    msgElement.classList.add('w-50')
    msgElement.style.width = '18rem';
    msgElement.style.marginTop = '10px';
    msgElement.style.marginLeft = 'auto'
    msgElement.style.color = 'green'
    msgDiv.appendChild(msgElement)
    const MsgX = document.createElement('div');
    MsgX.innerText = msg;
    MsgX.classList.add('card-body')
    msgElement.appendChild(MsgX)

}

const appendFunc1 = (msg) => {
    console.log(msg);
    const msgElement = document.createElement('div');
    msgElement.classList.add('card')
    msgElement.classList.add('w-50')
    msgElement.style.width = '18rem';
    msgElement.style.marginTop = '10px';
    msgElement.style.color = 'green'
    msgDiv.appendChild(msgElement)
    const MsgX = document.createElement('div');
    MsgX.innerText = msg;
    MsgX.classList.add('card-body')
    msgElement.appendChild(MsgX)
    audio.play()
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendFunc(`you: ${message}`)
    socket.emit('send', message)
    messageInput.value = ''
})
const UserName = prompt("enter your name to join")

socket.emit('new-user', UserName)

socket.on('user-joined', data => {
    console.log(data);
    appendFunc(`${data} Joined The Chat`)
})

socket.on('receive', (data) => {
    appendFunc1(` ${data.name}: ${data.message}`)
})

socket.on('left', (data) => {
    appendFunc1(` ${data} left the chat`)
})