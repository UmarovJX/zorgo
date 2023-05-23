import qs from 'qs'
import axios from 'axios'
import api from '@/services/api'
import {
  getLocalVar,
  removeLocalVar,
  setLocalVar,
} from '@/util/localstorage-helper'

function navigateToLoginPage() {
  removeLocalVar('accessToken')
  removeLocalVar('auth__refresh__token')
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

async function retryApiCall(config) {
  const access_token = getLocalVar('accessToken')
  const headers = {}


  if (access_token) {
    headers['Authorization'] = `${access_token}`
  }




  const _axios = axios.create({
    baseURL: config.baseURL,
    headers
  })

  const data = () => {
    if (config.data) {
      return JSON.parse(config.data)
    }
    return config.data
  }
  return await _axios({
    method: config.method,
    url: config.url,
    data: data()
  })
    .then((response) => response)
    .catch(error => Promise.reject(error))
}

async function waitApiCall(config) {
  return await new Promise((resolve) => {
    const starter = setInterval(() => {
      const pending = sessionStorage.getItem('pending')
      if (!parseInt(pending)) {
        resolve()
        clearInterval(starter)
      }
    }, 50)
  }).then(async () => await retryApiCall(config))
}

async function refreshToken() {
  const refreshToken = getLocalVar('auth__refresh__token')
  if (refreshToken) {
    sessionStorage.setItem('pending', '1')
    return await api.auth.updateToken(refreshToken)
      .then(async (response) => {
        const {
          access_token
        } = await response.data
        // setLocalVar('auth__refresh__token', refresh_token)
        setLocalVar('accessToken', access_token)
        return 1
      })
      .catch(() => 1)
      .finally(() => {
        sessionStorage.setItem('pending', '0')
        return 1
      })
  } else {
    navigateToLoginPage()
    return 0
  }
}

export function axiosRequestInterceptResponse(config) {
  const registrationTime = getLocalVar('registration_time')
  const module = (new Date()).getTime() - (new Date(parseInt(registrationTime))).getTime()
  const expiredMSeconds = 259200000
  if (config.url !== 'auth/user/login' && module > expiredMSeconds) {
    removeLocalVar('accessToken')
    // window.location.href = '/login'
    return
  }

  const access_token = getLocalVar('accessToken')
  config.paramsSerializer = (params) => {
    return qs.stringify(params, {
      encode: false,
      skipNulls: false,
      withCredentials: true,
    })
  }

  const requestConfig = Object.assign({}, config)

  if (!config.headers['Authorization'] && config.url !== 'auth/user/login') {
    requestConfig.headers['Authorization'] = access_token
  }
  return requestConfig
}

export async function axiosResponseInterceptorError(error) {
  if (error.response) {
    const {status} = error.response
    switch (status) {
      case 401:

        const pending = sessionStorage.getItem('pending')
        if (parseInt(pending)) {
          return await waitApiCall(error.config)
        } else {
          const response = await refreshToken()
          if (response) {
            return await retryApiCall(error.config)
          }
        }
    }
    return Promise.reject(error)

  }
}
