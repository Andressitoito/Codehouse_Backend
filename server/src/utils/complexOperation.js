export function operacionCompleja() {
	let result = 0;

	for (let i = 0; i < 9e9; i++) {
		result += i;
	}

	return result;
}

process.on('message_from_child_process', message => {

 console.log(message)
	let result = 0;

	for (let i = 0; i < 9e9; i++) {
		result += i;
	}

	return result;

 process.send(result)

})