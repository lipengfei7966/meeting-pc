<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title">
          <strong>报价截止日期</strong>
          <span class="international-formevent-title">Paying Agent</span>
        </div>
      </div>
      <div class="rfp_box">
        <div class="rfp_room clx">
          <div class="room_date">
            <!-- {{item[index].end_time}} -->
            报价截止日期 Deadline：<strong>{{inquiry_sheet.end_time}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['inquiry_sheet']
}
</script>

<style lang="scss">
.clx {
  zoom: 1;
}
</style>