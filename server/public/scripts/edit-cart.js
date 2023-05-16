const edit_buttons = document.querySelectorAll(".edit-quantity");
const price_tags = document.querySelectorAll(".price-tag");
const input_tags = document.querySelectorAll(".input-tag");
const card_tags = document.querySelectorAll(".card-tag");
const delete_buttons = document.querySelectorAll(".delete-product");

edit_buttons.forEach((button) => {
	button.addEventListener("click", async () => {
		const product_id = Number(button.classList[3]);
		const quantity_value = document.querySelector(
			`#edit-cart-quantity-${product_id}`
		).value;
		const id = document.querySelector(`#edit-cart-quantity-${product_id}`)
			.classList[5];

		const response = await fetch(
			`/api/carts/${id}/product/${product_id}/${quantity_value}`,
			{
				method: "PUT",
			}
		);
		const data = await response.json();

		if (response.ok) {
			console.log(data); // Show success modal

			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Saved!",
				html: `<p>${data.stock}</p>`,
				showConfirmButton: false,
				timer: 2500,
				timerProgressBar: true,
				willClose: () => {
					window.location.reload();
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
});

input_tags.forEach((input) => {
	input.addEventListener("change", () => {
		const product_id = input.getAttribute("data-id");
		const price = document.querySelector(`#price-value-${product_id}`);
		const price_value = Number(price.classList[2]);
		document.querySelector(`#card-multiply-${product_id}`).innerHTML = `Total: $${
			input.value * price_value
		}`;
	});
});

delete_buttons.forEach((button) => {
	button.addEventListener("click", async () => {
		const product_id = Number(button.getAttribute("data-pid"));
		const cart_id = Number(button.getAttribute("data-cid"));
		const quantity = Number(
			document.querySelector(`#edit-cart-quantity-${product_id}`).value
		);

		Swal.fire({
			title: "Do you want to save the changes?",
			showCancelButton: true,
			confirmButtonColor: "#c12d2d",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				const response = await fetch(
					`/api/carts/${cart_id}/product/${product_id}/${quantity}`,
					{
						method: "DELETE",
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
						timer: 2500,
						timerProgressBar: true,
						willClose: () => {
							window.location.reload();
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
			}
		});
	});
});
