/** 
 *  GitHub Auth
**/
const request = require('request-promise-native')

module.exports = 
class Identity {
  constructor (options) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
  }

  async getToken (code) {
    const options = {
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code,
            accept: 'json'
        },
        json: true // Automatically stringifies the body to JSON
    };
    // 
    const res = await request.post(options)
    return res ? res.access_token : false
  }
}