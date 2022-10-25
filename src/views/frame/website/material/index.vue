<template>
  <div class="material">
    <!-- 左侧树 -->
    <el-card class="box-card content_one">
      <div class="">
        <tree @matter="matter" />
      </div>
    </el-card>
    <!-- 中间素材列表 -->
    <el-card class="box-card content_two">
      <div v-if="exhibition" style="height: 95vh">
        <div class="search_A">
          <el-form :model="fileSearch" label-width="90px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="文件类型">
                  <el-select filterable size="mini" v-model="fileSearch.picType" clearable>
                    <el-option v-for="item in leixingOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="排序">
                  <el-select filterable size="mini" v-model="fileSearch.rank_" clearable>
                    <el-option v-for="item in paixuOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文件名称">
                  <el-input size="mini" v-model="fileSearch.picName" clearable>
                    <template slot="append">
                      <span @click="searchClick" style="padding: 0px 20px; cursor: pointer; line-height: 26px; display: inline-block">
                        <i class="el-icon-search"></i>
                      </span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 操作按钮位置st  后续需要从这里加 -->
        <!-- 操作按钮位置end -->
        <ul v-if="matterList.length > 0" id="app_" class="content_" @scroll.passive="getScroll($event)">
          <li class="resource" v-for="(item, index) in matterList" :key="index">
            <el-tooltip :content="item.picName" placement="top">
              <p>{{ item.picName | headline(item.picName) }}</p>
            </el-tooltip>
            <el-image style="width: 100%; height: 65%" :src="`${item.picUrl}?v=${Math.random()}`" :preview-src-list="[`${item.picUrl}?v=${Math.random()}`]"> </el-image>
            <span style="display: inline-block; color: #409eff; line-height: 6vh; cursor: pointer" @click="details(item, index)">文件信息</span>
          </li>
          <!-- <li class="resource">视频</li> -->
        </ul>
        <div v-if="matterList.length <= 0" style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh"><span></span><el-empty :image="require('@/assets/image/wushuju.png')" description=" "></el-empty></div>
        <!-- @/assets/image/wushuju.png -->
      </div>
      <div style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh; height: 75vh" v-else><span></span><el-empty description="请选择文件夹"></el-empty></div>
    </el-card>
    <!-- 右侧详细信息 -->
    <el-card class="box-card content_three">
      <div class="set" v-if="exhibitionRight">
        <div class="set_one">
          <el-image style="width: 100%; height: 100%" :src="`${url}?v=${Math.random()}`" :preview-src-list="[`${srcList}?v=${Math.random()}`]"> </el-image>
        </div>
        <div class="set_two">
          <div class="particulars">
            <span style="font-size: 12px; color: black">文件名：</span>
            <el-input size="mini" @blur="blur_" v-model="workName" style="width: 70%" placeholder="请输入文件名"></el-input>
            <p>
              大小：<span class="sp">{{ more.big | formatbytes(more.big) }}</span>
            </p>
            <p>
              格式：<span class="sp">{{ more.format }}</span>
            </p>
            <p>
              类型：<span class="sp">{{ more.type }}</span>
            </p>
            <p>
              尺寸：<span class="sp">{{ more.size }}</span>
            </p>
            <p>
              上传时间：<span class="sp">{{ more.createdTime }}</span>
            </p>
            <p>
              所在文件夹：<span class="sp">{{ more.place }}</span>
            </p>
            <p>
              文件链接：<span class="sp">{{ more.link | commentEllipsis(more.link) }}</span>
              <el-button style="font-size: 12px; margin-left: 5px" type="text" size="small" @click="copyUrl">复制链接</el-button>
            </p>
            <div class="btn">
              <!-- 上传（替换文件） -->
              <el-button type="primary" @click="upload_" style="margin-right: 2vw">替换文件</el-button>
              <input v-show="false" ref="fileRef" type="file" @change="fileChange($event)" />
              <!--  -->
              <!-- <el-button type="primary" @click="download_()">下载</el-button> -->
            </div>
          </div>
        </div>
      </div>
      <div style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh; height: 75vh" v-else><span></span><el-empty description="请选择文件"></el-empty></div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import { resolve } from 'path'
