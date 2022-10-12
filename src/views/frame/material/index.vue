<template>
  <div class="material">
    <el-card class="box-card content_one">
      <div>
        <tree />
      </div>
    </el-card>
    <el-card class="box-card content_two">
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
      <ul class="content_">
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" :src="url" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" :src="url" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" :src="url" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" :src="url" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" :src="url" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" :src="url" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <li class="resource">
          <p>图片名称</p>
          <el-image style="width: 100%; height: 65%" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="srcList"> </el-image>
          <el-button type="text">详情</el-button>
        </li>
        <!-- <li class="resource">视频</li> -->
      </ul>
    </el-card>
    <el-card class="box-card content_three">
      <div class="set">
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
              <el-button style="margin-right: 2vw">替换文件</el-button>
              <el-button type="primary">下载</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
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
      leixingOptions: [{ name: '内容一' }, { name: '内容二' }],
      paixuOptions: [{ name: '内容一' }, { name: '内容二' }],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: ['https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      aaa: 'https://www.csdn.net/tags/MtTaAg0sMzMwNDEtYmxvZwO0O0OO0O0O.html'
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
  width: 100%;
  height: 5%;
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
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    p {
      line-height: 30px;
    }
  }
  .resource :hover {
    // top: 2px;
    // animation: move 0.7s linear infinite;
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
</style>