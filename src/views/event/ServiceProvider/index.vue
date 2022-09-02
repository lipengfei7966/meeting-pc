<template>
  <div class="hotleIndex">
    <div class="section">
      <div class="path">
        <ul>
          <li style="color: #409EFF;cursor:pointer" @click="$router.go(-1)">
            采购需求
          </li>
          <li style="color: #7c7f82">></li>
          <li style="color: #7c7f82">找服务商</li>
        </ul>
      </div>
      <div class="ProviderSearch">
        <a :class="{ select: !listFormData.isagreement }" href="javascript:void(0)" @click="searchall">所有服务商</a>
        <a :class="{ select: listFormData.isagreement }" href="javascript:void(0)" @click="searchagreement">公司协议服务商</a>
        <div class="R global-search">
          <input class="text br2 new-search-input" placeholder="输入服务商名称或关键词" type="text" name="keyword" v-model="listFormData.keyword" />
          <i class="el-icon-search"></i>
          <input class="btn br4 btn-primary" type="submit" id="top_search" value="搜索" @click="getList" />
        </div>
        <div class="clear"></div>
      </div>
      <div class="typeList">
        <div class="item" v-if="type.city != null">
          <div class="name">选择城市</div>
          <div class="context">
            <div class="item" :class="{
								current: listFormData.city.length == 0
							}" @click="selectedCity()">
              不限
            </div>
            <div class="item" v-for="item in type.city[0].city_list" :key="item.code" :class="{
								current: listFormData.city.findIndex(i => i.code == item.code) != -1
							}" @click="selectedCity(item.code)">
              {{ item.AbbreviationName }}
            </div>
            <template v-for="item in type.city">
              <div class="more" :key="item.Key" v-if="item.Key != '热门' && statusList.cityStatus">
                <div class="moreTitle">{{ item.Key }}</div>
                <div class="moreItems">
                  <div class="item" v-for="item in item.city_list" :class="{
											current: listFormData.city.findIndex(i => i.code == item.code) != -1
										}" :key="item.code" @click="selectedCity(item.code)">
                    {{ item.AbbreviationName }}
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="opt">
            <el-button :type="statusList.cityStatus ? 'warning' : 'success'" size="mini" @click="statusList.cityStatus = !statusList.cityStatus">
              {{ statusList.cityStatus ? '收起' : '展开' }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="botContext">
        <div class="hotelList">
          <div class="number">
            共
            <span>{{ hotel.Counts }}</span>
            家服务商
          </div>
          <div class="list">
            <div class="item" v-for="item in hotel.List" :key="item.id">
              <img :src="item.company_logo" alt />
              <div class="center">
                <div class="name">{{ item.company_name }}</div>
                <div class="address">服务范围: {{ item.cityname }}</div>
                <div class="other">
                  <p>
                    <span><i class="el-icon-user"></i></span>
                    {{ item.customer_service_name }}
                  </p>
                  <p>
                    <span><i class="el-icon-phone-outline"></i></span>
                    {{ item.customer_service_telephone_numbers }}
                  </p>
                  <p>
                    <span><i class="el-icon-upload2"></i></span>
                    {{ item.company_email }}
                  </p>
                </div>
                <div class="profile">{{ item.company_profile }}</div>
              </div>
              <div class="right">
                <div class="top" v-if="1 === 2">
                  <el-button type="text">添加评论</el-button>
                  <el-button type="text">收藏</el-button>
                </div>
                <div class="bottom" v-if="routeType">
                  <el-button type="warning" v-if="HotelSelectedList.findIndex(i => i.id == item.id) == -1" @click="selected(item)">邀请询价</el-button>
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
            <div class="title">已选择目标服务商</div>
            <div class="context">
              <div class="tips" v-if="HotelSelectedList.length == 0">暂未选择目标服务商</div>
              <div class="item" v-for="item in HotelSelectedList" :key="`${item.id}`">
                <div class="company_name">{{ item.company_name }}</div>
                <i class="el-icon-delete-solid" @click="cancel(item)"></i>
              </div>
            </div>
            <div class="buttons">
              <el-button type="warning" style="width: 100%;" @click="Inquiry">一键询价</el-button>
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
import qualificationAdded from '@/components/event/qualification-added.vue';
export default {
	name: 'Qualification',
	components: { qualificationAdded },
	data() {
		return {
			// type
			routeType: null,
			// 已选择询价服务商列表
			HotelSelectedList: [],
			// 筛选类型
			type: {
				city: null,
				sitetype: null,
				brand: null,
				venuearea: null,
				venuepeoplenumber: null,
				roomprice: null
			},
			// 状态
			statusList: {
				cityStatus: false, //选择城市是否展开,
				brandStatus: false //酒店品牌是否展开,
			},
			// 列表参数筛选
			listFormData: {
				city: [],
				// sitetype: [],
				// brand: [],
				// venue_min_area: null,
				// venue_max_area: null,
				// venue_min_people_number: null,
				// venue_max_people_number: null,
				// room_min_avg_price: null,
				// room_max_avg_price: null,
				keyword: '',
				isagreement: false,
				Page: 1,
				Rows: 10
			},
			// 列表
			hotel: {
				Counts: 0,
				CurrentPage: 0,
				List: [],
				PageCount: 0
			},
			test: 100
		};
	},
	computed: {},
	methods: {
		Inquiry() {
			if (this.HotelSelectedList.length === 0) {
				this.$message({ message: '至少选择一家服务商', type: 'warning' });
				return;
			}
      this.requestApi({
        url: '/procurementprocess/selectserviceprovider',
        method: 'POST',
        data: { iserviceprovider: this.HotelSelectedList }
      }).then(res => {
        this.$router.push({ name: 'ServiceProviderProcurement', params: { id: this.$route.params.id, type: this.$route.params.type } });
      });
		},
		cancel(item) {
			let index = this.HotelSelectedList.findIndex(i => i.id == item.id);
			if (index > -1) {
				this.HotelSelectedList.splice(index, 1);
			}
		},
		selected(item) {
			let index = this.HotelSelectedList.findIndex(i => i.id == item.id);
			if (index == -1) {
				this.HotelSelectedList.push({
					id: item.id,
					company_name: item.company_name,
					company_email: item.company_email
				});
			} else {
				this.HotelSelectedList.splice(index, 1);
			}
		},
		jumpInfo(id) {
			// this.$router.push({ name: "hotelInfo", params: { id } })
		},
		getList() {
      this.requestApi({
        url: '/serviceprovider/serviceproviderlist',
        method: 'POST',
        data: this.listFormData
      }).then(res => {
				this.hotel = res;
			});
		},
		sizeChange(value) {
			this.listFormData.Page = value;
			this.getList();
		},
		selectedCity(code) {
			//this.listFormData.city = [{ code }];
			if (code) {
				if (this.listFormData.city.findIndex(item => item.code === code) == -1) this.listFormData.city.push({ code });
				else this.listFormData.city = this.listFormData.city.filter(item => item.code != code);
			} else this.listFormData.city = [];
			this.listFormData.Page = 1;
			this.getList();
		},
		searchall() {
			this.listFormData.Page = 1;
			this.listFormData.isagreement = false;
			this.getList();
		},
		searchagreement() {
			this.listFormData.Page = 1;
			this.listFormData.isagreement = true;
			this.getList();
		}
	},
	mounted() {
		this.routeCity = this.$route.params.city;
		if (this.routeCity) this.selectedCity(this.routeCity);

		this.routeType = this.$route.params.type;
		if (this.routeType) {
      this.requestApi({
        url: '/procurementprocess/getselectserviceprovider',
        method: 'POST',
        data: {}
      }).then(res => {
				if (res.length > 0) this.HotelSelectedList = res;
				else this.HotelSelectedList = [];
			});
		}
		this.getList();
    this.requestApi({
      url: '/serviceprovider/city',
      method: 'POST',
      data: {}
    }).then(res => {
      this.type.city = res.city;
		});
	}
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
  .ProviderSearch {
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
            .address {
              color: #ffa611;
              margin-top: 10px;
              /* flex: 1; */
              /* display: flex;*/
            }
            .other {
              display: flex;
              margin-top: 10px;
              font-size: 12px;
              color: #666666;
              p {
                flex: 1;
                span {
                  color: #999999;
                }
              }
            }
            .profile {
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              white-space: normal;
              margin-top: 10px;
              font-size: 12px;
              line-height: 18px;
              color: #999;
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
      .company_name {
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
    }
    i {
      float: right;
      line-height: 40px;
    }
  }
  .buttons {
    margin-top: 20px;
  }
}

.path {
  // width: 1100px;
  height: 55px;
  // background: red;
  margin: auto;
  margin-top: 15px;
}

.path ul {
  display: flex;
  line-height: 55px;
}

.path ul li {
  padding-left: 10px;
}
@media only screen and (max-width: 1400px) {
  .section {
    width: 100% !important;
  }
}
</style>
