import dotenv from 'dotenv';
import Commander from '../utils/commander.js';
import MongoSingleton from './MongoSingleton.js';

const { mode } = Commander.opts();

dotenv.config({
  path: mode === 'development' ? './.env.development' : './.env.production'
});

const config = {
  privateKeyJwt: 'palabraSecretaCoder',
  PORT: process.env.PORT || 8000,
  persistence: process.env.PERSISTENCE,

  connectDB: async () => MongoSingleton.getInstance()
};

export default config;