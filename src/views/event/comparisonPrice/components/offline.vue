<template>
  <div></div>
</template>

<script>
export default {
  name: 'offline'
}
</script>

<style lang="scss" scoped>
.all {
  background: #f8f8ff;
  /* min-height: 300vh; */
}

* {
  font-style: normal;
}

.main {
  width: 1100px;
  height: 55px;
  margin: auto;

  margin-top: 15px;
}

.main ul {
  display: flex;
  line-height: 55px;
}

.main ul li {
  margin-left: 4px;
}

.content {
  width: 1100px;
  height: 55px;
  background: #626e95;
  margin: auto;
}

.content img {
  width: 30px;
  height: 30px;
  float: left;
  margin-top: 11px;
  margin-left: 15px;
}

.content span {
  line-height: 55px;
  font-size: 18px;
  color: #ffffff;
}

.nformation {
  width: 1100px;
  height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.nformation p {
  line-height: 50px;
}

.nformation p:nth-of-type(1) {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
  margin-left: 15px;
}

.nformation p:nth-of-type(2) {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 6px;
}

.nformation p:nth-of-type(3) {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.information {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-bottom: 10px;
}

.information ul {
  margin-left: 20px;
  overflow: hidden;
}

.information ul li {
  line-height: 32px;
  font-size: 14px;
  margin-top: 10px;
  color: #777;
}

.information ul li:nth-of-type(1) {
  margin-top: 18px;
}

.information ul li:last-of-type {
  margin-bottom: 18px;
}

.service {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-top: 18px;
  margin-bottom: 10px;
}

.Confirm {
  width: 1100px;
  height: 185px;
  background: #edf7fd;
  border: 1px solid #aedcfa;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.06);
}

.b1 {
  width: 120px;
  height: 30px;
  color: #ffffff;
  border: none;
  background: #2896eb;
  margin-top: 35px;
  margin-left: 20px;
}

.Confirm button:nth-of-type(3) {
  width: 120px;
  height: 30px;
  border: 1px solid #2896eb;
  color: #2896eb;
  background: #edf7fd;
  margin-top: 35px;
  margin-left: 17px;
}

.blueness {
  width: 1000px;
  border-top: 1px dashed #aedcfa;
  margin-top: 15px;
  margin-left: 20px;
}

.inputs input {
  width: 650px;
  height: 30px;
  line-height: 30px;
  padding: 0 4px;
  background: #fff;
  border: 1px solid #aedcfa;
  border-radius: 2px;
  color: #282828;
  font-size: 14px;
  margin-top: 35px;
  margin-left: 20px;
  float: left;
}

.mark {
  width: 180px;
  height: 32px;
  float: left;
  background: #2896eb;
  margin-top: 35px;
  border: none;
  color: #ffffff;
  margin-left: 10px;
}

.gray {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

.gray p {
  line-height: 55px;
  margin-left: 15px;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.six {
  width: 1100px;
  height: 70px;
  background: #ffffff;
  margin: auto;
  margin-top: -10px;
  margin-bottom: 10px;
}

.six ul {
  display: flex;
}

.six ul li {
  line-height: 70px;
}

.el-icon-close:before {
  content: '\e6db';
  position: absolute;
  margin-top: -14px;
  margin-left: -15px;
}

.el-dialog__title {
  line-height: 24px;
  font-size: 13px;
  color: #303133;
}

.contentd {
  float: left;
}

.black {
  width: 120px;
  height: 30px;
  position: absolute;
  margin-top: -23px;
  margin-left: 120px;
}

.el-input--prefix .el-input__inner {
  padding-left: 30px;
  width: 200px;
  height: 30px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 206px;

  .el-input__suffix {
    top: -4px;
  }
}

.leave {
  width: 96%;
  height: 100px;
  margin-top: 40px;
}

.el-dialog--center .el-dialog__footer {
  text-align: inherit;
  margin-left: -20px;
}

.winning {
  margin-left: 96px;
}

.submit {
  width: 100px;
}

.top {
  width: 90%;
  height: 100px;
  margin-left: 11px;
}

.turn {
  margin-left: 11px;
}

.el-icon-time:before {
  content: '\e71f';
  position: absolute;
  margin-top: -5px;
  margin-left: -8px;
}

.cannot {
  margin-left: 294px;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #fff;
  overflow-x: auto;
}

tr,
th,
td {
  border: 1px solid #e4e4e4;
}

tr {
  width: 2200px;
}

th {
  width: 200px;
}

td {
  width: 817px;
}

.hotel_pic {
  margin: 0 10px 0 0px;
  float: left;
}

.status_icon {
  float: right;
  margin-right: -20px;
}

.offer_detail,
.hot {
  color: #f91;
  font-weight: 600;
}

.offer_detail a {
  text-decoration: none;
  color: #2896eb;
}

.total {
  color: #282828;
}

.light {
  color: #a7a7a7;
}

.dark {
  color: #282828;
}

.ml_10 {
  color: #ccc;
  float: right;
  margin-right: 10px;
}

.price_sub_list {
  color: #787878;
}

.floatTr {
  position: relative;
  top: 0;
}

.floatTr th,
.floatTr td {
  background-color: #fff;
}

.left-arrow {
  position: fixed;
  background: rgba(1, 1, 1, 0.5);
  cursor: pointer;
  width: 60px;
  text-align: center;
  top: 50%;
  top: 353.709px;
  z-index: 9999;
}

.right-arrow {
  position: fixed;
  background: rgba(1, 1, 1, 0.5);
  cursor: pointer;
  width: 60px;
  text-align: center;
  top: 50%;
  margin-left: 1039.5px;
  top: 353.709px;
  z-index: 9999;
}

.star,
.address,
.contactName,
.contactEMail,
.contactPhone,
.link,
.need,
.roomPrice,
.repastPrice,
.tender-c,
.indate,
.cancel,
.operate,
.operatePage,
.purchase {
  padding: 12px 20px;
}

.star,
.address,
.contactName,
.contactEMail,
.contactPhone,
.link-detail {
  font-weight: normal;
}

.need {
  background: #fff5ea;
}

.purchase {
  height: 110px;
}

.go_offer_link {
  background: #09e;
  width: 130px;
  height: 30px;
  line-height: 30px;
  display: block;
  text-align: center;
  color: #fff;
}

.roomPrice-img {
  cursor: pointer;
  color: #282828;
  font-weight: 600;
}

.roomPrice-img:hover {
  color: #f91;
}

.repastPrice-img {
  cursor: pointer;
  color: #282828;
  font-weight: 600;
}

.repastPrice-img:hover {
  color: #f91;
}

.cancel-img {
  cursor: pointer;
  color: #282828;
  font-weight: 600;
}

.cancel-img:hover {
  color: #f91;
}

.view_detail {
  color: #2896eb;
}

.view_detail:hover {
  color: #f91;
}

.a-name {
  color: #282828;
}

.div-all {
  text-align: left;
  width: 1100px;
  margin: auto;
  overflow: hidden;
}

.table-all {
  color: #787878;
  font-size: 14px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 2px #e4e4e4;
  width: 1100px;
}

.th-name {
  width: 200px;
  padding: 12px 20px;
  font-weight: normal;
  height: 87px;
}

.td-name {
  width: 817px;
  padding: 12px 20px;
}

.need-head {
  background: #fff5ea;
  font-size: 16px;
  color: #282828;
  font-weight: normal;
}

.purchase-head {
  font-size: 16px;
  color: #282828;
  font-weight: normal;
}

.td-upstep {
  width: 600px;
  padding: 12px 20px;
}

.img-top {
  width: 10px;
  height: 7px;
}

.img-bottom {
  width: 10px;
  height: 14px;
}

.room-tr {
  background-color: #fafafa;
}

.roomPrice-th {
  color: #282828;
  font-weight: normal;
}

.price-td {
  color: #282828;
}

.budget-price {
  font-weight: normal;
  height: 150px;
}

.repastPrice-th {
  font-weight: normal;
}

.repastPrice-th-price {
  color: #282828;
  font-weight: normal;
}

.img-name {
  width: 62px;
  height: 62px;
}

.th-width {
  width: 200px;
}

.table-head {
  position: absolute;
  top: 0px;
}

.head-div {
  width: 1100px;
  margin: auto;
  overflow: hidden;
}

.head-tr {
  z-index: 99999;
}

.left-div {
  position: absolute;
  width: 242px;
  margin: auto;
  z-index: 2000;
}

.table-left {
  color: #787878;
  font-size: 14px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 2px #e4e4e4;
  text-align: left;
}

.star,
.address,
.contactName,
.contactPhone,
.contactEMail,
.link,
.roomPrice-th,
.repastPrice-img,
.repastPrice-th-price,
.tender-c,
.indate,
.cancel,
.operate {
  height: 20px !important;
}

.need {
  height: 40px;
}

.repastPrice-th {
  height: 250px;
}

.operatePage {
  height: 40px;
}

.table-zindex {
  z-index: 2222;
  position: relative;
  top: 0;
  left: 0;
}

.div-head-ref {
  z-index: 3333;
}

.div-table-left {
  position: fixed;
  top: 0;
  z-index: 4444;
}
.excel {
  float: right;
  font-size: 14px;
  color: #ffffff;
  line-height: 55px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
