import axios from "axios"

const BASE_URL = "https://dummyjson.com"

export function createAxiosInstance(baseURL: string = BASE_URL) {
  let api = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  api.interceptors.request.use(config => {
    // You can modify request config here (e.g., add headers)
    return config
  })
  return api
}

