module.exports = {
  port: 4000,
  uri: 'mongodb://127.0.0.1:27017',
  jwt: {
    secret: 'fahcode',
    expiresIn: 3600
  },
  sms: {
    accessKeyId: '',
    secretAccessKey: '',
    TemplateCode: '',
    SignName: ''
  },
  qiniu: {
    accessKey: '',
    secretKey: '',
    scope: '',
    expires: 0
  }
}
