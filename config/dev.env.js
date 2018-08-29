var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"AIzaSyATpcTwZcBsSG9OcBKgGL1mNvfU0bXu1SI"',
  AUTH_DOMAIN: '"vue-auth-cd56e.firebaseapp.com"',
  DATABASE_URL: '"https://vue-auth-cd56e.firebaseio.com"',
  PROJECT_ID: '"vue-auth-cd56e"',
  STORAGE_BUCKET: '""',
  MESSAING_SENDER_ID: '"733126669746"'
})
