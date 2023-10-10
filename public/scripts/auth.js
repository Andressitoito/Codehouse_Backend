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

		main_username = decodedPayload.name;

		document.querySelector("#logout").classList.remove("hide");
		document.querySelector("#logout").textContent = `Logout ${main_username}`;
		document.querySelector("#signup_menu").classList.add("hide");
		document.querySelector("#login_menu").classList.add("hide");

		const { role } = decodedPayload;

		if (role === "ADMIN" || role === "PREMIUM") {
			document.querySelector("#add_mongo_product").classList.remove("hide");
			document.querySelector("#add_fs_product").classList.remove("hide");
			document.querySelector("#premium").classList.remove("hide");
		} else {
			document.querySelector("#premium").classList.add("hide");
			document.querySelector("#add_mongo_product").classList.add("hide");
			document.querySelector("#add_fs_product").classList.add("hide");
			document.querySelector("#fs_cart").classList.remove("hide");
			document.querySelector("#mongo_cart").classList.remove("hide");
		}
	} else {
		document.querySelector("#fs_cart").classList.add("hide");
		document.querySelector("#mongo_cart").classList.add("hide");
		document.querySelector("#add_mongo_product").classList.add("hide");
		document.querySelector("#logout").innerHTML = `Logout`;
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

		if (data_user.success) {
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
// LOGIN USER & PASS
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

document.querySelector("#login_email").addEventListener("change", (e) => {
	e.preventDefault();

	const email = document.querySelector("#login_email").value;

	if (email === "") {
		document.querySelector("#forgot-password").disabled = true;
	} else {
		document.querySelector("#forgot-password").disabled = false;
	}
});

document.querySelector("#forgot-password").disabled = true;

document.querySelector("#forgot-password").addEventListener("click", (e) => {
	e.preventDefault();

	console.log(document.querySelector("#login_email").value);

	fetch(`/api/sessions/forgot-password`, {
		method: "POST",
		body: JSON.stringify({ email: document.querySelector("#login_email").value }),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => console.log(data));
});

// ///////////////////////////
// SIGN OUT JWT
// ///////////////////////////
document.querySelector("#logout").addEventListener("click", async (e) => {
	e.preventDefault();

	const res = await fetch(`/api/auth/logout`, {
		method: "POST",
	});

	const data = await res.json();

	console.log(data);

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

	window.location.href = "http://localhost:8080/api/auth/github/callback";

	Swal.fire({
		title: `Signin in!`,
		html: `<br><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
		class="bi bi-github" viewBox="0 0 16 16">
		<path
			d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
	</svg> <br><br> <b></b> seconds.`,
		timer: 5000,
		allowOutsideClick: false,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
			const b = Swal.getHtmlContainer().querySelector("b");
			timerInterval = setInterval(() => {
				b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
			}, 100);
		},
		willClose: () => {
			clearInterval(timerInterval);
		},
	});
});

/////////////////////////////
// GIT SUBMIT
/////////////////////////////
document.querySelector("#git-submit").addEventListener("click", async (e) => {
	e.preventDefault();

	window.location.href = "http://localhost:8080/api/auth/github/callback";

	Swal.fire({
		title: `Creating new user...`,
		html: `<br><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
		class="bi bi-github" viewBox="0 0 16 16">
		<path
			d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
	</svg> <br><br> <b></b> seconds.`,
		timer: 5000,
		allowOutsideClick: false,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
			const b = Swal.getHtmlContainer().querySelector("b");
			timerInterval = setInterval(() => {
				b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
			}, 100);
		},
		willClose: () => {
			clearInterval(timerInterval);
		},
	});
});
