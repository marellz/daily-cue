import dotenv from 'dotenv'

dotenv.config()

const config = {
  app_name: process.env["APP_NAME"],
  port: process.env["PORT"] ?? '3000',
  db_uri: process.env["DB_URI"],
  db_options: {},
};

export default config