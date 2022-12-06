import request from '@/utils/frame/base/request'

// 获取订单列表
export const basicOrderInfo = (data) => {
    return request({
        url: '/api/pay/basicOrderInfo/page',
        method: 'POST',
        data: data
    })
}
// 获取订单列表
export const getStatusCount = (data) => {
    return request({
        url: '/api/pay/basicOrderInfo/getStatusCount',
        method: 'POST',
        data: {
            'funcModule': '订单总数管理',
            'funcOperation': '查询',
            'data': data
        }
    })
}
// 获取编码状态
export const listItem = (data) => {
    return request({
        url: '/api/sys/dict/listItem',
        method: 'POST',
        data: {
            'data': data,
            funcModule: '获取状态编码',
            funcOperation: '获取状态编码'
        }
    })
}
// 获取预估退改费
export const estimatedRefund = (orderCode) => {
    return request({
        url: '/api/train/refundTicketOrder/estimatedRefund',
        method: 'POST',
        data: {
            'data': orderCode,
            funcModule: '火车票退费',
            funcOperation: '预估退改费'
        }
    })
}
// 获取预估退改费
export const comfirmRefund = (orderCode) => {
    return request({
        url: '/api/train/refundOrder/save',
        method: 'POST',
        data: {
            'data': orderCode,
            funcModule: '火车票退费',
            funcOperation: '创建退票表'
        }
    })
}
// 获取火车票详情页
export const trainDetail = (orderCode) => {
    return request({
        url: '/api/train/orderInfo/getInfoByCode',
        method: 'POST',
        data: {
            'data': orderCode,
            funcModule: '火车票详情',
            funcOperation: '火车票详情页'
        }
    })
}
// 获取机票详情页
export const airDetail = (orderCode) => {
    return request({
        url: '/api/flight/flight/findPcOrderDetails',
        method: 'POST',
        data: {
            'data': orderCode,
            funcModule: '机票详情',
            funcOperation: '机票详情页'
        }
    })
}

// 获取机票退改规则
export const refundUpdateRule = (data) => {
    return request({
        url: '/api/flight/flight/findRuleAnnotable',
        method: 'POST',
        data: {
            'data': data,
            funcModule: '机票退改规则',
            funcOperation: '机票退改规则'
        }
    })
}
// 获取机票退票
export const fightRefund = (data) => {
    return request({
        url: '/api/flight/flight/ticketRefund',
        method: 'POST',
        data: {
            'data': data,
            funcModule: '机票',
            funcOperation: '机票退票'
        }
    })
}

