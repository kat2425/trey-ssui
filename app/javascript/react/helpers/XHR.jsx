import axios from 'axios'

const XHR = axios.create({
  baseURL: 'https://api.schoolstatus.com',
  timeout: 30000,
  headers: {
    'x-ss-api-key': 'd706f43dab55f958e7926b7f7fe9c47cd351718f8f431fe3',
    'x-ss-token':   window.SSUser && window.SSUser.accessToken
  }
})

const config = (port) => ({
  baseURL: `http://25.83.82.65:${port}`,
  timeout: 30000,
  headers: {
    'x-ss-api-key': 'd706f43dab55f958e7926b7f7fe9c47cd351718f8f431fe3',
    'x-ss-token':   window.SSUser && window.SSUser.accessToken
  }
})

// For Tag Builder
export const SCHEMA_XHR = axios.create(config(9393))
export const QUERY_XHR = axios.create(config(5000))

export default XHR

