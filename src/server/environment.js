const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const envFiles = [
  path.join(__dirname, '.env'),
  path.join(__dirname, `.env.${process.env.NODE_ENV}`),
  path.join(__dirname, `.env.${process.env.NODE_ENV}.local`)
]

envFiles
  .filter(file => fs.existsSync(file))
  .forEach(path => dotenv.config({ path }))
