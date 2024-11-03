import dotenv from 'dotenv'

dotenv.config()

const config = {
  app_name: process.env["APP_NAME"],
  port: process.env["PORT"] ?? '8000',
  db_uri: process.env["MONGO_URL"],
  db_options: {},
};

export default config