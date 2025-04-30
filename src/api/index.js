import request from '@/utils/request.js'


// 查询当前生产工单的所有机组的信息
export const getAllData = async (params) => {
  return await request.request({ 
    url: '/mes/OrderInProduction/getProductionWorkInfo',
    method: 'get',
    params 
  })
}
// 当班生产明细
export const getProductionInfo = async (params) => {
    return await request.request({ 
      url: '/mes/OrderInProduction/getProductionInfo',
      method: 'get',
      params 
    })
  }
// 获取当班人员的接口
export const getProductionEmpInfo = async (params) => {
  return await request.request({ 
    url: '/mes/OrderInProduction/getProductionEmpInfo',
    method: 'get',
    params 
  })
}
//  当前版号信息
export const getCurrentVersionInfo = async (params) => {
  return await request.request({ 
    url: '/mes/OrderInProduction/getCurrentVersionInfo',
    method: 'get',
    params 
  })
}
