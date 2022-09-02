
import Vue from 'vue'
export default function(urls) { // urls = [ {key,file} ]
  return new Promise(function(resolve, reject) {
    const uploadImageList = [] // 已上传
    let uploadImage = {} // new { Key, FilePath, OriginalFileName, Success };
    const arrayLength = urls.length
    console.log(urls.length, urls)
    const upload = () => {
      // 上传已全部完成
      if (urls.length === 0) return resolve(uploadImageList)
      debugger
      if (String(urls[0].file).IsPicture()) {
        // uploadImage= urls[0].file
        // uploadImageList.push(uploadImage)
        urls.shift()
        return upload()
      }
      this.requestApi({
        url: '/file/upload',
        method: 'POST',
        data: {},
        file: urls[0].file,
        type: 'form'
      }).then(res => {
        console.log(res)
        var sign = true
        if (res !== undefined && res.FilePath === '' && res.OriginalFileName === '') { // 已上传文件的重复上传的响应数据
          console.log('重复了')
          res = undefined
          sign = false
        }
        if (res === undefined && sign) { // 网络不佳、中断后的文件上传响应数据
          Vue.prototype.$alert('网络不稳定, 文件上传失败, 请重新上传', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              Vue.prototype.$message({
                message: '上传失败的文件已标记',
                type: 'warning'
              })
            }
          })
          const tag = arrayLength - urls.length
          return resolve({
            tag: tag,
            uploadImageList: uploadImageList
          })
        }
        uploadImage = res
        uploadImageList.push(uploadImage)
        urls.shift()
        upload()
      })
    }
    upload()
  })
}
