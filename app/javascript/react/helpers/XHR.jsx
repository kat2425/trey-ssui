import axios from 'axios'

const XHR = axios.create({
  baseURL: 'https://api.schoolstatus.com',
  timeout: 30000,
  headers: {
    'x-ss-api-key': 'd706f43dab55f958e7926b7f7fe9c47cd351718f8f431fe3',
    'x-ss-token':   window.SSUser.accessToken
  }
})

export default XHR