import tree from './components/tree'
export default {
  name: 'material',
  components: {
    tree
  },
  data() {
    return {
      fileSearch: {
        picType: '',
        rank_: '',
        picName: ''
      },
      workName: '',
      workName_: '',
      title_: '',
      leixingOptions: [
        { name: '图片', id: '0' },
        { name: '视频', id: '1' }
      ],
      paixuOptions: [
        { name: '按上传时间升序', id: 'createDate.asc' },
        { name: '按上传时间降序', id: 'createDate.desc' }
      ],
      url: '',
      srcList: '',
      exhibition: false,
      exhibitionRight: false,
      matterList: [],
      treeDatas: null,
      current: 1,
      total: 1,
      pageSize: 20,
      // 右侧详细信息
      more: {
        // 大小
        big: 0,
        // 格式
        format: '',
        // 类型
        type: '',
        // 尺寸
        size: '',
        // 上传时间
        createdTime: '',
        // 所在文件夹
        place: '',
        // 文件链接
        link: ''
      },
      pId: ''
    }
  },
  // watch: {
  //   workName(nval, oval) {
  //     console.log(nval, oval)
  //   }
  // },
  methods: {
    // 复制文件链接
    copyUrl(item, type) {
      var copyTest = this.more.link
      var inputTest = document.createElement('input')
      inputTest.value = copyTest
      document.body.appendChild(inputTest)
      inputTest.select()
      document.execCommand('Copy')
      inputTest.className = 'oInput'
      inputTest.style.display = 'none'
      this.$message.success('复制成功')
    },
    // 顶部搜索
    searchClick() {
      console.log('搜索', this.fileSearch)
      this.pageSize = 20
      this.current = 1
      this.loadData(this.treeDatas)
    },
    blur_() {
      console.log('失焦了 调保存接口吧')
      // 控制不改变值不刷新
      if (this.workName != this.workName_) {
        request({
          url: '/api/cms/picinfo/renameFile',
          method: 'POST',
          data: { data: { objectKey: this.title_, newObjectKey: this.workName, id: this.pId, url: this.more.link }, funcModule: '修改文件名', funcOperation: '修改文件名' }
        })
          .then((res) => {
            if (res.data) {
              // 控制不改变值不刷新
              this.workName_ = this.workName
              this.$message.success('修改成功')
              this.loadData(this.treeDatas)
              console.log(res.data)
            } else {
              this.$message.success('修改失败')
            }
          })
          .catch(() => {})
      }
    },
    // 滚动刷新
    getScroll(event) {
      const body = document.getElementById('app_')
      const windowHeight = body.clientHeight
      if (Math.ceil(event.target.scrollTop + windowHeight) >= event.target.scrollHeight) {
        if (this.current < Math.ceil(this.total / 20)) {
          this.current++
          this.pageSize = this.current * 20
        }
        console.log('到底了！', Math.ceil(event.target.scrollTop + windowHeight), event.target.scrollHeight)
        this.loadData(this.treeDatas)
      }
    },
    upload_() {
      this.$refs.fileRef.dispatchEvent(new MouseEvent('click')) //弹出选择本地文件
    },
    fileChange(e) {
      console.log(e)
      console.log(e.target.files)
      console.log(e.target.files[0].name)
      // 替换文件 --- st
      let thiz = this
      let formData = new FormData()
      formData.append('id', thiz.pId) // 额外参数
      formData.append('url', thiz.more.link)
      formData.append('file', e.target.files[0])
      let loading_ = thiz.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      request({
        url: '/api/cms/picinfo/update',
        method: 'POST',
        data: formData
      })
        .then((data) => {
          if (data) {
            loading_.close()
            thiz.$message('上传文件成功')
            this.loadData(this.treeDatas)
            this.exhibitionRight = false
          } else {
            loading_.close()
            thiz.$message('上传文件失败')
          }
        })
        .catch(() => {})
      //替换文件--- end
    },
    download_() {
      console.log('下载')
      this.downloadEvt(this.more.link, this.workName)
    },
    downloadEvt(url, name) {
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          this.download(url, name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    },
    // 调取下载
    download(href, name) {
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    },
    matter(data) {
      this.exhibition = true
      // 关闭右侧展示
      this.exhibitionRight = false
      this.treeDatas = data
      this.loadData(data)
    },
    loadData(data) {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      request({
        url: '/api/cms/picinfo/page',
        method: 'POST',
        data: { defaultSortString: this.fileSearch.rank_, current: this.current, isPage: true, size: this.pageSize, data: { materialCode: data.code, picType: this.fileSearch.picType, picName: this.fileSearch.picName }, funcModule: '获取素材列表', funcOperation: '获取素材列表' }
      })
        .then((res) => {
          if (res.data) {
            setTimeout(() => {
              loading.close()
            }, 200)
            this.matterList = res.data
            this.total = res.total
            console.log(res.data)
          } else {
            loading.close()
          }
        })
        .catch(() => {})
    },
    details(item, index) {
      // 打开右侧详细
      this.exhibitionRight = true
      // 对右侧信息进行赋值
      // id
      this.pId = item.id
      this.workName = item.picName
      this.workName_ = item.picName
      this.title_ = item.picName
      this.url = item.picUrl
      this.srcList = item.picUrl
      // 格式--- start
      let mun = item.picUrl.split('.')
      let format = mun[mun.length - 1]
      this.more.format = format
      // 格式--- end
      // 类型--- start
      if (item.picType == '0') {
        this.more.type = '图片'
      } else if (item.picType == '1') {
        this.more.type = '视频'
      }
      // 类型--- end
      // 尺寸--- start
      this.getImageSize(item.picUrl)
      // 尺寸--- end
      // 上传时间 --- start
      this.more.createdTime = item.updateDate ? item.updateDate : item.createDate
      // 上传时间--- end
      //所在文件夹--- start
      this.more.place = this.treeDatas.name
      // 所在文件夹--- end
      // 文件链接
      this.more.link = item.picUrl
      // 文件链接
      this.more.big = item.picSize
      console.log(item, index)
    },
    getImageSize(url) {
      return new Promise((resolve) => {
        var img = document.createElement('img')
        img.src = url
        img.onload = () => {
          resolve(img.naturalWidth, img.naturalHeight)
          this.more.size = img.naturalWidth + '*' + img.naturalHeight
          console.log('宽高', img.naturalWidth, img.naturalHeight)
        }
      })
    }
  },
  filters: {
    commentEllipsis(value) {
      if (value.length != undefined) {
        if (value.length > 15) {
          return value.slice(0, 14) + '...'
        } else {
          return value
        }
      }
    },
    headline(value) {
      if (value.length != undefined) {
        if (value.length > 12) {
          return value.slice(0, 11) + '...'
        } else {
          return value
        }
      }
    },
    // 字节转换
    formatbytes(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    }
  }
}
</script>

<style lang="scss">
.material {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  div {
    // 暂存
  }
}
.content_one {
  width: 18%;
  height: 98%;
  margin: 5px;
}
.content_two {
  width: 58%;
  height: 98%;
  margin: 5px;
}
.content_three {
  width: 24%;
  height: 98%;
  margin: 5px;
}
.search_A {
  padding: 0px 20px;
  padding-top: 20px;
  width: 100%;
  height: 10%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.content_ {
  width: 100%;
  height: 85vh;
  text-align: center;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .resource {
    width: 23.5%;
    height: 40%;
    margin-top: 10px;
    margin-right: 1%;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    p {
      margin: 5px 0;
    }
  }
  .resource :hover {
    bottom: 1px;
    right: 1px;
  }
}
.el-input-group__append {
  cursor: pointer;
  padding: 0;
}
.set_one {
  width: 100%;
  height: 30vh;
  padding: 0 1%;
  img {
    border-radius: 10px;
  }
}
.set_two {
  margin-top: 5vh;
  width: 100%;
  height: 50vh;
}
.particulars {
  p {
    margin-top: 2vh;
    font-size: 12px;
    color: black;
  }
  .sp {
    font-size: 12px;
    color: lightslategrey;
  }
  .btn {
    margin-top: 2vh;
  }
}
.el-card__body,
.el-main {
  padding: 10px;
}
// 改变默认滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ebeef5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
.set {
  height: 95vh;
}
</style>