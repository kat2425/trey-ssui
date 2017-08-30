import axios from 'axios'

const _XHR = axios.create({
  baseURL: 'https://turbine.schoolstatus.com',
  timeout: 10000,
  headers: {
    'x-ss-api-key': 'd706f43dab55f958e7926b7f7fe9c47cd351718f8f431fe3',
    'x-ss-token':   '12df9f96d388580aed484e0dbe3ff827'
  }
})

export default _XHR
