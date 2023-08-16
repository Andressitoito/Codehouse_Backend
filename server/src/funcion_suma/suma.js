// const suma = (num1, num2) => {
// 	if (!num1 || !num2) return 0;

// 	if (typeof num1 !== "number" || typeof num2 !== "number") return null;

// 	let result = num1 + num2;

// 	return result;
// };

// const suma = (...nums) => {
// 	if (nums.length === 0) return 0;

// 	let valid_input = true;

// 	for (let i = 0; i < nums.length && valid_input; i++) {
// 		if (typeof nums[i] !== "number") {
// 			valid_input === false;
// 		}
// 	}

// 	if (!valid_input) {
// 		return null;
// 	}

// 	let result = 0;

// 	for (let i = 0; i < nums.length; i++) {
// 		result += nums[i];
// 	}

// 	return result;
// };

const suma = (...nums) => {
	if (nums.length === 0) return 0;

	if (!nums.every((num) => typeof num === "number")) {
		return null;
	}

	return numeros.reduce((acc, num) => (acc += num), 0);
};

let test_success = 0;
let test_total = 4;

console.log("Test 1: The function must return null if any param is string");
let result_test_1 = suma("2", 2); // null

if (result_test_1 === null) {
	console.log("Test 1: Success");
	success++;
} else {
	console.log(`Test 1: Function gets ${typeof result_test_1} expected null`);
}

console.log("/////////////////////////////////");
console.log("Must return 0 if there is any param");
let result_test_2 = suma(); // 0

if (result_test_2 === 0) {
	console.log("Test 2: Success");
	success++;
} else {
	console.log(`Test 2: Function gets ${result_test_2} expected 0`);
}

console.log("/////////////////////////////////");
console.log("Must return the correct sum");
let result_test_3 = suma(3, 2); // 5

if (result_test_3 === 5) {
	console.log("Test 3: Success");
	success++;
} else {
	console.log(`Test 2: Function gets ${result_test_3} expected 5`);
}

console.log("/////////////////////////////////");
console.log("Has to return the sum of any quantity of params");
let result_test_4 = suma(1, 2, 3, 4, 5); // 15

if (result_test_4 === 15) {
	console.log("Test 4: Success");
	success++;
} else {
	console.log(`Test 2: Function gets ${result_test_4} expected 15`);
}

console.log("/////////////////////////////////");

if (test_success === test_total) {
	console.log("All tests success");
} else {
	`Success ${test_success} of ${test_total} tests`;
}
