const product_id = document
	.querySelector("#price-value")
	.getAttribute("data-id");

const checkLogin = async () => {
	const tokenStr = getCookieValue("token");

	if (tokenStr) {
		document.querySelector(".product-detail-unique").disabled = false;
	} else {
		document.querySelector(".product-detail-unique").disabled = true;
	}
};

checkLogin();

document
	.querySelector(`#add-to-cart-${product_id}`)
	.addEventListener("click", async () => {
		const quantity_value = document.querySelector(
			`#edit-cart-${product_id}`
		).value;

		const cart_id = "648276ab74476c69be6576b3";

		console.log({
			product_id: product_id,
			quantity: quantity_value,
		});
		const response = await fetch(
			`/api/carts_mongo/${cart_id}/product/${product_id}/${quantity_value}`,
			{
				method: "PUT",
			}
		);
		const data = await response.json();

		if (response.ok) {
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Saved!",
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
				willClose: () => {
					window.location.href = "/carts_mongo";
				},
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Something went wrong!",
				text: `${data.response}`,
				footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
			});
		}
	});

document
	.querySelector(`#edit-cart-${product_id}`)
	.addEventListener("change", () => {
		const price_value = document
			.querySelector(`#price-value`)
			.getAttribute("data-price");
		document.querySelector(`#card-multiply-${product_id}`).innerHTML = `Total: $${
			document.querySelector(`#edit-cart-${product_id}`).value * price_value
		}`;
	});
