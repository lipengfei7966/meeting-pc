(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d61bc"],{"70c0":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e._self._c;return a("div",[a("screen",{attrs:{filtrate:e.filtrate,radioVal:e.radioVal},on:{screen:e.screen}}),a("div",{staticStyle:{width:"1230px",margin:"20px auto","text-align":"center"}},[a("el-card",{staticClass:"box-card"},[a("h2",[e._v("父页面")])])],1),a("mettingList",{attrs:{tableData:e.tableData,columns:e.columns,operate:e.operate,offside:e.offside},on:{classifyName:e.classifyName,publicClick:e.publicClick}})],1)},s=[],l=t("b7e4"),r=t("87da"),n={components:{mettingList:l["a"],screen:r["a"]},data(){return{columns:[{label:"规则编号",width:"120",prop:"serialNumber",hidden:!1},{label:"描述",width:"260",prop:"description",hidden:!0},{label:"服务调用次数",prop:"serveFrequency",hidden:!1},{label:"状态",width:"120",prop:"status",hidden:!1},{label:"审批状态",width:"120",prop:"examineStatus",hidden:!1},{label:"更新时间",width:"220",prop:"updateTime",hidden:!1}],tableData:[{serialNumber:"000000001",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000002",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000003",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:1,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000004",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:1,updateTime:"2022年7月28日"},{serialNumber:"000000001",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000002",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000003",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:1,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000004",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:1,updateTime:"2022年7月28日"},{serialNumber:"000000001",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000002",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000003",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:1,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000004",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:1,updateTime:"2022年7月28日"},{serialNumber:"000000001",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000002",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000003",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:1,examineStatus:0,updateTime:"2022年7月28日"},{serialNumber:"000000004",description:"我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",serveFrequency:"1342",status:0,examineStatus:1,updateTime:"2022年7月28日"}],operate:[{propName:"详情",classifyName:"particulars"},{propName:"编辑",classifyName:"editClick"},{propName:"审批",classifyName:"examineClick"},{propName:"删除",classifyName:"aaa"}],offside:[{propName:"新增",classifyName:"add"},{propName:"编辑",classifyName:"edit"},{propName:"删除",classifyName:"del"}],filtrate:[{label:"名称",type:"input",modelVal:"",fieId:"a_",inputType:"string"},{label:"会议时间",type:"daterange",modelVal:"",fieId:"aa_"},{label:"联系方式",type:"input",modelVal:"",fieId:"b_",inputType:"string"},{label:"组织机构",type:"input",modelVal:"",fieId:"c_",inputType:"string"},{label:"组织机构2",type:"input",modelVal:"",fieId:"c_",inputType:"string"},{label:"组织机构3",type:"input",modelVal:"",fieId:"c_",inputType:"string"},{label:"组织机构4",type:"input",modelVal:"",fieId:"c_",inputType:"string"},{label:"组织机构5",type:"input",modelVal:"",fieId:"c_",inputType:"string"},{label:"年龄",type:"input",modelVal:"",fieId:"d_",inputType:"number"},{label:"领域",type:"select",fieId:"e_",modelVal:"",selsetVal:[{lable:"0",value:"选项一"},{lable:"1",value:"选项二"}]},{label:"所属地",type:"checkbox",fieId:"f_",modelVal:[],subset:[{label:"南京"},{label:"北京"},{label:"天津"}]}],radioVal:{label:"分类",type:"radio",modelVal:0,subset:[{label:0,name:"选择一"},{label:1,name:"选择二"}]}}},methods:{editClick(e,a){console.log(e,a,"编辑")},examineClick(e,a){console.log(e,a,"审批")},aaa(e,a){console.log(e,a,"删除")},particulars(e,a){console.log(e,a,"详情")},add(e,a){console.log(e,a,"右新增")},edit(e,a){console.log(e,a,"右编辑")},del(e,a){console.log(e,a,"右删除")},classifyName(e,a){let t=this.$options.methods;const i=this;t[e](i,a)},publicClick(e,a){let t=this.$options.methods;const i=this;t[e](i,a)},screen(e,a){console.log(e,a)}}},u=n,p=t("0b56"),d=Object(p["a"])(u,i,s,!1,null,null,null);a["default"]=d.exports}}]);