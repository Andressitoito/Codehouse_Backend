const mongoose = require('mongoose')
const dotenv = require('dotenv')
import { commander } from '../utils/commander.js'

const { mode } = commander.opts()

dotenv.config({
 path: mode === 'development' ? './.env.development' : 'debug./env.production'
})

exports.config = {
 privateKeyJwt: 'palabraSecretaCoder',
 PORT: process.env.PORT || 8000,

 connectDB: async () => {
  try {
   await mongoose.connect('mongodb://localhost:27017/c39770')
   console.log('base de datos conectada..')
  } catch (error) {
   console.log('error de connection')
  }
 }
}

// hay que exportar el objeto


