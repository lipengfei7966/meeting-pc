<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title">
          <strong>其它需求信息或者注意事项</strong>
          <span class="international-formevent-title">Additional Comments</span>
        </div>
      </div>
      <div class="rfp_box">
          <div class="rfp_room clx">
              <p>{{other}}</p>
            <br/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['other']
};
</script>

<style lang="scss">
.clx {
    zoom: 1;
}
.room_date, .room_budget {
    display: flex;
}
</style>