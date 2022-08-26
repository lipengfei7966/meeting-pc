<template>
  <div>
		<a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <el-form :model="fileSearch" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="文件名称">
            <el-input size="small" v-model="fileSearch.file_name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属节点">
            <el-select filterable size="small" @change="jiedianChange" v-model="fileSearch.node" clearable>
              <el-option v-for="item in jiedianOptions" :label="item.name" :value="item.name" :key="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文件分类">
            <el-select filterable size="small" v-model="fileSearch.file_type" clearable>
              <el-option v-for="item in fenleiOptions" :label="item.name" :value="item.name" :key="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" align="right">
          <el-button size="small" type="primary" @click="searchFile(1)">搜 索</el-button>
          <el-button size="small" type="primary" @click="resetSearch">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="meetingFileList" style="width: 100%" :row-key="getRowKeys" @selection-change="filesSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" width="60" align="center"></el-table-column>
      <el-table-column prop="node" label="所属节点" ></el-table-column>
      <el-table-column prop="file_type" label="文件分类" ></el-table-column>
      <el-table-column prop="file_name" label="文件名" >
				<template slot-scope="scope">
          <el-button type="text" size="small" @click="handlePreview(scope.row)">{{scope.row.file_name}}</el-button>
        </template>
			</el-table-column>
      <el-table-column prop="submitter_name" label="上传人" ></el-table-column>
      <el-table-column prop="create_date" label="上传时间"></el-table-column>
      <el-table-column prop="remarks" label="备注" ></el-table-column>
      <el-table-column label="操作" v-if="showOperation">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="downloadFile(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination  ">
      <div v-if="showOperation" style="display:inline-block">	
        <el-button type="primary" size="small" @click="uploadShow = true">上传文件</el-button>
        <el-button type="primary" size="small" @click="downloadAll">打包下载</el-button>
        <!-- <el-button type="primary" size="small" v-if="eventInfo.tourist_group_no" @click="uploadB2BFiles">上传B2B</el-button> -->
      </div>
      <el-pagination
        style="float:right"
        @current-change="handleCurrentChange"
        :current-page.sync="fileSearch.pageIndex"
        class="pagination_part" 
        background layout="total, prev, pager, next" 
        :total="fileTotalCount">
      </el-pagination>
    </div>
    
    <!-- 文件上传弹框 -->
    <el-dialog :visible.sync="uploadShow" width="600px" title="上传文件">
			<el-form :model="uploadFiles" label-width="100px">
        <el-form-item label="文件类型">
            <el-select filterable size="small" v-model="uploadFiles.files_type" clearable>
              <el-option v-for="item in uploadFilesType" :label="item.label" :value="item.type" :key="item.type"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="待上传文件">
          <el-upload
            ref="upload"
            :action="UploadFilesUrl"
            :before-upload="fileLimit"
            :limit="1"
            :on-exceed="overLimit"
            :on-success="meetingFilesUploadSuccess"
            :file-list="uploadFiles.meetingFilesUploadList"
            :show-file-list="true"
            :auto-upload="false"
            :multiple="true">
          <el-button type="primary">选择文件</el-button>
        </el-upload>
        </el-form-item>
      </el-form>
      

			<span slot="footer" class="dialog-footer flex_row justify_center">
				<el-button type="primary" @click="confirmUpload">确 认</el-button>
				<el-button type="info" @click="uploadShow = false">取 消</el-button>
			</span>
		</el-dialog>

		<!-- 打包下载弹窗 -->
    <el-dialog :visible.sync="downloadAllShow" width="600px" title="打包下载">
			<el-form >
        <el-form-item label="下载信息">
					<el-radio v-model="downloadType" :label="0">下载源文件(包含文件清单Excel)</el-radio>
					<el-radio v-model="downloadType" :label="1">仅文件清单Excel</el-radio>
        </el-form-item>
				注：已选择 {{ checkedFiles.length || allCount }} 个文件，请确认是否打包下载
      </el-form>
      

			<span slot="footer" class="dialog-footer flex_row justify_center">
				<el-button type="primary" @click="confirmDownloadAll">确 认</el-button>
				<el-button type="info" @click="downloadAllShow = false">取 消</el-button>
			</span>
		</el-dialog>

		<!-- 上传B2B团附件弹框 -->
		<el-dialog :visible.sync="uploadB2BFilesShow" width="60%" title="上传B2B团附件" align="center">
			<el-table :data="uploadB2BFilesList" header-align="center" style="width: 100%">
					<el-table-column prop="file_name" label="文件名称" width="180" show-overflow-tooltip header-align="center">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handlePreview(scope.row)">{{scope.row.file_name}}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="类型" width="180" header-align="center">
						<template slot-scope="scope">
							<el-select v-model="scope.row.type">
								<el-option label="客户" :value="0"></el-option>	
								<el-option label="供应商" :value="1"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="file_type" label="附件类型" width="180" header-align="center">
						<template slot-scope="scope">
							<el-select v-model="scope.row.file_type">
								<el-option v-for="(item,index) in filesTypes" :label="item.name" :value="item.code" :key="index"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="remarks" label="备注" header-align="center">
						<template slot-scope="scope">
							<el-input type="textarea" :rows="2" clearable v-model="scope.row.remarks"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="60" header-align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="b2bDeleteFile(scope)">删除</el-button>
							</template>
						</el-table-column>
				</el-table>
			<span slot="footer" class="dialog-footer flex_row justify_center">
				<el-button type="primary" @click="submit">确认，提交B2B建团</el-button>
				<el-button type="info" @click="uploadB2BFilesShow = false">取 消</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
