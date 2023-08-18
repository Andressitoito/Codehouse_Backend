export default function createProductError(
	title,
	description,
	thumbnail,
	price
) {
	return `
One or more properties were incomplete or INVALID_TYPE_ERROR

* title:       required   String,
               received   ${title},
* description: required   String,
               received   ${description},
* thumbnail:   required   String,
               received   ${thumbnail},
* price:       required   Number,
               received   ${price}`;
}
