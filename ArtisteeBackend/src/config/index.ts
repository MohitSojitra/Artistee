interface Config {
  port: number

  dbUrl: string
  dbPort: number
  database: string
  dbPassword: string
  dbUser: string
  adminPannelUserName: string
  adminPannelPassword: string
}

let envConfig: Config = {
  port: 3002,
  dbUrl: process.env.RDS_DB_URL || 'YOUR RDS DB URL GOES HERE',
  dbPort: parseInt(process.env.RDS_PORT) || 3306,
  database: process.env.RDS_DB_NAME || 'Your rds database name',
  dbPassword: process.env.RDS_DB_PASSWORD || 'Your RDS database password',
  dbUser: process.env.RDS_DB_USERNAME || 'Your rds database username ',
  adminPannelUserName: 'artistee@username',
  adminPannelPassword: 'artistee@password',
}
// console.log('envConfg', envConfig)

export const awsS3Bucket = {
  region: process.env.S3_BUCKET_REGION || 'Your S3 Bucket goes here',
  bucketName: process.env.S3_BUCKET_NAME || 'Your S3 bucket name goes here',
  accessKeyId: process.env.S3_ACCESS_KEY_ID || 'Your IAM user access key',
  secretAccessKey:
    process.env.S3_SECRET_ACCESS_KEY || 'Your IAM user secret key',
}

export const awsSESConfig = {
  username: process.env.SES_USERNAME || 'YOUR SES USERNAME GOES HERE',
  password: process.env.SES_PASSWORD || 'YOUR SES PASSWORD GOES HERE',
  mialId: process.env.MY_MAIL_ID || 'Your mail id goes here',
  host: process.env.SES_HOST || 'Your Host Name Goes Here',
  SES_PORT: parseInt(process.env.SES_PORT) || 25,
}
export default envConfig
