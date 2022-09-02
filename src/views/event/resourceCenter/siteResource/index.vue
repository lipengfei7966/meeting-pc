<template>
  <div class="hotleIndex">
    <div class="section">
      <div class="hotelSearch">
        <a :class="{  select: !listFormData.isagreement && !listFormData.iscollection }" href="javascript:void(0)" @click="searchall">所有酒店</a>
        <a :class="{  select: listFormData.isagreement }" href="javascript:void(0)" @click="searchagreement">公司协议酒店</a>
        <a :class="{  select: listFormData.iscollection }" href="javascript:void(0)" @click="searchcollection">我收藏的酒店</a>
        <div class="R global-search">
          <input class="text br2 new-search-input" placeholder="输入酒店名称或关键词" type="text" name="keyword" v-model="listFormData.keyword">
          <i class="el-icon-search"></i>
          <input class="btn br4 btn-primary" type="submit" id="top_search" value="搜索" @click="getList">
        </div>
        <div class="clear"></div>
      </div>
      <div class="typeList">
        <div class="item" v-if="type.city != null">
          <div class="name">选择城市</div>
          <div class="context">
            <div class="item" :class="{ 
                current: listFormData.city.length == 0 }" @click="selectedCity()">
              不限
            </div>
            <div class="item" v-for="item in type.city[0].city_list" :key="item.code" :class="{
                current:
                  listFormData.city.findIndex((i) => i.code == item.code) != -1,
              }" @click="selectedCity(item.code)">
              {{ item.AbbreviationName }}
            </div>
            <template v-for="item in type.city">
              <div class="more" :key="item.Key" v-if="item.Key != '热门' && statusList.cityStatus">
                <div class="moreTitle">{{ item.Key }}</div>
                <div class="moreItems">
                  <div class="item" v-for="item in item.city_list" :class="{
                      current:
                        listFormData.city.findIndex((i) => i.code == item.code) !=
                        -1,
                    }" :key="item.code" @click="selectedCity(item.code)">
                    {{ item.AbbreviationName }}
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="opt">
            <el-button :type="statusList.cityStatus ? 'warning' : 'success'" size="mini" @click="statusList.cityStatus = !statusList.cityStatus">{{ statusList.cityStatus ? "收起" : "展开" }}</el-button>
          </div>
        </div>
        <div class="item" v-if="type.sitetype">
          <div class="name">场地类型</div>
          <div class="context">
            <div class="item" :class="{ 
                current: listFormData.sitetype.length == 0 }" @click="selectedsitetype()">
              不限
            </div>
            <div class="item" v-for="item in type.sitetype" :key="item.code" :class="{
                current:
                  listFormData.sitetype.findIndex((i) => i.code == item.code) != -1,
              }" @click="selectedsitetype(item.code)">
              {{ item.name }}
            </div>
          </div>
          <div class="opt"></div>
        </div>
        <div class="item" v-if="type.brand && 1==2">
          <div class="name">酒店品牌</div>
          <div class="context">
            <div class="item" :class="{ 
                current: listFormData.brand.length == 0 }" @click="selectedbrand()">
              不限
            </div>
            <template v-for="(item, key) in type.brand">
              <div class="item" :key="item.id" v-if="key < 10" :class="{
                  current:
                    listFormData.brand.findIndex((i) => i.id == item.id) != -1,
                }" @click="selectedbrand(item.id)">
                {{ item.joinname }}
              </div>
            </template>
            <template v-for="item in letterBrand">
              <div class="more" :key="item.key" v-if="statusList.brandStatus">
                <div class="moreTitle">{{ item.key }}</div>
                <div class="moreItems">
                  <div class="item" v-for="item in item.list" :key="item.id" :class="{
                      current:
                        listFormData.brand.findIndex((i) => i.id == item.id) !=
                        -1,
                    }" @click="selectedbrand(item.id)">
                    {{ item.joinname }}
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="opt">
            <el-button :type="statusList.brandStatus ? 'warning' : 'success'" size="mini" @click="statusList.brandStatus = !statusList.brandStatus">{{ statusList.brandStatus ? "收起" : "展开" }}</el-button>
          </div>
        </div>
        <div class="item" v-if="type.venuearea">
          <div class="name">会场面积</div>
          <div class="context">
            <div class="item" :class="{
                current:
                  listFormData.venue_min_area == null &&
                  listFormData.venue_max_area == null,
              }" @click="selectedarea(null, null)">
              不限
            </div>
            <div class="item" v-for="item in type.venuearea" :key="item.id" :class="{
                current:
                  listFormData.venue_min_area == item.minvalue &&
                  listFormData.venue_max_area == item.maxvalue,
              }" @click="selectedarea(item.minvalue, item.maxvalue)">
              {{ item.name }}
            </div>
          </div>
          <div class="opt"></div>
        </div>
        <div class="item" v-if="type.venuepeoplenumber">
          <div class="name">会场人数</div>
          <div class="context">
            <div class="item" :class="{
                current:
                  listFormData.venue_min_people_number == null &&
                  listFormData.venue_max_people_number == null,
              }" @click="selectedvenue(null, null)">
              不限
            </div>
            <div class="item" v-for="item in type.venuepeoplenumber" :key="item.id" :class="{
                current:
                  listFormData.venue_min_people_number == item.minvalue &&
                  listFormData.venue_max_people_number == item.maxvalue,
              }" @click="selectedvenue(item.minvalue, item.maxvalue)">
              {{ item.name }}
            </div>
          </div>
          <div class="opt"></div>
        </div>
        <div class="item" v-if="type.roomprice">
          <div class="name">团房均价</div>
          <div class="context">
            <div class="item" :class="{
                current:
                  listFormData.room_min_avg_price == null &&
                  listFormData.room_max_avg_price == null,
              }" @click="selectedroom(null, null)">
              不限
            </div>
            <div class="item" v-for="item in type.roomprice" :key="item.id" :class="{
                current:
                  listFormData.room_min_avg_price == item.minvalue &&
                  listFormData.room_max_avg_price == item.maxvalue,
              }" @click="selectedroom(item.minvalue, item.maxvalue)">
              {{ item.name }}
            </div>
          </div>
          <div class="opt"></div>
        </div>
      </div>
      <div class="botContext">
        <div class="hotelList">
          <div class="number">
            共
            <span>{{ hotel.Counts }}</span> 家酒店
          </div>
          <div class="list">
            <div class="item" v-for="item in hotel.List" :key="item.id">
              <img :src="item.coverpicture" alt />
              <div class="center">
                <div class="name" @click="jumpInfo(item.id)">
                  <i v-if="item.iscollection == 1" class="collection"></i>
                  <i v-else class="notcollection"></i>
                  {{ item.name }}
                </div>
                <div class="address">地址:{{ item.address }}</div>
                <div class="other">
                  <p>
                    <span>场地类型:</span>
                    {{item.sitetype_name}}
                  </p>
                  <p>
                    <span>客房数量：</span>
                    {{ item.room_number }} 间
                  </p>
                  <p>
                    <span>双床房数量：</span>
                    {{ item.double_bed_room_number }} 间
                  </p>
                </div>
                <div class="other">
                  <p>
                    <span>会议厅数量：</span>
                    {{ item.venue_number }} 间
                  </p>
                  <p>
                    <span>会议厅面积：</span>
                    {{ item.venue_min_area }} ~ {{ item.venue_max_area }}㎡
                  </p>
                  <p>
                    <span>会议厅容量：</span>
                    {{ item.venue_min_people_number }} ~
                    {{ item.venue_max_people_number }} 人
                  </p>

                  <!-- <p><span>累计成交：</span>0次</p> -->
                </div>
              </div>
              <div class="right">
                <div class="top">
                  <!-- <el-button type="text">添加评论</el-button> -->
                  <el-button type="text" v-if="item.iscollection == 0" @click="collection(item)">收藏</el-button>
                  <el-button type="text" v-else @click="cancelcollection(item)">已收藏</el-button>
                </div>
                <div class="bottom" v-if="routeType">
                  <el-button type="warning" v-if="HotelSelectedList.findIndex((i) => i.hotelid == item.id) == -1" @click="selected(item)">邀请询价</el-button>
                  <el-button type="info" v-else @click="selected(item)">取消邀请</el-button>
                </div>
              </div>
            </div>
          </div>
          <el-pagination class="pagination" background layout="prev, pager, next" :total="hotel.Counts" @current-change="sizeChange"></el-pagination>
        </div>
        <div class="right" v-if="routeType">
          <!-- <el-button type="warning">
            创见会议询价
            <br />Create RFP
          </el-button>-->
          <div class="selectedHotel">
            <div class="title">已选择目标酒店</div>
            <div class="context">
              <div class="tips" v-if="HotelSelectedList.length == 0">
                暂未选择目标酒店
              </div>
              <div class="item" v-for="item in HotelSelectedList" :key="`s${item.id}`">

                <div class="hotelname">
                  <i class="badge"></i>
                  {{ item.hotelname }}
                </div>
                <i class="remove el-icon-delete-solid" @click="cancel(item)"></i>
              </div>
            </div>
            <div class="buttons">
              <el-button type="warning" style="width: 100%" @click="Inquiry">一键询价</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @page 酒店列表
 */
