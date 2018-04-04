import axios from 'axios'

const XHR = axios.create({
  baseURL: 'https://api.schoolstatus.com'
})

const config = (uri, timeout) => ({
  baseURL: uri,
  timeout: timeout
})

axios.defaults.headers.common['x-ss-api-key'] = 'd706f43dab55f958e7926b7f7fe9c47cd351718f8f431fe3'
axios.defaults.headers.common['x-ss-token']   = window.SSUser && window.SSUser.accessToken

// For Tag Builder
export const SCHEMA_XHR = axios.create(config(process.env.TURBINE_BASE, 30000))
export const QUERY_XHR  = axios.create(config(process.env.SCRUNCHIE_BASE, 300000))

export default XHR
