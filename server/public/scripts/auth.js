////////////////////////////
// PATH PROTECTION
/////////////////////////////
let main_username = "";
function getCookieValue(name) {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		if (cookie.startsWith(name + "=")) {
			const value = cookie.substring(name.length + 1);
			return decodeURIComponent(value);
		}
	}

	return null;
}

const checkLog = async () => {
	const tokenStr = getCookieValue("token");

	const token = tokenStr;

	if (token) {
		const [header, payload, signature] = token.split(".");

		const decodedHeader = JSON.parse(atob(header));
		const decodedPayload = JSON.parse(atob(payload));

		console.log(decodedPayload);

		document.querySelector("#logout").classList.remove("hide");
		document.querySelector("#signup_menu").classList.add("hide");
		document.querySelector("#login_menu").classList.add("hide");

		const { role } = decodedPayload;

		if (role === 1) {
			document.querySelector("#add_mongo_product").classList.remove("hide");
			document.querySelector("#add_fs_product").classList.remove("hide");
		} else {
			document.querySelector("#add_mongo_product").classList.add("hide");
			document.querySelector("#add_fs_product").classList.add("hide");
		}
	} else {
		document.querySelector("#add_mongo_product").classList.add("hide");
		document.querySelector("#add_fs_product").classList.add("hide");
		document.querySelector("#logout").classList.add("hide");
		document.querySelector("#signup_menu").classList.remove("hide");
		document.querySelector("#login_menu").classList.remove("hide");
	}
};

checkLog();

////////////////////////////
// SIGN UP
/////////////////////////////
document.querySelector("#signup").addEventListener("click", async (e) => {
	e.preventDefault();
	const name = document.getElementById("signup_name").value.trim();
	const email = document.getElementById("signup_email").value.trim();
	const password = document.getElementById("signup_password").value.trim();
	const confirm_password = document
		.getElementById("confirm_password")
		.value.trim();

	if (
		name === "" ||
		email === "" ||
		password === "" ||
		password !== confirm_password
	) {
		Swal.fire({
			icon: "error",
			title: "Something went wrong!",
			html: `<p>Check user data, please</p>`,
			footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
		});

		return;
	} else {
		const res_user = await fetch(`/api/auth/register`, {
			method: "POST",
			body: JSON.stringify({ email, password, name }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data_user = await res_user.json();

		console.log(data_user);

		if (data_user.success) {
			console.log(data_user);

			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Saved!",
				html: `<p>${email} has been successfully registered!</p>`,
				showConfirmButton: false,
				timer: 2500,
				timerProgressBar: true,
				willClose: () => {
					window.location.href = "/";
				},
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Something went wrong!",
				html: `<p>${data_user.message}</p>`,
				footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
			});
		}
	}
});

/////////////////////////////
// LOGIN
/////////////////////////////
document.querySelector("#login").addEventListener("click", async (e) => {
	e.preventDefault();
	const email = document.querySelector("#login_email").value;
	const password = document.querySelector("#login_password").value;

	const res_user = await fetch(`/api/auth/signin`, {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data_user = await res_user.json();

	console.log(data_user);
	if (data_user.success) {
		checkLog();

		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Saved!",
			html: `<p>Welcome again ${data_user.username}!</p>`,
			showConfirmButton: false,
			timer: 2500,
			timerProgressBar: true,
			willClose: () => {
				window.location.href = "/";
			},
		});
	} else {
		Swal.fire({
			icon: "error",
			title: "Something went wrong!",
			html: `<p>${data_user.message}</p>`,
			footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
		});
	}
});

///////////////////////////
// SIGN OUT SESSIONS
///////////////////////////
document.querySelector("#session-logout").addEventListener("click", async (e) => {
	e.preventDefault();
	const res = await fetch(`/api/auth/signout/jwt`, {
		method: "POST",
	});

	const data = await res.json();

	console.log(data)

	// Swal.fire({
	// 	position: "top-end",
	// 	icon: "success",
	// 	title: `${data.message}`,
	// 	showConfirmButton: false,
	// 	willClose: () => {
	// 		window.location.href = "/";
	// 	},
	// 	timer: 1500,
	// });
	checkLog();
});

// ///////////////////////////
// SIGN OUT JWT
// ///////////////////////////
document.querySelector("#logout").addEventListener("click", async (e) => {
	e.preventDefault();

	const res = await fetch(`/api/auth/logout/jwt`, {
		method: "POST",
	});

	const data = await res.json();

	console.log(data)

	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "See you later!",
		html: `<p>${data.message}</p>`,
		showConfirmButton: false,
		willClose: () => {
			window.location.href = "/";
		},
		timer: 1500,
	});
	checkLog();
});

/////////////////////////////
// GIT LOGIN
/////////////////////////////
document.querySelector("#git-login").addEventListener("click", async (e) => {
	e.preventDefault();

	window.location.href = "http://localhost:8080/api/auth/github";
});

/////////////////////////////
// GIT SUBMIT
/////////////////////////////
document.querySelector("#git-submit").addEventListener("click", async (e) => {
	e.preventDefault();

	window.location.href = "http://localhost:8080/api/auth/github";
});

