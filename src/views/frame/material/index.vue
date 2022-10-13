<template>
  <div class="material">
    <!-- 左侧树 -->
    <el-card class="box-card content_one">
      <div>
        <tree @matter="matter" />
      </div>
    </el-card>
    <!-- 中间素材列表 -->
    <el-card class="box-card content_two">
      <div v-if="exhibition">
        <div class="search">
          <el-form :model="fileSearch" label-width="90px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="文件类型">
                  <el-select filterable size="mini" v-model="fileSearch.type_" clearable>
                    <el-option v-for="item in leixingOptions" :label="item.name" :value="item.name" :key="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="排序">
                  <el-select filterable size="mini" v-model="fileSearch.rank_" clearable>
                    <el-option v-for="item in paixuOptions" :label="item.name" :value="item.name" :key="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文件名称">
                  <el-input size="mini" v-model="fileSearch.name_" clearable>
                    <template slot="append">
                      <span @click="searchClick" style="padding: 0 20px; cursor: pointer">
                        <i class="el-icon-search"></i>
                      </span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- <div style="display: flex; justify-content: right; margin-bottom: 20px">
          <el-button type="primary">移动</el-button>
          <el-button>删除</el-button>
        </div> -->
        <ul v-if="matterList.length > 0" class="content_" @scroll.passive="getScroll($event)">
          <li class="resource" v-for="(item, index) in matterList" :key="index">
            <p>{{ item.picName }}</p>
            <el-image style="width: 100%; height: 65%" :src="item.picUrl" :preview-src-list="[item.picUrl]"> </el-image>
            <div>
              <el-button type="text">文件信息</el-button>
            </div>
          </li>
          <!-- <li class="resource">视频</li> -->
        </ul>
        <div v-if="matterList.length <= 0" style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh"><span></span><el-empty :image="require('@/assets/image/wushuju.png')" description=" "></el-empty></div>
        <!-- @/assets/image/wushuju.png -->
      </div>
      <div style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh" v-else><span></span><el-empty description="请选择文件夹"></el-empty></div>
    </el-card>
    <!-- 右侧详细信息 -->
    <el-card class="box-card content_three">
      <div class="set" v-if="exhibitionRight">
        <div class="set_one">
          <el-image style="width: 100%; height: 100%" :src="url" :preview-src-list="srcList"> </el-image>
        </div>
        <div class="set_two">
          <div class="particulars">
            <span style="font-size: 14px; color: black">文件名：</span>
            <el-input @blur="blur_" v-model="workName" style="width: 70%" placeholder="请输入文件名"></el-input>
            <p>大小：<span class="sp">256KB</span></p>
            <p>格式：<span class="sp">JPG</span></p>
            <p>类型：<span class="sp">图片</span></p>
            <p>尺寸：<span class="sp">1920*1000</span></p>
            <p>上传时间：<span class="sp">2021-02-19</span></p>
            <p>所在文件夹：<span class="sp">PC轮播图</span></p>
            <p>
              文件链接：<span class="sp">{{ aaa | commentEllipsis(aaa) }}</span>
              <el-button style="font-size: 12px; margin-left: 5px" type="text" size="small" @click="copyUrl">复制链接</el-button>
            </p>
            <div class="btn">
              <!-- 上传（替换文件） -->
              <el-button @click="upload_" style="margin-right: 2vw">替换文件</el-button>
              <input v-show="false" ref="fileRef" type="file" @change="fileChange($event)" />
              <!--  -->
              <el-button type="primary" @click="download_">下载</el-button>
            </div>
          </div>
        </div>
      </div>
      <div style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh" v-else><span></span><el-empty description="请选择图片..."></el-empty></div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import tree from './components/tree'
export default {
  name: 'material',
  components: {
    tree
  },
  data() {
    return {
      fileSearch: {
        type_: '',
        rank_: '',
        name_: ''
      },
      workName: '',
      leixingOptions: [{ name: '图片' }, { name: '视频' }],
      paixuOptions: [{ name: '按上传时间升序' }, { name: '按上传时间降序' }],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: ['https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      aaa: 'https://www.csdn.net/tags/MtTaAg0sMzMwNDEtYmxvZwO0O0OO0O0O.html',
      exhibition: false,
      exhibitionRight: true,
      matterList: []
    }
  },
  methods: {
    // 复制文件链接
    copyUrl(item, type) {
      var copyTest = this.aaa
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
    },
    blur_() {
      console.log('失焦了 调保存接口吧')
    },

    getScroll(event) {
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight
      console.log(scrollBottom)
      // if (this.finished && scrollBottom < 40) {
      //  操作
      // }
    },
    upload_() {
      this.$refs.fileRef.dispatchEvent(new MouseEvent('click')) //弹出选择本地文件
    },
    fileChange(e) {
      console.log(e)
      console.log(e.target.files)
      console.log(e.target.files[0].name)
    },
    download_() {
      console.log('下载')
    },
    matter(data) {
      this.exhibition = true
      this.loadData(data)
    },
    loadData(data) {
      request({
        url: '/api/cms/picinfo/listpicurl',
        method: 'POST',
        data: { data: { materialCode: data.code }, funcModule: '获取素材列表', funcOperation: '获取素材列表' }
      })
        .then((res) => {
          if (res.data) {
            debugger
            this.matterList = res.data
            console.log(res.data)
          } else {
          }
        })
        .catch(() => {})
    }
  },
  filters: {
    // 过滤
    commentEllipsis(value) {
      if (value.length != undefined) {
        if (value.length > 15) {
          return value.slice(0, 14) + '...'
        } else {
          return value
        }
      }
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
.search {
  padding: 0px 20px;
  padding-top: 20px;
  width: 100%;
  height: 5%;
  // border-bottom: 1px solid lightgrey;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.content_ {
  width: 100%;
  // hkz
  height: 85vh;
  // margin: auto;
  text-align: center;
  overflow-y: auto;
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
      // line-height: 30px;
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
}
.set_two {
  margin-top: 5vh;
  width: 100%;
  height: 50vh;
}
.particulars {
  p {
    margin-top: 2vh;
    font-size: 14px;
    color: black;
  }
  .sp {
    font-size: 14px;
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
</style>