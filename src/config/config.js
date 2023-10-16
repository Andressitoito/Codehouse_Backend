import dotenv from 'dotenv';
import Commander from '../utils/commander.js';
import MongoSingleton from './MongoSingleton.js';

const { mode } = Commander.opts();

console.log(mode)
dotenv.config({
  path: mode === 'development' ? './.env.development' : './.env.production'
});


const config = {
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  privateKeyJwt: 'palabraSecretaCoder',
  PORT: process.env.PORT || 8000,
  persistence: process.env.PERSISTENCE,

  connectDB: async () => MongoSingleton.getInstance()
};

export default config;