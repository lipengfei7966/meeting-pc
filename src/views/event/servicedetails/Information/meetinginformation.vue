<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title spread_retract">
          <div class="ico" @click="aaa">
            <img :src="require('@/assets/images/jia.png')" alt="" style="width: 10px; height: 10px;" v-show="conferenceHiding">
            <img :src="require('@/assets/images/reduce.png')" alt="" style="width: 11px; height: 11px;" v-show="!conferenceHiding">
            <!-- <img src="../../assets/images/jia.png" alt=""> -->
          </div>

          <strong>会议基本信息<span class="international-formevent-title">Event Profile</span>（敏感信息对供应商隐藏）</strong>
        </div>
      </div>
      <div class="rfp_box" v-show="conferenceHiding">
        <div class="event_base clx">1111</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conferenceHiding: true //点击加减显示隐藏
    }
  },
  methods: {
    aaa() {
      this.conferenceHiding = !this.conferenceHiding
    }
  }
}
</script>

<style lang="scss">
.rfp_title {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
  height: 27px;
}
.rfp_title .spread_retract .ico {
  float: left;
  margin-right: 3px;
}

.ico {
  font-family: 'biz';
}
.rfp_title .title strong {
  float: left;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.international-formevent-title {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 5px;
}
.clx {
  zoom: 1;
}
.rfp_title .spread_retract {
  cursor: pointer;
}
.rfp_title .title {
  float: left;
  line-height: 28px;
}
.rfp_item {
  margin: 20px 0 0 0;
  background: #fff;
  box-shadow: 0 0 4px 1px #e8e8e8;
}
.demand .rfp_box {
  padding: 20px;
}
</style>
