const productForm = document.querySelector("#product-form");

productForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const productData = {
		title: document.querySelector("#product-title").value.trim(),
		description: document.querySelector("#product-description").value.trim(),
		price: Number(document.querySelector("#product-price").value),
		thumbnail: document.querySelector("#product-thumbnail").value.trim(),
		stock: Number(document.querySelector("#product-stock").value),
	};
	const response = await fetch("/api/products_mongo", {
		method: "POST",
		body: JSON.stringify(productData),
		headers: { "Content-Type": "application/json" },
	});
	const data = await response.json();

	console.log(data);
	if (response.ok) {
		console.log(data); // Show success modal

		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Saved!",
			html: `<p>${data.product.title} has been successfully saved!</p>`,
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
			text: `${data.response}`,
			footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
		});
	}
});
