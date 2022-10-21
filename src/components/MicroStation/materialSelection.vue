<template>
  <div class="material">
    <!-- 左侧树 -->
    <el-card class="box-card content_one_">
      <div class="">
        <tree @matter="matter" />
      </div>
    </el-card>
    <!-- 中间素材列表 -->
    <el-card class="box-card content_two_">
      <div v-if="exhibition" style="height: 95vh">
        <div class="search_" :style="isSearch ? 'padding-top: 20px' : 'padding-top: 0px'">
          <el-form :model="fileSearch" :label-width="labelWidth ? '90px' : '0px'">
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
        <ul v-if="matterList.length > 0" id="app_" class="content_A" @scroll.passive="getScroll($event)">
          <el-checkbox-group v-model="checkList" class="check" v-if="MultiSelect">
            <li class="resource_" v-for="(item, index) in matterList" :key="index">
              <el-image style="width: 100%; height: 75%" :src="item.picUrl" :preview-src-list="[item.picUrl]"> </el-image>
              <div style="line-height: 7.5vh">
                <el-checkbox :label="item">
                  <el-tooltip :content="item.picName" placement="top">
                    <p>{{ item.picName | headline(item.picName) }}</p>
                  </el-tooltip>
                </el-checkbox>
              </div>
            </li>
          </el-checkbox-group>
          <div class="check" v-else>
            <li class="resource_" v-for="(item, index) in matterList" :key="index">
              <el-image style="width: 100%; height: 75%" :src="item.picUrl" :preview-src-list="[item.picUrl]"> </el-image>
              <div style="line-height: 7.5vh">
                <el-radio v-model="pictureRadio" :label="item"
                  ><el-tooltip :content="item.picName" placement="top">
                    <span>{{ item.picName | headline(item.picName) }}</span>
                  </el-tooltip></el-radio
                >
              </div>
            </li>
          </div>
        </ul>
        <div v-if="matterList.length <= 0" style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh"><span></span><el-empty :image="require('@/assets/image/wushuju.png')" description=" "></el-empty></div>
      </div>
      <div style="font-size: 20px; color: lightgray; text-align: center; margin-top: 20vh; height: 75vh" v-else><span></span><el-empty description="请选择文件夹"></el-empty></div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import tree from './treeList'
export default {
  name: 'material',
  components: {
    tree
  },
  props: {
    MultiSelect: {
      type: Boolean,
      default: true
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fileSearch: {
        picType: '',
        rank_: '',
        picName: ''
      },
      leixingOptions: [
        { name: '图片', id: '0' },
        { name: '视频', id: '1' }
      ],
      paixuOptions: [
        { name: '按上传时间升序', id: 'createDate.asc' },
        { name: '按上传时间降序', id: 'createDate.desc' }
      ],
      exhibition: false,
      matterList: [],
      treeDatas: null,
      current: 1,
      total: 1,
      pageSize: 20,
      //多选的
      checkList: [],
      // 单选的
      pictureRadio: ''
    }
  },
  methods: {
    // 顶部搜索
    searchClick() {
      console.log('搜索', this.fileSearch)
      this.pageSize = 20
      this.current = 1
      this.loadData(this.treeDatas)
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
    matter(data) {
      this.exhibition = true
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
        data: { current: this.current, isPage: true, size: this.pageSize, data: { materialCode: data.code, picType: this.fileSearch.picType, picName: this.fileSearch.picName, defaultSortString: this.fileSearch.rank_ }, funcModule: '获取素材列表', funcOperation: '获取素材列表' }
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
.content_one_ {
  width: 24%;
  height: 98%;
  margin: 5px;
}
.content_two_ {
  width: 75%;
  height: 98%;
  margin: 5px;
}
.search_ {
  padding: 0px 20px;
  // padding-top: 20px;
  width: 100%;
  height: 10%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.content_A {
  width: 100%;
  height: 85vh;
  text-align: center;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .resource_ {
    width: 24%;
    height: 35%;
    margin-top: 10px;
    margin-right: 1%;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
}
.check {
  width: 100%;
  height: 85vh;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
</style>