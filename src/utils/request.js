import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 处理请求错误
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data
    // 这里可以根据后端的数据结构进行相应的处理
    if (res.code === 0) {
      return res
    } else {
      // 处理其他状态码
      console.error('API Error:', res.message)
      return Promise.reject(new Error(res.message || '未知错误'))
    }
  },
  error => {
    // 处理响应错误
    console.error('Response error:', error)
    return Promise.reject(error)
  }
)

export default service 