import axios from 'axios'

export const BaseURL = 'http://192.168.1.225:8080/api'

export default axios.create({
  baseURL: BaseURL
})
