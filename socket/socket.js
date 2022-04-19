const io = require("socket.io")();
const socketapi = {
    io: io
};
// Add your socket.io logic here!
//socket.io 
var { MyFirst, worked } = require('../socket/first');

const users = {};
io.on("connection", (socket) => {
    MyFirst(socket.id)

    //new user join event
    socket.on('new-user', (name) => {
        console.log("new user " + name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    })
    //msg event
    socket.on("send", (message) => {
        socket.broadcast.emit("receive", { message: message, name: users[socket.id] });
    })

    //left event
    socket.on("disconnect", message => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    })
})
// end of socket.io logic

module.exports = socketapi;