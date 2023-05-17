const product_id = Number(
	document.querySelector("#price-value").getAttribute("data-id")
);
document
	.querySelector(`#add-to-cart-${product_id}`)
	.addEventListener("click", async () => {
		const quantity_value = document.querySelector(
			`#edit-cart-${product_id}`
		).value;

		const cart_id = 1;

		const response = await fetch(
			`/api/carts/${cart_id}/product/${product_id}/${quantity_value}`,
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
				html: `<p>${data.stock}</p>`,
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
				willClose: () => {
					window.location.href = "/products/cards";
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
