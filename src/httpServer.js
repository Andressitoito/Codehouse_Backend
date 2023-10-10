import { logger } from "./config/logger.js";
import { http_server } from "./server.js";
import os from "os";
import cluster from "cluster"; 

const PORT = process.env.PORT
let ready = () => {
	console.log(`Server ready on port ${PORT}`);
};

const cpus = os.cpus();

// 1 - process primario
console.log(process.pid);

const processorsNumbers = cpus.length;

console.log("processorsNumbers ", processorsNumbers);

if (cluster.isPrimary) {
	logger.info("Primary process");

	for (let i = 0; i < processorsNumbers; i++) {
		cluster.fork();
	}

	cluster.on("message", (worker) => {
		console.log(`Mensaje recibido de el worker ${worker.process.pid}`);
	});
} else {
	logger.info(`Forked process, im not a primary id: ${process.pid}`);
 http_server.listen( 8080, ready);
}


