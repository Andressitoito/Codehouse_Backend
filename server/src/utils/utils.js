/////////////////////////////
// IMPORTS
/////////////////////////////
import { fileURLToPath } from "url";
import { dirname } from "path";

/////////////////////////////
// _dirname SETUP
/////////////////////////////
const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(_filename));

export default __dirname;

