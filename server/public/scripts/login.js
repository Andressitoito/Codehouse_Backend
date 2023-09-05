document.querySelector("#login").addEventListener("click", (e) => {
	e.preventDefault();

	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;

	console.log(email, password);

	fetch(`/api/sessions/login`, {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((res) => alert(res))
		.catch((err) => console.log(err));
});

document.querySelector("#signout").addEventListener("click", (e) => {
	e.preventDefault();

	fetch(`/api/sessions/signout`, {
		method: "POST",
	})
		.then((res) => res.json())
		.then((res) => alert(res))
		.catch((err) => console.log(err));
});

document.querySelector("#email").addEventListener("change", (e) => {
	e.preventDefault();

 console.log('sdfasdf')

	const email = document.querySelector("#email").value;

	if (email === "") {
		document.querySelector("#forgot-password").disabled = true;
	} else {
		document.querySelector("#forgot-password").disabled = false;
	}
});

console.log(document.querySelector("#email"))

document.querySelector("#forgot-password").addEventListener("click", (e) => {
	e.preventDefault();

	fetch(`/api/sessions/forgot-password`, {
		method: "POST",
		body: JSON.stringify({ email: document.querySelector("#email").value }),
	})
 .then(res => res.json())
 .then(data => console.log(data))

});
