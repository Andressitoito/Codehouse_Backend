import { spawn } from 'child_process';
import path from 'path';

// Construct the absolute path to server.js
const serverPath = path.join(new URL(import.meta.url).pathname, '..', 'src', 'server.js');

// Execute the server script
const serverProcess = spawn('node', [serverPath]);

console.log('Server path:', serverPath);

serverProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

serverProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});