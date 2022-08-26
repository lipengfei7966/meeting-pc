<template>
  <div class="app-container">
    <header id="elHead" :style="{ width: clientWidth < 1366 && !app.isScreenFull ? (this.sidebar.opened ? '1163px' : '1323px') : 'auto' }">
      <el-form @submit.native.prevent label-position="left" :inline="true" class="header-form-inline">
        <el-row :gutter="20" style="width: 94%">
          <el-col :span="6">
            <el-form-item label="服务器">
              <bs-base-select v-model="serverKey" :attrs="{ datadict: 'serverAlias', clearable: true }" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <main :style="{ width: clientWidth < 1366 ? (this.sidebar.opened && !app.isScreenFull ? '1163px' : '1323px') : 'auto' }">
      <template v-for="dict in $t('datadict.serverAlias')">
        <el-tree :key="dict.value" v-if="serverKey === dict.value" :props="{ isLeaf: (data, node) => data.type === 'file' }" :load="(node, resolve) => loadDirTree(node, resolve, dict.value)" lazy node-key="treeNodeKey" :expand-on-click-node="false" highlight-current>
          <span class="bs-log-file-tree" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span>
              <span class="bs-log-file-tree-size">{{ formatNum(data.length) }}</span>
              <span class="bs-log-file-tree-time">{{ data.lastModified }}</span>
              <span>
                <el-button v-if="data.type === 'file'" type="text" size="mini" @click="() => downloadFile(node, data, dict.value, dict.label)"> 下载 </el-button>
                <!--
                <el-button v-else type="text" size="mini" @click="() => freshTree(node, data, dict.value, dict.label)"> 刷新 </el-button>
                -->
              </span>
            </span>
          </span>
        </el-tree>
      </template>
    </main>
    <el-dialog :visible.sync="downloadDialog.show" title="下载文件">
      <form ref="downloadForm" method="post" :action="downloadDialog.action" target="_black">
        <input type="hidden" :value="downloadDialog.authorization" name="Authorization" />
        <input type="hidden" :value="downloadDialog.rootIndex" name="rootIndex" />
        <input type="hidden" :value="downloadDialog.path" name="path" />
        <input type="hidden" :value="downloadDialog.position" name="position" />
        <input type="hidden" :value="downloadDialog.readsize" name="readsize" />
        <el-form>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="服务器">{{ downloadDialog.serverAlias }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="文件路径">{{ downloadDialog.filePathdName }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件大小">{{ formatNum(downloadDialog.fileSize) }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="更新时间">{{ downloadDialog.fileTime }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开始位置">
                <input-formatter v-model="downloadDialog.position" type="thousands" :precision="0" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下载大小">
                <input-formatter v-model="downloadDialog.readsize" type="thousands" :precision="0" :gtmin="0" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadDialog.show = false">取消</el-button>
        <el-button type="primary" @click="donwloadFileOk">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/frame/base/auth'
import request from '@/utils/frame/base/request'
export default {
  data() {
    return {
      serverKey: null,
      numFmt: new Intl.NumberFormat(),
      downloadDialog: {
        show: false,
        authorization: null,
        rootIndex: null,
        path: null,
        serverAlias: null,
        filePathdName: null,
        fileSize: null,
        fileTime: null,
        position: null,
        readsize: null,
        action: null
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'clientWidth'])
  },
  methods: {
    downloadFile(node, data, serverIp, serverName) {
      let rootNode = node
      while (rootNode.parent && rootNode.parent.data) {
        rootNode = rootNode.parent
      }
      this.downloadDialog.serverAlias = serverName
      this.downloadDialog.rootIndex = data.rootIndex
      this.downloadDialog.path = data.path
      this.downloadDialog.filePathdName = rootNode.data.name + data.path
      this.downloadDialog.fileSize = data.length
      this.downloadDialog.fileTime = data.lastModified
      this.downloadDialog.position = null
      this.downloadDialog.readsize = null
      this.downloadDialog.show = true
      let tokenStr = this.$store.getters.token
      if (tokenStr === null || tokenStr === undefined) {
        tokenStr = getToken()
      }
      this.downloadDialog.authorization = tokenStr
      this.downloadDialog.action = process.env.BASE_API + '/api/cfg/logfile/download?' + encodeURIComponent(serverIp)
    },
    donwloadFileOk() {
      this.$refs.downloadForm.submit()
      this.downloadDialog.show = false
    },
    // freshTree(node, data, serverIp, serverName) {
    //   console.log(node)
    //   console.log(data)
    // },
    formatNum(num) {
      if (num === null || num === undefined) {
        return ''
      } else {
        return this.numFmt.format(num)
      }
    },
    loadDirTree(node, resolve, serverIp) {
      request({
        url: '/api/cfg/logfile/list?' + encodeURIComponent(serverIp),
        method: 'post',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: node.level === 0 ? {} : node.data
        }
      }).then((response) => {
        if (response.status) {
          const filelist = []
          for (const file of response.data) {
            file.treeNodeKey = file.rootIndex + '\t' + file.path
            filelist.push(file)
          }
          resolve(filelist)
        }
      })
    }
  }
}
</script>
<style scoped>
.bs-log-file-tree {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.bs-log-file-tree >>> span:last-child > span {
  display: inline-block;
  width: 150px;
  text-align: right;
}
.bs-log-file-tree >>> span:last-child > span:last-child {
  width: 80px;
  text-align: center;
}
</style>