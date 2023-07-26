// import { command } from 'commander'

// const program = new command()

// program
// .option('-d', 'Debug variable', false)
// .option('-p, --port <port>', 'Server port', 8080)
// .option('--mode <mode>', 'Development mode', 'development')
// .requiredOption('-u <user>', 'User using the app', 'There is no user')
// .option('-l, --letters [letter...]', 'specify letter')
// .parse()

// node commander.js -d -p 8080 --mode development -u root --letters a b c



import { Command } from 'commander';

const Commander = new Command();

Commander
  .option('--mode <mode>', 'Development mode', 'development')
  .parse();

export default Commander;