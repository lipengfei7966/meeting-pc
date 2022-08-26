import Vue from 'vue'
//上传文件后缀名限制
export const limitsEffect = (file) =>{
	//错误提示
	const errMsg ='注意: 只允许上传以下文件类型：doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、zip、eml、rtf、msg、gif、bmp、tif、tiff、rar、iso、7z、tar、bz2、gzip、txt、mp4、xps、ofd，最大30M';
	//后缀性限制参考
	const typeList = ['doc', 'docx', 'xls', 'xlsx', 'xlsm', 'pdf', 'ppt', 'pptx', 'jpeg', 'jpg', 'png', 'zip', 'eml', 'rtf', 'msg', 'gif', 'bmp', 'tif', 'tiff', 'rar', 'iso', '7z', 'tar', 'bz2', 'gzip', 'txt', 'mp4', 'xps', 'ofd'];
	const fileName = file.name;
	const extension = fileName.substr(fileName.lastIndexOf('.') + 1);
	const isRT = typeList.includes(extension);
	if(!isRT){
		Vue.prototype.$message.error(errMsg);
	}
	//isRT为false：后缀不符合，isRT为true：后缀符合
	return isRT;
}