<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title">
          <strong>旅行社代付</strong>
          <span class="international-formevent-title">Paying Agent</span>
        </div>
      </div>
      <div class="rfp_box">
          <div class="rfp_room clx">
            <div class="room_date">
              本会中酒店部分订单需要旅行社代付：<strong>{{inquiry_sheet.travelagency_payment}}</strong>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['inquiry_sheet']
};
</script>

<style lang="scss">
.clx {
    zoom: 1;
}

</style>