import { operacionCompleja } from "./complexOperation";

import { fork } from "child_process";

process.on("exit", (code) => {
	console.log("Execute before close the process", code);
});
console.log("Process init");

process.on("uncaughtException", (exeption) => {
	console.log("This takes all uncotrolled exeptions", exeption);
});

console();

router.get("/block", (req, res) => {
	const result = operacionCompleja();

	req.send("Result: ", result);
});

router.get("/block", (req, res) => {
	const child = fork("./src/utils/complexOperation.js");

	child.send("Init forked process");
	child.on("message_from_child_process", (result) => {
		req.send("Result: ", result);
	});
});