import qualificationAdded from "@/components/event/qualification-added.vue";
export default {
  name: "Qualification",
  components: { qualificationAdded },
  data() {
    return {
      // type
      routeType: null,
      //city
      routeCity:null,
      // 已选择询价酒店列表
      HotelSelectedList: [],
      // 筛选类型
      type: {
        city: null,
        sitetype: null,
        brand: null,
        venuearea: null,
        venuepeoplenumber: null,
        roomprice: null,
      },
      // 状态
      statusList: {
        cityStatus: false, //选择城市是否展开,
        brandStatus: false, //酒店品牌是否展开,
      },
      // 列表参数筛选
      listFormData: {
        city: [],
        sitetype: [],
        brand: [],
        venue_min_area: null,
        venue_max_area: null,
        venue_min_people_number: null,
        venue_max_people_number: null,
        room_min_avg_price: null,
        room_max_avg_price: null,
        keyword: "",
        isagreement: false,
        iscollection:false,
        Page: 1,
        Rows: 10,
      },
      // 酒店列表
      hotel: {
        Counts: 0,
        CurrentPage: 0,
        List: [],
        PageCount: 0,
      },
    };
  },
  computed: {
    // 字母分类酒店品牌
    letterBrand() {
      let data = [];
      let filtersName = [
        "A,B,C",
        "D,E,F",
        "G,H,I",
        "G,K,L",
        "M,N,O",
        "P,Q,X",
        "Y,Z",
      ];
      filtersName.forEach((item) => {
        let key = item.replace(",/g", "");
        data.push({
          key,
          list: this.type.brand.filter(
            (i) => item.split(",").indexOf(i.pinyin_initials) != -1
          ),
        });
      });
      return data;
    },
  },
  methods: {
    Inquiry() {
      var type=0;
      if(this.$route.params.type == "addintentionhotel"){
        type=2;
        this.requestApi({
					url: '/procurementprocess/Selectintentionhotel',
					method: 'POST',
					data: { hotel: this.HotelSelectedList },
				}).then((res) => {
          // this.$router.push({
          //   name: "ServiceProviderProcurement",
          //   params: { id: this.$route.params.id },
          // });
        });
      }else{
        type=1;
        if(this.HotelSelectedList.length === 0){
          this.$message({ message: "至少选择一家酒店",   type: "warning", });  
          return;
        }
        this.requestApi({
					url: '/procurementprocess/selecthotel',
					method: 'POST',
					data: { hotel: this.HotelSelectedList },
				}).then((res) => {
          // this.$router.push({
          //   name: "HotelProcurement",
          //   params: { id: this.$route.params.id },
          // });
        });
      }
      this.$router.push({
        name: "HotelProcurement",
        params: { id: this.$route.params.id,type },
      });
    },
    cancel(item){
      let index = this.HotelSelectedList.findIndex((i) => i.hotelid == item.hotelid);
      if (index > -1) {
         this.HotelSelectedList.splice(index, 1);
      }
    },
    selected(item) {
      console.log(item)
      let index = this.HotelSelectedList.findIndex((i) => i.hotelid == item.id);
      if (index == -1) {
        this.HotelSelectedList.push({
          hotelid: item.id,
          hotelname: item.name,
          hotelemail:item.email,
          hotelecontacts:item.contacts,
          hoteletelephone:item.telephone,
          sendemail:true,
          receptionist:{
            id: item.receptionist_id,
            contacts:item.receptionist_contacts,
            telephone:item.receptionist_telephone,
            email:item.receptionist_email
          }
        });
      } else {
        this.HotelSelectedList.splice(index, 1);
      }
    },
    jumpInfo(id) {
      this.$router.push({ name: "hotelInfo", params: { id } });
      // let routeData = this.$router.resolve({ name: "hotelInfo", params: { id } });
      // window.open(routeData.href, "_blank");//跳转新页面
    },
    getList() {
      this.requestApi({
        url: '/hotel/list',
        method: 'POST',
        data: this.listFormData,
      }).then((res) => {
        this.hotel = res || this.hotel;
      });
    },
    sizeChange(value) {
      this.listFormData.Page = value;
      this.getList();
    },
    selectedCity(code) {
      if(code){
        if(this.listFormData.city.findIndex(item => item.code === code) == -1)
          this.listFormData.city.push({code});
        else
          this.listFormData.city =  this.listFormData.city.filter(item => item.code != code) 
      }
      else
        this.listFormData.city =[];
      this.listFormData.Page =1;
      this.getList();
    },
    selectedsitetype(code) {
      //this.listFormData.sitetype = [{ code }];
      if(code)
      {
        if(this.listFormData.sitetype.findIndex(item => item.code === code) == -1)
          this.listFormData.sitetype.push({code});
        else
          this.listFormData.sitetype = this.listFormData.sitetype.filter(item => item.code != code) 
      }
      else
        this.listFormData.sitetype =[];
      this.listFormData.Page =1;
      this.getList();
    },
    selectedbrand(id) {
      //this.listFormData.brand = [{ id }];
      if(id){
        if(this.listFormData.brand.findIndex(item => item.id === id) == -1)
          this.listFormData.brand.push({id});
        else
          this.listFormData.brand = this.listFormData.brand.filter(item => item.id != id) 
      }
      else
        this.listFormData.brand=[];
      this.listFormData.Page =1;
      this.getList();
    },
    selectedarea(min, max) {
      this.listFormData.venue_min_area = min;
      this.listFormData.venue_max_area = max;
      this.listFormData.Page =1;
      this.getList();
    },
    selectedvenue(min, max) {
      this.listFormData.venue_min_people_number = min;
      this.listFormData.venue_max_people_number = max;
      this.listFormData.Page =1;
      this.getList();
    },
    selectedroom(min, max) {
      this.listFormData.room_min_avg_price = min;
      this.listFormData.room_max_avg_price = max;
      this.listFormData.Page =1;
      this.getList();
    },
    searchall(){
      this.listFormData.isagreement=false;
      this.listFormData.iscollection=false;
      this.listFormData.Page =1;
      this.getList() 
    },
    searchagreement(){
      this.listFormData.isagreement=true;
      this.listFormData.iscollection=false;
      this.listFormData.Page =1;
      this.getList() 
    },
    searchcollection(){
      this.listFormData.isagreement=false;
      this.listFormData.iscollection=true;
      this.listFormData.Page =1;
      this.getList() 
    },
    collection(item){
      this.requestApi({
        url: '/hotel/Collection',
        method: 'POST',
        data: { id: item.id },
      }).then((res) => {
        item.iscollection =1;
        if(this.listFormData.iscollection){
          this.listFormData.Page =1;
          this.getList();
        }
      });
    },
    cancelcollection(item){
      this.requestApi({
        url: '/hotel/CancelCollection',
        method: 'POST',
        data: { id: item.id },
      }).then((res) => {
        item.iscollection =0;
         if(this.listFormData.iscollection){
           this.listFormData.Page =1;
            this.getList();
         }
      });
    },
  },
  mounted() {
    //addhotel 酒店采购
    //addintentionhotel 服务商包含酒店采购 意向采购
    this.routeCity =this.$route.params.city;
    if(this.routeCity)
      this.selectedCity(this.routeCity)
    
    this.routeType = this.$route.params.type;
    if (this.routeType =="addhotel") {
      this.requestApi({
        url: '/procurementprocess/getselecthotel',
        method: 'POST',
        data: { },
      }).then((res) => {
        if(res.length>0)
          this.HotelSelectedList = res;
        else
          this.HotelSelectedList =[];
      });
    }else{
      this.requestApi({
        url: '/procurementprocess/getselectintentionhotel',
        method: 'POST',
        data: { },
      }).then((res) => {
        if(res.length>0)
          this.HotelSelectedList = res;
        else
          this.HotelSelectedList =[];
      });
    }

    this.getList();
    this.requestApi({
      url: '/serviceprovider/city',
      method: 'POST',
      data: { },
    }).then((res) => {
      this.type.city = res.city;
      return this.requestApi({
          url: '/hotel/sitetype',
          method: 'POST',
          data: { },
        })

    }).then((res) => {
        this.type.sitetype = res;
        return this.requestApi({
          url: '/hotel/brand',
          method: 'POST',
          data: { },
        })
      })
      .then((res) => {
        this.type.brand = res;
        return this.requestApi({
          url: '/hotel/venuearea',
          method: 'POST',
          data: { },
        })
      })
      .then((res) => {
        this.type.venuearea = res;
        
        return this.requestApi({
          url: '/hotel/venuepeoplenumber',
          method: 'POST',
          data: { },
        })
      })
      .then((res) => {
        this.type.venuepeoplenumber = res;
        return this.requestApi({
          url: '/hotel/roomprice',
          method: 'POST',
          data: { },
        })
      })
      .then((res) => {
        this.type.roomprice = res;
      });
  },
};
</script>

