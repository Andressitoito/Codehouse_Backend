document.querySelector("#register").addEventListener("click", (e) => {
	e.preventDefault();
	const email = document.querySelector("#email").value;
	console.log(email);

	fetch(`/api/cookies/set/${email}`)
		.then((res) => res.json())
		.then((res) => alert(res.message))
		.catch((err) => console.log(err));
});

document.querySelector("#cookie").addEventListener("click", (e) => {
	e.preventDefault();
	fetch("/api/cookies/get")
		.then((res) => res.json())
		.then((res) => alert(res.message))
		.catch((err) => console.log(err));
});
