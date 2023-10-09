document.querySelector('#premium-form').addEventListener('submit', async (event) => {
 event.preventDefault()

 const profilePhotoInput = document.getElementById('photo_profile');
 const idPhotoInput = document.getElementById('photo_ID');
 const addressBillInput = document.getElementById('address_bill');

const data = {
 profilePhoto: profilePhotoInput.files[0],
 idPhoto: idPhotoInput.files[0],
 addressBill: addressBillInput.files[0],
};

console.log(data);

const formData = new FormData();
formData.append('profilePhoto', data.profilePhoto);
formData.append('idPhoto', data.idPhoto);
formData.append('addressBill', data.addressBill);

console.log(formData);

 
 // const user_id_call = await fetch('/api/auth/user_id')
 // const user_id_data = await user_id_call.json()
 // const user_id = user_id_data.uid


 // const response = await fetch(`/api/auth/${user_id}/documents`, {
 //  method: 'POST',
 //  body: formData
 // })
 // const data = await response.json()

 // console.log(data)

 // if (response.ok) {
	// 	console.log(data);

	// 	Swal.fire({
	// 		position: "top-end",
	// 		icon: "success",
	// 		title: "Saved!",
	// 		html: `<p>${data.message} has been successfully saved!</p>`,
	// 		showConfirmButton: false,
	// 		timer: 2500,
	// 		timerProgressBar: true,
	// 		willClose: () => {
	// 			window.location.href = "/";
	// 		},
	// 	});
	// } else {
	// 	Swal.fire({
	// 		icon: "error",
	// 		title: "Something went wrong!",
	// 		text: `${data.response}`,
	// 		footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
	// 	});
	// }




})

