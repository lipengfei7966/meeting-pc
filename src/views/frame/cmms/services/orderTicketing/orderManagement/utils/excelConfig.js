const XLSX = require('xlsx') // 使用import有的属性无法找到
export function exportExcel (filename, data) {
    const exc = XLSX.utils.book_new() // 初始化一个excel文件
    const exc_data = XLSX.utils.aoa_to_sheet(data) // 传入数据 , 到excel
    // 将文档插入文件并定义名称
    XLSX.utils.book_append_sheet(exc, exc_data, filename)
    // 执行下载
    XLSX.writeFile(exc, filename + '.xlsx')
}
