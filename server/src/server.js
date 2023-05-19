/////////////////////////////
// IMPORTS
/////////////////////////////
import server from "./app.js";
import { Server } from "socket.io";

/////////////////////////////
// VARIABLES
/////////////////////////////
const PORT = process.env.PORT || 8080;
let ready = () => {
	console.log(`Server ready on port ${PORT}`);
};

/////////////////////////////
// CHATS
/////////////////////////////
const chats = [];

/////////////////////////////
// SERVERS HTTP, SOCKET IO
/////////////////////////////
const http_server = server.listen(PORT, ready);
const socket_server = new Server(http_server);

/////////////////////////////
// SERVER UP
/////////////////////////////
socket_server.on("connection", (socket) => {
	/////////////////////////////
	// CLIENT SOCKET
	socket.on("auth", () => {
		socket_server.emit("all_messages", chats);
	});
	/////////////////////////////
	// MESSAGES SOCKET
	socket.on("new_message", (data) => {
		chats.push(data);
		socket_server.emit("all_messages", chats);
	});
	console.log(socket.client.id);
});
