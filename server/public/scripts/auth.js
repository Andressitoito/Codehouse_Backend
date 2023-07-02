

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

function getCookieValue(name) {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();

			// Check if the cookie starts with the provided name
			if (cookie.startsWith(name + "=")) {
					// Extract the cookie value
					const value = cookie.substring(name.length + 1);
					return decodeURIComponent(value);
			}
	}

	// Cookie not found
	return null;
}

// Example usage to extract a cookie value
const tokenStr = getCookieValue("token");
console.log(tokenStr);


const token = tokenStr;
const [header, payload, signature] = token.split('.');

const decodedHeader = JSON.parse(atob(header));
const decodedPayload = JSON.parse(atob(payload));

console.log(decodedHeader); // Access header data
console.log(decodedPayload);


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
			text: `<p>${data_user.message}</p>
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

// /////////////////////////////
// // SIGN OUT SESSIONS
// /////////////////////////////
// document.querySelector("#logout").addEventListener("click", async (e) => {
// 	e.preventDefault();
// 	const res = await fetch(`/api/sessions/signout`, {
// 		method: "POST",
// 	});

// 	const data = await res.json();

// 	Swal.fire({
// 		position: "top-end",
// 		icon: "success",
// 		title: `${data.message}`,
// 		showConfirmButton: false,
// 		willClose: () => {
// 			window.location.href = "/";
// 		},
// 		timer: 1500,
// 	});
// 	checkLog();
// });

// ///////////////////////////
// SIGN OUT JWT
// ///////////////////////////
document.querySelector("#logout").addEventListener("click", async (e) => {
	e.preventDefault();
	const res = await fetch(`/api/auth/signout`, {
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





/////////////////////////////
// GIT LOGIN
/////////////////////////////
document.querySelector("#git-login").addEventListener("click", async(e) => {
	e.preventDefault();
	console.log('git clicked')

	const res = await fetch(`http://localhost:8080/api/auth/github/callback`)
	const data = await res.json()

	console.log(data)
});