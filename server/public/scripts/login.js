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
  method: "POST"
 })
  .then((res) => res.json())
  .then((res) => alert(res))
  .catch((err) => console.log(err));
});
