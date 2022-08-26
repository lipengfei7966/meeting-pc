<template>
  <div class="base_part">
    <div class="flex_column show_base_info">
      <span>会议名称Event Name: {{baseInfo.event_name}}</span>
      <span>建团类型: {{baseInfo.event_name}}</span>
      <span>活动类型Event Type: {{baseInfo.tourist_group_type == '1'?'普通团':'展团'}}</span>
      <span>Cvent号: {{baseInfo.cvent_no}}</span>
      <span>客户 Consumer: {{baseInfo.company_name}}</span>
      <span>团电脑号 Team No: {{baseInfo.event_name}}</span>
      <span>服务类型 Service Type: {{baseInfo.service_type}}</span>
      <span>会议城市 City: {{baseInfo.event_city}}</span>
      <span>餐标限制 Food Limit: {{baseInfo.food_limit}}</span>
      <span>参会人数 Attendee NO: {{baseInfo.attendee_no}}</span>
      <span>会议开始日期 Start Date: {{baseInfo.event_startdate}}</span>
      <span>会议结束日期 End Date: {{baseInfo.event_enddate}}</span>
      <span>PR: {{baseInfo.pr}}</span>
      <span>会议总预算 Total Budget: {{baseInfo.total_budget}}</span>
      <!--                <span>会议 IDEvent ID: {{baseInfo.event_name}}</span>-->
      <span>会议创建人 Submitor: {{baseInfo.create_user}}</span>
      <span>客户联系人 Event Owner: {{baseInfo.name}}</span>
      <span>客户所属部门 Owner's Department: {{baseInfo.department}}</span>
      <span>客户联系电话 Owner's Phone NO: {{baseInfo.phone}}</span>
      <span>客户邮箱 Owner's E-mail: {{baseInfo.email}}</span>
      <span>发票类型 Invoice Type: {{baseInfo.invoice_type=='0'?'普票 ':baseInfo.invoice_type=='1'?'专票':'免税'}}</span>
      <span>是否办理免税: {{baseInfo.is_duty_free == '1'?'是':'否'}}</span>
      <span>创建时间 Create Date: {{baseInfo.create_date}}</span>
      <!--              <span>客户材料: {{baseInfo.event_name}}</span>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "basePart",
  props:['baseInfo'],
}
</script>

<style scoped lang="scss">
.show_base_info{
  span{font-size: 14px;color: #777;display: inline-block;height: 20px;line-height: 20px;padding-bottom: 10px}
}
</style>
