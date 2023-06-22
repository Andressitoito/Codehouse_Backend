////////////////////////////
// PATH PROTECTION
/////////////////////////////
const checkLog = async () => {
	const res = await fetch("/api/auth/checkLog");
	const data = await res.json();

	if (data.checkLog) {
		document.querySelector("#logout").classList.remove("hide");
		document.querySelector("#signup_menu").classList.add("hide");
		document.querySelector("#login_menu").classList.add("hide");
	} else {
		document.querySelector("#logout").classList.add("hide");
		document.querySelector("#signup_menu").classList.remove("hide");
		document.querySelector("#login_menu").classList.remove("hide");
	}

	if (data.user_role === 1) {
		document.querySelector("#add_mongo_product").classList.remove("hide");
		document.querySelector("#add_fs_product").classList.remove("hide");
	} else {
		document.querySelector("#add_mongo_product").classList.add("hide");
		document.querySelector("#add_fs_product").classList.add("hide");
	}
};

checkLog();

////////////////////////////
// SIGN UP
/////////////////////////////
document.querySelector("#signup").addEventListener("click", async (e) => {
	e.preventDefault();
	const email = document.querySelector("#signup_email").value;
	const name = document.querySelector("#signup_name").value;
	console.log(email);
	console.log(name);
	const password = document.querySelector("#signup_password").value;
	console.log(password);
	const res_cookie = await fetch(`/api/cookies/set/${email}`);
	const data_cookie = await res_cookie.json();

	console.log(data_cookie);

	const res_user = await fetch(`/api/auth/register`, {
		method: "POST",
		body: JSON.stringify({ email, password, name }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data_user = await res_user.json();

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
			text: `<p>${data_user.response || "User Success"}</p>
   <p>${data_cookie.response || "Cookie Success"}</p>`,
			footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
		});
	}
});

/////////////////////////////
// LOGIN
/////////////////////////////
document.querySelector("#login").addEventListener("click", async (e) => {
	e.preventDefault();
	const email = document.querySelector("#login_email").value;
	const password = document.querySelector("#login_password").value;
	const res_cookie = await fetch(`/api/cookies/set/${email}`);
	const data_cookie = await res_cookie.json();

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
		console.log(data_user);

		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Saved!",
			html: `<p>Welcome again ${data_user.name}!</p>`,
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
			text: `<p>${data_user.response || "User Success"}</p>`,
			footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
		});
	}
});

/////////////////////////////
// SIGN OUT
/////////////////////////////
document.querySelector("#logout").addEventListener("click", async (e) => {
	e.preventDefault();
	const res = await fetch(`/api/sessions/signout`, {
		method: "POST",
	});

	const data = await res.json();

	Swal.fire({
		position: "top-end",
		icon: "success",
		title: `${data.message}`,
		showConfirmButton: false,
		willClose: () => {
			window.location.href = "/";
		},
		timer: 1500,
	});
	checkLog();
});