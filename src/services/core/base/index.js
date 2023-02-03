import axios from 'axios'
import { axiosResponseInterceptorError, axiosRequestInterceptResponse } from '@/util/axios-intercept'

const instanceGenerator = () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
  })

  instance.interceptors.request.use(
    axiosRequestInterceptResponse,
    (error) => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (response) => response,
    axiosResponseInterceptorError
  )
  return instance
}

// export const axiosBaseURL = instanceGenerator(process.env.VUE_APP_URL)
export const axiosInstance = instanceGenerator(process.env.VUE_APP_URL)
