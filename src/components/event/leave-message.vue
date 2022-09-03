<template>
  <div class="leave-message">
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <div class="srcoll">
      <div class="message">
        <div class="item" :class="{ me: item.type == 0 }" v-for="item in list" :key="item.id">
          <div class="date">{{item.type == 0?item.Party_A+'@':item.Party_B+'@'}}{{ item.createtime }}</div>
          <div class="msg" v-if="item.message_type == 0">{{ item.message }}</div>
          <div class="msg" v-else>
            <a @click="handlePreview(item.filepath)" style="cursor:pointer">{{item.filename}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="edit">
      <textarea v-model="text" placeholder="在此给客户留言..."></textarea>
      <el-button type="primary" class="btn" @click="addMsg">留言</el-button>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		id: String
	},
	data() {
		return {
			downloadUrl:'',
			list: [],
			text: ''
		};
	},
	mounted() {
		this.getMsgList();
	},
	methods: {
		getMsgList() {
      this.requestApi({
        url: '/inquirysheet/Leavingmessagelist',
        method: 'POST',
        data: { id: this.id },
      }).then(res => {
				this.list = res;
			});
		},
		addMsg() {
			if (!this.text.trim()) {
				this.$message.error('请输入留言信息');
				return;
			}
      this.requestApi({
        url: '/inquirysheet/addLeavingmessage',
        method: 'POST',
        data: {
          message: this.text,
          inquiry_sheet_object_id: this.id
        },
      }).then(res => {
					this.text = '';
					this.getMsgList();
				});
		},
		// 预览留言文件
		handlePreview(filepath) {
			// debugger
			if(!filepath) return;
			// 获取文件后缀名
			let suffix = filepath.substring(filepath.lastIndexOf(".")+1)
			// doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
			let types1 = ['pdf','jpeg','jpg','png','txt'];
			let types2 = ['docx','doc','xls','xlsx','xlsm','ppt','pptx'];
			filepath = filepath.replace(/http:/, 'https:');
			this.downloadUrl= filepath
			if(types2.includes(suffix)){
				this.downloadUrl= 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(filepath)
			}else if(types1.includes(suffix)){
				this.downloadUrl= filepath
			}else{
				this.downloadUrl= filepath;

				this.$message.info('文件格式不支持预览，ssss下载后查看')
			}
			// this.downloadUrl= 'https://view.xdocin.com/view?src=' + encodeURIComponent(file.url)
			setTimeout(() => {
				this.$refs.a_click.click();
			}, 100);
		},
		// 留言下载文件
    downloadFile(fileStr){
      let downloadUrl = fileStr.slice(fileStr.lastIndexOf(',')+1);
      let filename = fileStr.slice(0,fileStr.lastIndexOf(','))
			let a_link = document.createElement('a')
			// // 这里是将url转成blob地址，
			// fetch(downloadUrl).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
				// a_link.href = URL.createObjectURL(blob)
				a_link.href = downloadUrl
			// 	console.log(a_link.href)
				a_link.download = filename //下载的文件的名字/
				document.body.appendChild(a_link)
				a_link.click()
			// })
    },
	}
};
</script>

<style lang="scss" scoped>
.message {
  padding: 10px 0;
  overflow: hidden;
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 5px;
  .item {
    margin-bottom: 10px;
    max-width: 70%;
    &.me {
      margin-left: auto;
      text-align: right;
      .msg {
        background-color: #00aaff;
        color: #ffffff;
        opacity: 0.7;
      }
    }
    .date {
      font-size: 12px;
      color: #ccc;
    }
    .msg {
      line-height: 20px;
      background-color: rgb(245, 245, 245);
      padding: 5px;
      margin-top: 5px;
      border-radius: 5px;
      min-height: 20px;
    }
  }
}
.edit {
  overflow: hidden;
  text-align: center;
  textarea {
    width: 100%;
    line-height: 25px;
    height: calc(30px * 3);
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .btn {
    margin: auto;
    margin-top: 10px;
  }
}
.fileMseeage {
  color: #fff;
  cursor: pointer;
}
.fileMseeage:hover {
  color: cornflowerblue;
}
</style>
