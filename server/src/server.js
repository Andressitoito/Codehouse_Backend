/////////////////////////////
// IMPORTS
/////////////////////////////
import server from "./app.js";
import { Server } from "socket.io";
import "dotenv/config.js";

/////////////////////////////
// VARIABLES
/////////////////////////////
const PORT = process.env.PORT;
let ready = () => {
	console.log(`Server ready on port ${PORT}`);
};

console.log("process.env.PORT ", process.env.PORT)

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