import JSZip, { file } from 'jszip'
import FileSaver from 'file-saver'
import {limitsEffect} from "@/utils/uploadRestrictions.js"
import { fileLimit,  } from '@/utils/common';
import { MAINHOST, } from "@/config";
export default {
  name: 'meetingFiles',
  // props: ['showOperation'],
  props:{
    showOperation:{
      type: Boolean,
      // required: true,
      default: true
    },
		eventInfo:{
			type: Object,
			required:true
		}
  },
  data(){
    return{
      uploadShow: false, // 文件上传弹框
			uploadB2BFilesShow:false, // 上传B2B建团弹窗
      uploadFiles:{
        files_type: 1,
        meetingFilesUploadList:[], // 会议文件上传文件
      },
			uploadB2BFilesList:[], // 提交B2B 建团附件列表
			filesTypes:[
				{name:'PO单',code: '001'},
				{name:'合同',code: '002'},
				{name:'协议',code: '003'},
				{name:'报价单',code:'004'},
				{name:'变更单',code: '005'},
				{name:'变更通知',code: '006'},
				{name:'邮件确认',code: '007'},
				{name:'账单',code: '008'},
				{name:'其他',code: '009'},
				{name:'待客户确认资料',code: '010'},
				{name:'酒店比价文件',code:'011'},
				{name:'租车比价文件',code: '012'},
			],
      // 文书上传-文件类型下拉选项
      uploadFilesType:[
        {
          type: 1,
          label: 'PO/授标文件'
        },
        {
          type: 5,
          label: '其他附件'
        }
      ],
      fileSearch: {
				meetingid: this.eventInfo.id,
				file_name:'',
				node:'',
				file_type:'',
				pageSize: 10,
				pageIndex: 1
			},// 文件查询条件
			fileTotalCount: 0, // 查询文件总数量
			allCount:0,// 会议附件总数量
			// 所属节点下拉选项
			jiedianOptions:[
				{
					name:'会议信息',
					otherOptions:[
						{
							name:'会议附件',
						},
						{
							name:'PO/授标文件',
						},
						{
							name:'其他附件',
						},
					]
				},
				{
					name:'会议询价',
					otherOptions:[
						{
							name:'询价单补充附件',
						},
					]
				},
				{
					name:'报价单',
					otherOptions:[
						{
							name:'报价书附件',
						},
					]
				},
				{
					name:'留言',
					otherOptions:[
						{
							name:'留言附件',
						},
					]
				},
				{
					name:'结算单',
					otherOptions:[
						{
							name:'客户结算单',
						},
						{
							name:'客户结算确认邮件',
						},
						{
							name:'PO单',
						},
						{
							name:'供应商发票及账单',
						},
						{
							name:'酒店住宿发票+小联',
						},
						{
							name:'酒店餐饮发票+小联',
						},
						{
							name:'酒店会场发票+小联',
						},
						{
							name:'外出用餐发票+小联',
						},
						{
							name:'注册费发票+小联',
						},
						{
							name:'用车发票+小联',
						},
						{
							name:'制作物发票+小联',
						},
						{
							name:'保险发票+小联',
						},
						{
							name:'签到表',
						},
						{
							name:'会议照片-全景',
						},
						{
							name:'其他结算附件',
						},
					]
				},
				{
					name:'会议订单',
					otherOptions:[
						{
							name:'开票通知文件',
						},
						{
							name:'发票文件',
						},
					]
				},
				{
					name:'附加信息',
					otherOptions:[
						{
							name:'自定义信息附件',
						},
					]
				},
			],
			// 文件分类下拉选项
			fenleiOptions:[],
			meetingFileList:[],
      UploadFilesUrl: MAINHOST + "/MeetingMa/UploadFiles",
			downloadUrl:'',
			allFiles:[],
      downloadAllShow:false, // 打包下载弹窗
			downloadType: 0, // 打包下载类型
			checkedFiles:[], //勾选文件列表
    }
  },
  mounted(){
		console.log(this.eventInfo)
		this.searchFile();
  },
  methods:{
    fileLimit,
    // 文件搜索
		searchFile(type){
			if(type == 1){
				this.fileSearch.pageIndex = 1
			}
			this.$api.GetAllFile(
				this.fileSearch
				,"POST").then(res => {
					this.meetingFileList = res.EvetModels;
					this.fileTotalCount = res.pageInfo.totalCount
					this.allCount = res.pageInfo.allCount
			})
		},
		// 重置搜索条件
		resetSearch(){
			this.fileSearch.file_name ='';
			this.fileSearch.node ='';
			this.fileSearch.file_type ='';
			this.searchFile()
		},
    // 会议文件翻页保留之前勾选数据
    getRowKeys(row) {
      return row.id
    },
		// 预览附件
    handlePreview(file) {
			debugger
			if(!file.file_path) return;
			// 获取文件后缀名
			let suffix = file.file_path.substring(file.file_path.lastIndexOf(".")+1)
			// doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
			let types1 = ['pdf','jpeg','jpg','png','txt'];
			let types2 = ['docx','doc','xls','xlsx','xlsm','ppt','pptx'];
			file.file_path = file.file_path.replace(/http:/, 'https:');
			this.downloadUrl= file.file_path
			if(types2.includes(suffix)){
				this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.file_path)
			}else if(types1.includes(suffix)){
				this.downloadUrl = file.file_path
			}else{
				this.$message.info('文件格式不支持预览，下载后查看')
			}
			setTimeout(() => {
				this.$refs.a_click.click();
			}, 100);
		},
		jiedianChange(jeidianNmae){
			this.fileSearch.file_type = ''; // 清空二级分类
      let checkJiedian = this.jiedianOptions.find(e=>e.name==jeidianNmae)
      if(checkJiedian){
        this.fenleiOptions = checkJiedian.otherOptions
      }
		},
		handleCurrentChange(val) {
      this.fileSearch.pageIndex = val;
      this.searchFile();
    },
    // 下载文件
		downloadFile(file){
			// window.open(file.file_path, "_blank");
			let url = file.file_path??file.filepath;
			let name = file.file_name??file.filename;
			let a_link = document.createElement('a')
			// 这里是将url转成blob地址，
			fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
			debugger
				a_link.href = URL.createObjectURL(blob)
				console.log(a_link.href)
				a_link.download = name //下载的文件的名字
				document.body.appendChild(a_link)
				a_link.click()
			})
		},

		/**文件打包
		 	* arrImages:文件list:[{fileUrl:文件url,downloadFileName:文件名}]
			* filename 压缩包名
		* */
		filesToRar(arrImages, filename) {
			let _this = this;
			let zip = new JSZip();
			let cache = {};
			let promises = [];
			_this.title = '正在加载压缩文件';
			for (let item of arrImages) {
				// 这里是将url转成blob地址，
				const promise= this.getImgArrayBuffer(item.fileUrl).then(data => {
					// 下载文件, 并存成ArrayBuffer对象(blob)
					zip.file(item.downloadFileName, data, { binary: true }); // 逐个添加文件
					cache[item.downloadFileName] = data;
				});
				promises.push(promise);
			}
			Promise.all(promises).then(() => {
				zip.generateAsync({ type: "blob" }).then(content => {
				_this.title = '正在压缩';
				// 生成二进制流
				FileSaver.saveAs(content, filename); // 利用file-saver保存文件 自定义文件名
				_this.title = '压缩完成';
				this.downloadAllShow = false
				});
			}).catch(res=>{
				_this.$message.error('文件压缩失败');
			});
		},

		//获取文件blob
		getImgArrayBuffer(url){
			// 这里是将url转成blob地址，
			let _this=this;
			return new Promise((resolve, reject) => {
				//通过请求获取文件blob格式
				let xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET", url, true);
				xmlhttp.responseType = "blob";
				xmlhttp.onload = function () {
				if (this.status == 200) {
				resolve(this.response);
				}else{
				reject(this.status);
				}
				}
				xmlhttp.send();
			});
		},

    // 上传文件个数超出限制
		overLimit(files, fileList){
			this.$message.error('每次只能上传一份文件')
		},
    meetingFilesUploadSuccess(file) {
			let postData = {
				id: '', //新增时为空，删除时需要ID
				operation: 0, //操作，新增0 删除1
				event_info_id: this.eventInfo.id, //会议id
				type: this.uploadFiles.files_type, //文件类型(0：系统报价单 1：供应商PO 2：酒店比价文件 3：租车比价文件 4：CVENT文件 5：其他附件)
				file_path: file.weburl, //附件路径
				file_name: file.title //附件名称
				// create_user: 'mazhenheng',//创建人
			};
			this.$api.saveFile({ parameter: JSON.stringify(postData) }, 'POST').then(res => {
				this.$message.success('上传成功');
				this.searchFile();
        this.uploadShow = false;
				this.uploadFiles.meetingFilesUploadList = [];
			});
      
		},
    confirmUpload(){
      this.$refs.upload.submit()
    },
    // 勾选文件回调函数
    filesSelectionChange(Rows){
      // debugger
			this.checkedFiles = Rows;
      this.$emit('checkedFiles',Rows)
    },
    // 打包下载全部文件
    downloadAll(){
			let tempSearch = {
				meetingid: this.eventInfo.id,
				file_name:'',
				node:'',
				file_type:'',
				pageSize: this.allCount,
				pageIndex: 1
			}
			this.$api.GetAllFile(tempSearch,"POST").then(res => {
				this.allFiles = res.EvetModels
				if(this.allFiles.length > 0){
					this.downloadAllShow = true;
				}else{
					this.$message.error('当前会议无可下载文件！')
				}
			})
			
    },
		// 确认打包下载
    confirmDownloadAll(){
			console.log(this.checkedFiles)
			// 获取文件清单
			this.$api.FileDetailedlist(
				{
					meetingid: this.eventInfo.id,
					file: this.checkedFiles.length? this.checkedFiles : this.allFiles
				},"POST").then(res => {
					if(this.downloadType == 1){ // 仅下载文件清单
						let url = res.msg;
						let name = res.title;
						let a_link = document.createElement('a')
						// 这里是将url转成blob地址，
						fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
							a_link.href = URL.createObjectURL(blob)
							console.log(a_link.href)
							a_link.download = name //下载的文件的名字
							document.body.appendChild(a_link)
							a_link.click()
							this.downloadAllShow = false;
						})
					}else{
						let downloadFileLists = [];
						// 添加文件清单列表
						downloadFileLists.push({
							fileUrl: res.msg,
							downloadFileName: res.title
						})

						// 未勾选文件时，点击“打包下载”默认是下载当前会议所有文件；
						// 单独勾选个别文件点击“打包下载”，下载选中文件
						if(this.checkedFiles.length > 0){
							this.checkedFiles.forEach(item => {
								downloadFileLists.push({
									fileUrl: item.file_path,
									downloadFileName: item.file_name
								})
							})
						}else{
							this.allFiles.forEach(item => {
								downloadFileLists.push({
									fileUrl: item.file_path,
									downloadFileName: item.file_name
								})
							})
						}
						
						// 重名文件修改文件名
						let tempArr = [];
						downloadFileLists.forEach(file => {
							let hasfile = tempArr.find(itemFile => itemFile == file.downloadFileName)

							if(!hasfile){
								tempArr.push(file.downloadFileName)
							}
							// debugger
							// tempArr.forEach((itemArr,indexArr) => {
							// 	if(itemArr[0].downloadFileName == file.downloadFileName){
							// 		file.downloadFileName = file.downloadFileName + `(${indexArr})`
							// 		tempArr[indexArr].push(file) 
							// 	}else{
							// 		tempArr.push([file])
							// 	}
							// })

						})
						
						tempArr.forEach(filename => {
							let sameNameIndex = -1;
							downloadFileLists.forEach(file => {
								if(file.downloadFileName == filename){
									sameNameIndex ++;
									if(sameNameIndex > 0){
										let suffix = file.downloadFileName.substring(file.downloadFileName.lastIndexOf(".")) //获取文件后缀（包括.)
										let fileName = file.downloadFileName.split(suffix)[0] + `(${sameNameIndex})`; // 获取文件名
										// debugger
										file.downloadFileName = fileName + suffix; //重新拼接文件名
									}
								}
							})
						})
						debugger
						console.log(downloadFileLists)
						let downloadZipName = '会议文件' + this.eventInfo.event_name + new Date().getTime()
						this.filesToRar(downloadFileLists,downloadZipName)
					}
			})
		},
		// 
		uploadB2BFiles(){
			if(this.checkedFiles.length == 0){
				this.$message.error('请先勾选需要提交B2B的文件')
				return
			}
			this.uploadB2BFilesShow = true;
			this.uploadB2BFilesList = [];//列表初始化
			this.checkedFiles.forEach(item => {
				debugger
				let b2bFile = {
					file_name: item.file_name,
					file_path: item.file_path,
					type: 0, 
					file_type:'001',
					remarks: item.remarks
				}
				this.uploadB2BFilesList.push(b2bFile)
			})
		},
		// 删除b2b文件
		b2bDeleteFile(scope){
			let index = scope.$index
			this.uploadB2BFilesList.splice(index,1);
		},
		// 上传B2B团附件
		submit() {
			let postData = {
				tourist_group_no: this.eventInfo.tourist_group_no, //团号
				files: this.uploadB2BFilesList //文件
			}

			this.$api.UploadFile( postData, 'POST').then(res => {
				console.log(res)
				if(res.status!=1){
					this.$message.error(res.msg)
					return
				}else{
					if(!res.msg){
						this.$message({
							message: "提交附件成功",
							type: 'success'
						});
					}else{
						this.$message({
							message: res.msg,
							type: 'success'
						});
					}
					this.uploadB2BFilesShow = false;
				}
				// this.getDetail();
			});
		},
  }

}
</script>

<style scoped lang="scss">
  .pagination{margin-top: 20px;
    .pagination_part{text-align: right}
  }
</style>