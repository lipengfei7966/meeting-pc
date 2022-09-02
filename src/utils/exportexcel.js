import axios from 'axios'
import {
  MAINHOST,
  QAHOST
} from '@/config'

// 测试代码
const baseURL = process.env.NODE_ENV === 'production' ? MAINHOST : QAHOST
export default function(url, data, name) { // urls = [ {key,file} ]
  return new Promise(function(resolve, reject) {
    const excelExport = () => { // 导出excel
      if (url === '/Template/GetTemplate') {
        axios({
          method: 'post',
          url: baseURL + url,
          data,
          // responseType: 'blob', //二进制流
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then((resp) => {
          debugger
          const a_link = document.createElement('a')
          const suffix = resp.data.path.substring(resp.data.path.lastIndexOf('.'))
          // 这里是将url转成blob地址，
          fetch(resp.data.path).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
            a_link.href = URL.createObjectURL(blob)
            console.log(a_link.href)
            if (data.type === 5 || data.type === 6) {
              a_link.download = name + suffix
            } else {
              a_link.download = name + suffix
            }
            document.body.appendChild(a_link)
            a_link.click()
          })
        })
      } else {
        axios({
          method: 'post',
          url: baseURL + url,
          data,
          responseType: 'blob', // 二进制流
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then((res) => {
          console.log(res)
          // this.excelAddress = res
          const blob = res.data
          const reader = new FileReader()

          reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href

          reader.onload = e => {
            // 转换完成，创建一个a标签用于下载
            const a = document.createElement('a')
            a.style.display = 'none'
            if (url === '/quotation/exportexcel') { // 线上报价单
              a.download = name + '.xls'
            } else if (url === '/SettlementSheet/ExportExcel1') { // 酒店结算单
              a.download = name + '.xls'
            } else if (url === '/orderform/exportexcel') { // 订单
              a.download = name + '.xls'
            } else if (url === '/Quotation/ExportExcel') { // 汇总报价单
              a.download = name + '.xls'
            } else if (url === '/Template/GetTemplate') { // DMC结算单
              if (data.type === 5 || data.type === 6) {
                a.download = name + '.docx'
              } else {
                a.download = name + '.xls'
              }
            } else if (url === '/Reporting/GetExcel') { // 报表
              a.download = name + '.xls'
            }
            a.href = e.target.result
            // const body = document.body
            document.body.appendChild(a) // 修复firefox中无法触发click
            a.click()
            document.body.removeChild(a)
          }
        })
      }
    }

    excelExport()
  })
}