<style lang="scss" scoped>
.hotleIndex {
  .section {
    width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .hotelSearch {
    height: 35px;
    position: relative;
    z-index: 1;
    margin-top: 15px;
    > a {
      margin: 0 0 0 10px;
      background: #eaeaea;
      border-radius: 3px 3px 0 0;
      color: #777;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      display: inline-block;
      padding: 0 20px;
      font-weight: normal;
      border: 0;
    }
    a:first-child {
      margin: 0;
    }
    a.select {
      background: #1d89cf;
      color: #fff;
      box-shadow: none;
      border-bottom: 0;
    }

    .global-search {
      width: 442px;
      width: auto;
      float: right;
      position: relative;
      .el-icon-search {
        position: absolute;
        left: 10px;
        top: 17px;
        color: rgba(29, 137, 207, 1);
        font-size: 14px;
        margin: -8px 0 0 0;
        z-index: 4;
        width: 16px;
        height: 18px;
        background: transparent;
      }
      .new-search-input {
        /*width:235px !important;*/
        height: 28px !important;
        border-radius: 2px !important;
        border: 1px solid rgba(29, 137, 207, 1) !important;
        background-color: #fff !important;
        padding-left: 30px;
      }

      input.btn {
        vertical-align: top;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        color: #fff;
        border-radius: 3px;
        margin: 0 0 0 5px;
        border: 0;
        font-size: 12px;
        font-weight: normal;
        box-shadow: none;
      }
      #top_search {
        background: #1d89cf;
      }
      #top_search:hover {
        background: #30a2ec;
        transition: all 0.5s ease 0s;
      }
    }
  }
  .typeList {
    border: 1px solid #eaecf3;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    > .item {
      border-bottom: 1px solid #ccc;
      display: flex;
      line-height: 32px;
      font-size: 12px;
      padding: 10px 0;
      box-sizing: border-box;
      &:last-child {
        border: 0;
        padding-bottom: 0;
      }
      &:first-child {
        padding-top: 0;
      }
      .name {
        color: #999999;
      }
      .context {
        flex: 1;
        margin: 0 10px;
        overflow: hidden;
        color: #666666;
        width: 0;
        > .item {
          cursor: pointer;
          float: left;
          margin-right: 5px;
          padding: 0 10px;
          box-sizing: border-box;
          border-radius: 3px;
          &.current {
            background-color: #f4ad49;
            color: #fff;
          }
        }
        .more {
          clear: both;
          display: flex;
          margin-left: 20px;
          .moreTitle {
            font-weight: bold;
            margin-right: 20px;
          }
          .moreItems {
            flex: 1;
            overflow: hidden;
            > .item {
              cursor: pointer;
              float: left;
              margin-right: 5px;
              padding: 0 10px;
              box-sizing: border-box;
              border-radius: 3px;
              &.current {
                background-color: #f4ad49;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .botContext {
    display: flex;
    margin-top: 15px;
    .hotelList {
      flex: 1;
      margin-right: 15px;
      border: 1px solid #eaecf3;
      box-sizing: border-box;
      .number {
        line-height: 40px;
        padding: 0 15px;
        box-sizing: border-box;
        background-color: #f7f7f7;
        span {
          color: #ff9900;
        }
      }
      .list {
        padding: 0 15px;
        box-sizing: border-box;
        margin-top: 15px;
        .item {
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid #eaecf3;
          &:last-child {
            border: 0;
          }
          &:first-child {
            padding-top: 0;
          }
          img {
            width: 130px;
            height: 130px;
            border-radius: 5px;
            object-fit: cover;
          }
          .center {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 15px;
            .name {
              font-weight: bold;
              font-size: 16px;
              transition: 0.3s;
              cursor: pointer;
              &:hover {
                color: #ffa611;
              }
            }
            .collection {
              background: url(require('@/assets/images/badge.png'));
              width: 20px;
              height: 20px;
              display: inline-block;
              vertical-align: top;
              background-size: cover;
            }
            .notcollection {
              background: url(require('@/assets/images/notbadge.png'));
              width: 20px;
              height: 20px;
              display: inline-block;
              vertical-align: top;
              background-size: cover;
            }
            .address {
              color: #999999;
              margin-top: 10px;
              flex: 1;
            }
            .other {
              display: flex;
              flex: 1;
              p {
                flex: 1;
                span {
                  color: #999999;
                }
              }
            }
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          .top {
            flex: 1;
          }
        }
      }
      .pagination {
        margin-bottom: 15px;
      }
    }
  }
}

.selectedHotel {
  width: 240px;
  border: 1px solid #eaecf3;
  box-sizing: border-box;
  .title {
    background-color: #1d89cf;
    padding: 15px;
    box-sizing: border-box;
    font-weight: bold;
    color: #fff;
  }
  .context {
    padding: 0 15px;
    .tips {
      text-align: center;
      line-height: 80px;
    }
    .item {
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid #eaecf3;
      .hotelname {
        font-size: 12px;
        color: #666;
        float: left;
        max-width: 90%;
        height: 26px;
        line-height: 26px;
        padding: 7px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .badge {
        background: url(/img/badge.df551e01.png);
        width: 13px;
        height: 13px;
        display: inline-block;
        vertical-align: middle;
        background-size: cover;
      }
      .remove {
        float: right;
        line-height: 40px;
      }
    }
  }

  .buttons {
    margin-top: 20px;
  }
}
</style>