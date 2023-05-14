let socket = io()

let username

let name_ = 'Michael Jackson'

Swal.fire({
 title: "Write your name",
 input: "text",
 inputValue: name_,
 inputValidator: value => !value && 'Please write your name',
 allowOutsideClick: false,
 denyButtonText: "Cancel",
 showDenyButton: true,
}).then((result) => {
 if (result.dismiss === Swal.DismissReason.esc) {
  window.location.href = "/";
 }
 if (result.isDenied) {
  window.location.href = "/";
 }
 /////////////////////////////
 // USERNAME
 username = result.value
 document.querySelector('#username').innerHTML = username
});

/////////////////////////////
// CLIENT SOCKET EMIT
socket.emit('auth', username)

const send = (e) => {
 if (e.key === 'Enter') {
  socket.emit('new_message', {
   username,
   message: message_input.value
  })
  message_input.value = ''
 }
}

let message_input = document.querySelector('#message-input')
message_input.addEventListener('keyup', send)

socket.on('all_messages', (data) => {
 document.querySelector('#messages').innerHTML = data
  .map((message) => `<p class='text-break lh-1 mb-0'><span class='fw-bold'>${message.username}:</span> ${message.message}<p>`)
  .join("");
})