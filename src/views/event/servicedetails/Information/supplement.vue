<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title">
          <strong>询价单补充信息</strong>
          <span class="international-formevent-title"
            >RFP Additional Information</span
          >
        </div>
      </div>
      <div class="rfp_box">
        <div class="add_item clx" style="line-height: 32px;clear:both">
          <div class="add_sub">附件
            <span class="international-formevent-title">Attachments
              </span>
          </div>
          <div class="add_up">
            <div class="fileName" style="cursor: pointer" v-for="(file,index) in files" :key="index" @click="downloadFile(file)">
              {{file.filename}}
            </div>
          </div>
        </div>
        <div class="add_item clx" style="line-height: 32px;clear:both">
          <div class="add_sub">日期
            <span class="international-formevent-title">My Event Dates Are Flexible</span>
          </div>
          
          <div class="add_up">{{isadjustdate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['files','isadjustdate'],
  data(){
    return{

    }
  },
  methods:{
    downloadFile(file){
      // window.open(file.filepath, "_blank");
      let a_link = document.createElement('a')
      // 这里是将url转成blob地址，
      fetch(file.filepath).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
        a_link.href = URL.createObjectURL(blob)
        console.log(a_link.href)
        a_link.download = file.filename //下载的文件的名字
        document.body.appendChild(a_link)
        a_link.click()
      })
    }
  }
};
</script>

<style lang="scss">
.clx {
  zoom: 1;
}

.add_item .add_sub {
    float: left;
    width: 270px;
    line-height: 32px;
    color: #787878;
    font-size: 14px;
}
.fileName{
  color: #2896eb;
  cursor: pointer;
}
</style>