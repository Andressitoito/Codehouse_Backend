export default function generateInfoUser(password, email, name) {
	return `
One or more properties were incomplete or INVALID_TYPE_ERROR

List of required properties:

*first_name: required String, received ${name}
*last_name: required String, received ${password}
*email: required String, received ${email}
`;
}
