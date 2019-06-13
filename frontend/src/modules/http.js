import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  tokenHttp(token) {
    return axios.create({ headers: { Authorization: token } })
  }
}