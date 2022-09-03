<template>
  <div class="hotleInfo" v-if="info != null">
    <div class="section">
      <div class="header" :style="this.pictureAll.length > 0 ? 'display:flex;' : 'display:block'">
        <div class="right picture_img" v-if="this.pictureAll.length > 0">
          <!-- v-if="this.pictureAll.length==0" -->
          <div>
            <el-carousel ref="carousel" @change="carouselItemChange" indicator-position="none" arrow="always" :autoplay="true">
              <el-carousel-item v-for="(item, index) in this.pictureAll" :key="'carousel'+index">
                <img :src="item.pic" alt />
              </el-carousel-item>
            </el-carousel>
            <!-- info.coverpicture -->
            <div class="genre">
              <span :class="is_span == 0 ? 'sp_color' : ''" style="cursor: pointer" @click="pictureLook(0)">会场</span>
              <span :class="is_span == 1 ? 'sp_color' : ''" style="cursor: pointer; margin: 0 150px" @click="pictureLook(1)">客房</span>
              <!-- <span
                :class="is_span == 2 ? 'sp_color' : ''"
                style="cursor: pointer"
                @click="pictureLook(2)"
                >大厅</span
              > -->
              <span :class="is_span == 3 ? 'sp_color' : ''" style="cursor: pointer" @click="pictureLook(3)">餐厅</span>
              <!-- <span
                :class="is_span == 4 ? 'sp_color' : ''"
                style="cursor: pointer"
                @click="pictureLook(4)"
                >其他</span
              > -->
              <div class="normal" ref="normal"></div>
            </div>
            <!-- <div class="thumbnail flex_row justify_between">
            <span class="arrow el-icon-arrow-left" @click="removeLeft"></span>
            <p ref="thumbnailList" class="flex_row">
              <img
                v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="index"
                src="https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg"
                alt
                @click="checkImg(index)"
                :class="{ 'is-active': carouselItemIndex == index }"
              />
            </p>
            <span class="arrow el-icon-arrow-right" @click="removeRight"></span>
          </div> -->
            <div class="thumbnail flex_row justify_between">
              <span class="arrow el-icon-arrow-left" @click="removeLeft"></span>
              <div>
                <p ref="thumbnailList" class="flex_row">
                  <img v-for="(item, index) in this.pictureAll" :key="index" :src="item.pic" alt @click="checkImg(index)" :class="{ 'is-active': carouselItemIndex == index }" />
                </p>
              </div>
              <span class="arrow el-icon-arrow-right" @click="removeRight"></span>
            </div>
            <!-- <img :src="info.coverpicture" alt /> -->
            <!-- hkz -->

            <!-- hkz---end -->
          </div>
          <!-- <div v-else>
            <img src="@/assets/images/meeting.jpg" alt />
          </div> -->
        </div>
        <div class="left">
          <div class="name">
            {{ info.name }}
            <!-- <i
              class="el-icon-medal number-one"
              v-if="info.sitetype_name == '五星级酒店'"
            ></i> -->
            <span style="color: #ff9429">{{ info.sitetype_name }}</span>
            <span style="
                cursor: pointer;
                font-size: 15px;
                color: rgb(255, 148, 41);
                float: right;
                margin-top: 15px;
              " @click="onCollection">
              <i v-if="info.iscollection == 0" class="el-icon-star-off" :key="0"></i>
              <i v-else class="el-icon-star-on" :key="1"></i>
              {{ info.iscollection == 1 ? "已收藏" : "未收藏" }}
            </span>
            <!--  -->
            <div class="title-sp">
              <span style="margin-left: 5px">{{
                info.address ? info.address : "暂无地址信息"
              }}</span>
              <!-- hotel_label -->
              <span>{{ info.hotel_label ? info.hotel_label : "-" }}</span>
              <!-- <span>默沙东/会议优选</span> -->
            </div>
          </div>
          <!-- <div class="number">({{ info.number }})</div> -->
          <!-- <div class="address">{{ info.address }}</div> -->
          <!-- <el-descriptions title="" :column="3">
            <el-descriptions-item label="场地类型">{{
              info.sitetype_name
            }}</el-descriptions-item>
            <el-descriptions-item label="客房数量"
              >{{ info.room_number }}间</el-descriptions-item
            >
            <el-descriptions-item label="双床房数量"
              >{{ info.double_bed_room_number }}间</el-descriptions-item
            >
            <el-descriptions-item label="会议厅数量"
              >{{ info.venue_number }}个</el-descriptions-item
            >
            <el-descriptions-item label="最大厅面积"
              >{{ info.venue_max_area }}平方米</el-descriptions-item
            >
            <el-descriptions-item label="最大厅容纳"
              >{{ info.venue_max_people_number }}人</el-descriptions-item
            >
            <el-descriptions-item label="开业时间">{{
              info.opening_time
            }}</el-descriptions-item>
            <el-descriptions-item label="最近装修">{{
              info.recent_decoration
            }}</el-descriptions-item>
            <el-descriptions-item label="最低餐标">{{
              info.minimum_meal_standard
            }}</el-descriptions-item>
          </el-descriptions> -->
          <!-- 111 -->
          <div class="icon_hotel">
            <div>
              <img src="@/assets/images/hotel_1.png" alt />
              <p>
                {{
                  info.formHallArea
                    ? info.formHallArea + "-" + info.toHallArea
                    : "-"
                }}㎡
              </p>
              <p>会议厅面积</p>
            </div>
            <div>
              <img src="@/assets/images/hotel_2.png" alt />
              <p>
                {{
                  info.formCapacity
                    ? info.formCapacity + "-" + info.toCapacity
                    : "-"
                }}人
              </p>
              <p>会议厅容量</p>
            </div>
            <div>
              <img src="@/assets/images/hotel_3.png" alt />
              <p>{{ info.venue_number ? info.venue_number : "-" }}间</p>
              <p>会议厅数量</p>
            </div>
            <div>
              <img src="@/assets/images/hotel_4.png" alt />
              <p>{{ info.room_number ? info.room_number : "-" }}间</p>
              <p>客房数量</p>
            </div>
            <div>
              <img src="@/assets/images/hotel_5.png" alt />
              <p>
                {{
                  info.double_bed_room_number
                    ? info.double_bed_room_number
                    : "-"
                }}间
              </p>
              <p>双床房</p>
            </div>
          </div>
          <!-- 111 -->
          <!-- hkz -->
          <!-- <el-descriptions title="" :column="3">
            <el-descriptions-item label="会议厅面积">{{
              info.venue_min_area
            }}</el-descriptions-item>
            <el-descriptions-item label="会议厅容量">{{
              info.venue_min_people_number
            }}</el-descriptions-item>
            <el-descriptions-item label="会议厅数量">{{
              info.venue_number
            }}</el-descriptions-item>
            <el-descriptions-item label="客房数量">{{
              info.room_number
            }}</el-descriptions-item>
            <el-descriptions-item label="双床房"></el-descriptions-item>
          </el-descriptions> -->
          <div style="margin-left: 25px">
            <el-descriptions title="" :column="2">
              <el-descriptions-item label="最近装修">{{
                info.recent_decoration ? info.recent_decoration : "-"
              }}</el-descriptions-item>
              <el-descriptions-item label="开业时间">{{
                info.opening_time ? info.opening_time : "-"
              }}</el-descriptions-item>
            </el-descriptions>
            <!-- 营业执照名称 -->
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="营业执照名称">{{
                info.businessLicenseNo ? info.businessLicenseNo : "-"
              }}</el-descriptions-item>
              <el-descriptions-item label=" 供应商ID">{{
                info.masterData ? info.masterData : "-"
              }}</el-descriptions-item>
            </el-descriptions>
            <!-- <div>
              <span
                >营业执照名称：{{
                  info.businessLicenseNo ? info.businessLicenseNo : "-"
                }}</span
              ><span>供应商ID：未提供字段</span>
            </div> -->
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="统一社会信用代码">{{
                info.socialCreditNo ? info.socialCreditNo : "-"
              }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="" :column="2">
              <el-descriptions-item label="供应商状态">{{
                info.hotelstate ? info.hotelstate : "-"
              }}</el-descriptions-item>
              <el-descriptions-item label="B2B审核状态">
                <span v-if="info.b2bstate == '1'">可用</span>
                <span v-else-if="info.b2bstate == '2'">不可用</span>
                <span v-else-if="info.b2bstate == '3'">缺少工商信息</span>
                <span v-else-if="info.b2bstate == '4'">未找到</span>
                <span v-else>-</span>
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="资源平台信息">
                <el-tag size="mini" style="margin-right: 10px" v-for="(item,index) in resourcePlatform" :key="index">{{ item }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <!-- hkz---end -->
          <!-- <el-descriptions title="" :column='1'>
						<el-descriptions-item label="营业执照名称">{{info.sitetype_name}}</el-descriptions-item>
						<el-descriptions-item label="统一社会信用代码">{{ info.room_number }}间</el-descriptions-item>
						<el-descriptions-item label="供应商ID">{{ info.double_bed_room_number }}间</el-descriptions-item>
						<el-descriptions-item label="供应商状态">{{ info.venue_number }}个</el-descriptions-item>
						<el-descriptions-item label="B2B审核状态">{{ info.venue_max_area }}平方米</el-descriptions-item>
						<el-descriptions-item label="资源平台信息">
							<el-tag class="ziyuanInfo" type="warning" effect="dark" size="small">草稿箱</el-tag>
							<el-tag class="ziyuanInfo" type="warning" effect="dark" size="small">中旅会展协议</el-tag>
							<el-tag class="ziyuanInfo" type="warning" effect="dark" size="small">会议优选</el-tag>
							<el-tag class="ziyuanInfo" type="warning" effect="dark" size="small">商旅优选</el-tag>
						</el-descriptions-item>
					</el-descriptions> -->

          <!-- <div class="line">
						<p>
							<span>场地类型:</span> {{info.sitetype_name}}
						</p>
						<p>
							<span>客房数量：</span>
							{{ info.room_number }}间
						</p>
						<p>
							<span>双床房数量：</span>
							{{ info.double_bed_room_number }}间
						</p>
					</div>
					<div class="line">
						<p>
							<span>会议厅数量：</span>
							{{ info.venue_number }}个
						</p>
						<p>
							<span>最大厅面积：</span>
							{{ info.venue_max_area }}平方米
						</p>
						<p>
							<span>最大厅容纳：</span>
							{{ info.venue_max_people_number }}人
						</p>
					</div>
					<div class="line">
						<p>
							<span>开业时间：</span>
							{{ info.opening_time }}
						</p>
						<p>
							<span>最近装修：</span>
							{{ info.recent_decoration }}
						</p>
						<p>
							<span>最低餐标：</span>
							{{ info.minimum_meal_standard }}
						</p>
					</div> -->
          <div class="other">
            <!-- <div>
							<p>销售联系人1</p>
							<p class="contactsInfo">
								<span>{{ info.contacts }}</span>
								<span>
									<i class="el-icon-phone"></i>
									{{'123123'}}
								</span>
							</p>
						</div> -->

            <div>
              <p style="color: #999999; margin-top: 10px">销售联系人</p>
              <div class="title-p">
                <img src="@/assets/images/hotel_con.png" alt />
                <span style="
                    font-size: 20px;
                    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                    font-weight: 500;
                    color: #333333;
                  ">{{
                    info.salesmanlist.length > 0
                      ? info.salesmanlist[0].name
                      : "-"
                  }}</span>
                <p style="
                    font-size: 14px;
                    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                    font-weight: 500;
                    color: #666666;
                  ">
                  电话：<span>{{
                    info.salesmanlist.length > 0
                      ? info.salesmanlist[0].phone
                      : "-"
                  }}</span>
                </p>
              </div>
              <div class="title-p" style="margin-left: -55px; margin-top: 10px">
                <img src="@/assets/images/hotel_phone.png" alt />
                <span class="span_one">酒店总机：</span>
                <p style="
                    font-size: 14px;
                    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                    font-weight: 500;
                    color: #666666;
                  ">
                  {{ info.telephone ? info.telephone : "-" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- 123 -->
        <!-- 123456 -->
        <!-- 123 -->
      </div>
      <div class="bottom">
        <div class="main">
          <!-- <div ref="tabs">
						<div ref="tabs_child"> -->
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane :label="`会议厅信息(${this.arrData.length}个)`" name="anchorlink_conference"></el-tab-pane>
            <el-tab-pane :label="`客房信息(${this.roomData.length}个)`" name="anchorlink_room"></el-tab-pane>
            <el-tab-pane :label="`餐厅信息(${this.info.restaurantlist.length}个)`" name="anchorlink_canteen"></el-tab-pane>
            <el-tab-pane label="酒店信息" name="anchorlink_hotel"></el-tab-pane>
            <el-tab-pane label="配套设施" name="ancillary_facility"></el-tab-pane>
          </el-tabs>
          <!-- 	</div>
					</div> -->

          <div id="anchorlink_conference" class="title">会议厅信息</div>
          <table>
            <thead>
              <tr class="color_2">
                <!-- <th rowspan="2" width="150">图片效果</th> -->
                <th rowspan="2" width="120">会议室名称</th>
                <th rowspan="2" width="80">面积(㎡)</th>
                <!-- <th rowspan="2">
                  层高
                  <br />(㎡)
                </th>
                <th rowspan="2">
                  是否
                  <br />有柱
                </th> -->
                <th rowspan="2" class="th-width">
                  最多可
                  <br />容纳人数
                </th>
                <th colspan="7">会议厅布局及容纳人数</th>
                <!-- <th rowspan="2" width="130">
                  市场参考价
                  <br />
                  <span>酒店挂牌价格</span>
                </th>
                <th rowspan="2" class="price-th">
                  企业
                  <br />协议价
                </th> -->
                <th rowspan="2" width="130">全天参考价</th>
                <th rowspan="2" width="130">半天参考价</th>
                <!-- <th rowspan="2" style="width: 100px">操作</th> -->
                <!-- <th rowspan="2">折扣</th> -->
              </tr>
              <tr class="color_2">
                <th>
                  <img src="@/assets/images/1.png" alt />
                </th>
                <th>
                  <img src="@/assets/images/2.png" alt />
                </th>
                <th>
                  <img src="@/assets/images/3.png" alt />
                </th>
                <th>
                  <img src="@/assets/images/4.png" alt />
                </th>
                <th>
                  <img src="@/assets/images/5.png" alt />
                </th>
                <th>
                  <img src="@/assets/images/6.png" alt />
                </th>
                <th>
                  <img src="@/assets/images/7.png" alt />
                </th>
              </tr>
            </thead>
            <tbody v-for="(item, index_) in info.conferencelist" :key="index_">
              <tr>
                <!-- <td rowspan="2">
                  <img
                    :src="
                      item.piclist.length
                        ? item.piclist[0].pic
                        : require('../../assets/images/meeting.jpg')
                    "
                    style="width: 165px; height: 120px"
                  />
                </td> -->
                <td rowspan="2">
                  <p>{{ item.name }}</p>
                  <!--  -->
                  <el-button type="text" style="
                      margin-left: 10px;
                      margin-right: 10px;
                      font-size: 12px;
                    " @click="closeHotel(item, index_)">
                    {{ lookHotel }}
                    <i :class="
                        item.flag_ == 1
                          ? 'el-icon-arrow-up '
                          : 'el-icon-arrow-down'
                      "></i>
                  </el-button>
                  <!--  -->
                </td>
                <td>{{ item.area ? item.area : "-" }}</td>
                <!-- <td>{{ item.floor_height }}</td> -->
                <!-- <td>{{ item.iscolumn }}</td> -->
                <!-- 最多可容纳人数 -->
                <td>{{ item.capacity ? item.capacity : "-" }}</td>
                <td>
                  {{
                    item.swing_table_theater ? item.swing_table_theater : "-"
                  }}
                </td>
                <td>
                  {{ item.swing_table_desk ? item.swing_table_desk : "-" }}
                </td>
                <td>
                  {{
                    item.swing_table_fishbone ? item.swing_table_fishbone : "-"
                  }}
                </td>
                <td>
                  {{
                    item.swing_table_u_shaped ? item.swing_table_u_shaped : "-"
                  }}
                </td>
                <td>
                  {{ item.swing_table_zigzag ? item.swing_table_zigzag : "-" }}
                </td>
                <td>
                  {{
                    item.swing_table_banquet ? item.swing_table_banquet : "-"
                  }}
                </td>
                <td>
                  {{
                    item.swing_table_alcohol ? item.swing_table_alcohol : "-"
                  }}
                </td>
                <td rowspan="2" style="
                    font-size: 14px;
                    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                    font-weight: 500;
                    color: #409eff;
                  ">
                  <!--  全天参考价 -->
                  {{ item.priceAllDay ? item.priceAllDay : "-" }}
                </td>
                <td rowspan="2" style="
                    font-size: 14px;
                    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                    font-weight: 500;
                    color: #409eff;
                  ">
                  {{ item.priceHalfDay ? item.priceHalfDay : "-" }}
                </td>
                <!-- <td rowspan="4">
                  <el-button type="primary" size="small">询价</el-button>
                </td> -->
                <!-- <td rowspan="2">
                  <p>
                    <span>¥{{ item.reference_price }}</span
                    >/全天
                  </p> -->
                <!-- <p>
                    <span>¥30000</span>/全天
                  </p>-->
                <!-- </td> -->
                <!-- <td rowspan="2">暂无</td>
                <td rowspan="2">暂无</td> -->
              </tr>
              <tr>
                <td colspan="10" style="
                    text-align: left;
                    font-size: 12px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                    font-weight: 400;
                    color: #999999;
                  ">
                  其他信息：
                  {{ item.iswindowed ? item.iswindowed : "-" }} 位于{{
                    item.floor ? item.floor : "-"
                  }}楼 形状：{{ item.shape ? item.shape : "-" }} 长*宽：{{
                    item.length_and_width ? item.length_and_width : "-"
                  }}
                  <!-- 是否有柱： -->
                  {{ item.iscolumn ? item.iscolumn + "柱" : "-" }}
                </td>
              </tr>
              <!-- <tr v-if="item.piclist.length != 0">
								<td colspan="14" class="color_4">
									<el-image style="width: 150px; height: 150px" v-if="itemc in item.piclist" :src="itemc.pic" :preview-src-list="item.piclist"></el-image>
									
								</td>
							</tr> -->
              <tr>
                <td colspan="10" style="text-align: left" v-show="item.flag_ == 1 ? tableLook : ''">
                  <div class="effectPicture">
                    <el-row :gutter="20">
                      <el-col :span="6" v-for="(item, index1) in item.piclist" :key="index1">
                        <div v-if="index <= 2">
                          <!-- <img
                            :src="item.pic"
                            alt
                            style="width: 100%; height: 100%"
                          /> -->
                          <el-image style="width: 120px; height: 100px" :src="item.pic" :preview-src-list="[item.pic]">
                          </el-image>
                        </div>
                      </el-col>
                      <el-col :span="6" v-for="(item, index2) in item.piclist" :key="index2">
                        <div v-if="index == 3">
                          <!-- <img :src="item.pic" alt style="width: 100%" /> -->
                          <el-image style="width: 120px; height: 100px" :src="item.pic">
                          </el-image>
                          <div style="position: relative; right: -38px; top: -70px">
                            <el-button @click="more(0, item, index_)" type="text" style="
                                font-size: 12px;
                                font-family: Source Han Sans CN-Medium,
                                  Source Han Sans CN;
                                font-weight: 500;
                                color: #ffffff;
                              ">
                              查看更多
                            </el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <p v-if="item.piclist.length == 0" style="
                        text-align: center;
                        font-size: 14px;
                        font-weight: 400;
                        margin-left: 275px;
                        color: rgb(153, 153, 153);
                      ">
                      无更多图片
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
            <!-- hkz----- -->
            <div style="margin-left: 375px">
              <el-button type="text" style="margin-left: 10px" @click="closeSearch">
                {{ word }}
                <i :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"></i>
              </el-button>
            </div>
            <!-- hkz-----end -->
          </table>
          <div style="text-align: center; margin-top: 30px">
            <p style="
                font-size: 12px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #ff9429;
              ">
              温馨提示：网页所列参考价仅供参考，最终会议团队的价格以酒店销售的书面报价为准
            </p>
          </div>
          <div id="anchorlink_room" class="title">客房信息</div>
          <table>
            <thead>
              <tr class="color_2">
                <th rowspan="2" width="120">房型</th>
                <th rowspan="2" width="120">床型</th>
                <th rowspan="2" width="120">面积（㎡）</th>
                <th rowspan="2" width="120">数量（间）</th>
                <th rowspan="2" width="120">早餐</th>
                <th rowspan="2" width="120">宽带</th>
                <!-- <th>团队参考价</th>
                <th>企业协议价</th>
                <th>折扣</th> -->
                <th rowspan="2" width="120">参考价</th>
              </tr>
            </thead>
            <tbody v-for="(item, index_) in info.roomlist" :key="index_">
              <tr>
                <td>
                  {{ item.roomtype ? item.roomtype : "-" }}

                  <el-button type="text" style="
                      margin-left: 10px;
                      margin-right: 10px;
                      font-size: 12px;
                    " @click="closeGuest(item, index_)">
                    {{ lookHotel_ }}
                    <i :class="
                        item.flag_ == 1
                          ? 'el-icon-arrow-up '
                          : 'el-icon-arrow-down'
                      "></i>
                  </el-button>
                  <!--  -->
                </td>
                <td>{{ item.bedtype ? item.bedtype : "-" }}</td>
                <td>{{ item.area ? item.area : "-" }}</td>
                <td>{{ item.quantity ? item.quantity : "-" }}</td>
                <!-- <td>{{ item.isbreakfast ? item.isbreakfast : "-" }}</td> -->
                <!--  -->
                <td v-if="item.isbreakfast">
                  {{ item.isbreakfast == 1 ? "包含" : "不包含" }}
                </td>
                <td v-else></td>
                <!--  -->
                <td>{{ item.isbroadband ? item.isbroadband : "-" }}</td>
                <td class="price-color">
                  {{ item.reference_price ? item.reference_price : "-" }}
                </td>
                <!-- <td>暂无</td>
                <td>暂无</td> -->
              </tr>
              <!-- 客房信息 -->
              <tr>
                <td colspan="10" style="text-align: left" v-show="item.flag_ == 1 ? tableLook_ : ''">
                  <div class="effectPicture">
                    <el-row :gutter="20">
                      <el-col :span="6" v-for="(item, index3) in item.piclist" :key="index3">
                        <div v-if="index <= 2">
                          <el-image style="width: 120px; height: 100px" :src="item.pic" :preview-src-list="[item.pic]">
                          </el-image>
                        </div>
                      </el-col>
                      <el-col :span="6" v-for="(item, index4) in item.piclist" :key="index4">
                        <div v-if="index == 3">
                          <el-image style="width: 120px; height: 100px" :src="item.pic">
                          </el-image>
                          <div style="position: relative; right: -40px; top: -70px">
                            <!-- this.dialogVisible = true; -->
                            <el-button @click="more(1, item, index_)" type="text" style="
                                font-size: 12px;
                                font-family: Source Han Sans CN-Medium,
                                  Source Han Sans CN;
                                font-weight: 500;
                                color: #ffffff;
                              ">
                              查看更多
                            </el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <p v-if="item.piclist.length == 0" style="
                        text-align: center;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgb(153, 153, 153);
                      ">
                      无更多图片
                    </p>
                  </div>
                </td>
              </tr>
              <!--  -->
            </tbody>
            <!-- hkz---- -->
            <div style="margin-left: 375px">
              <el-button type="text" style="margin-left: 10px" @click="closeSearch_room">
                {{ word_room }}
                <i :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"></i>
              </el-button>
            </div>
            <!-- hkz-----end -->
          </table>

          <div id="anchorlink_canteen" class="title">餐厅信息</div>
          <!-- 餐厅信息 -->
          <div v-for="(item, index) in info.restaurantlist" :key="index">
            <div class="canteen">
              <div class="canteen_one">
                <el-carousel height="150px" trigger="click" v-if="item.piclist.length > 0">
                  <el-carousel-item v-for="(item,index5) in item.piclist" :key="index5">
                    <img :src="item.pic" alt style="width: 100%; height: 100%" />
                  </el-carousel-item>
                </el-carousel>
                <div v-else>
                  <img src="@/assets/images/meeting.jpg" alt style="width: 100%" />
                </div>
              </div>
              <div class="canteen_two">
                <h3 style="display: inline-block; margin-right: 10px">
                  {{ item.name }}
                </h3>
                <p style="display: inline-block">
                  <span style="
                      font-size: 12px;
                      font-family: Source Han Sans CN-Regular,
                        Source Han Sans CN;
                      font-weight: 400;
                      color: #999999;
                    ">人均参考价：{{
                      item.consumptionAverage ? item.consumptionAverage : "-"
                    }}
                    元</span>
                </p>
                <p class="hotel_p">
                  <!-- <span style="margin: 0">桌餐</span>
                <span>500㎡</span>
                <span>238个席位</span>
                <span>位于2楼</span>
                <span>层高5M</span> -->
                  <span style="margin: 0">桌餐</span>
                  <span>{{ item.area }}㎡</span>
                  <span>{{ item.seatNumber ? item.seatNumber : "-" }}个席位</span>
                  <span>位于{{ item.floor ? item.floor : "/" }}楼</span>
                  <span>层高{{ item.floorHigh ? item.floorHigh : "/" }}M</span>
                </p>
                <p>
                  <span style="
                      font-size: 14px;
                      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                      font-weight: 500;
                      color: #999999;
                    ">营业时间：
                  </span>
                  <span>{{
                      item.businessHours
                        ? item.businessHours.replace(",", " - ")
                        : "-"
                    }}
                  </span>
                  <span v-if="item.daylis">
                    （ {{ item.daylis | daylis(item.daylis) }} ）
                  </span>
                  <span v-else> - </span>
                </p>
                <p>
                  <span style="
                      font-size: 14px;
                      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                      font-weight: 500;
                      color: #999999;
                    ">其他信息：</span><span>{{ item.remark ? item.remark : "-" }}</span>
                </p>
                <div>
                  <el-button type="text" style="margin-left: 10px" @click="hotelBtn(item, index)">
                    {{ btns }}
                    <i :class="
                        item.flag_ == 0
                          ? 'el-icon-arrow-up '
                          : 'el-icon-arrow-down'
                      "></i>
                  </el-button>
                </div>
              </div>
            </div>
            <!--  -->
            <div v-show="item.flag_ == 1 ? tableLook_hotel : ''">
              <table>
                <thead>
                  <tr class="color_2">
                    <th>包厢名称</th>
                    <th>面积（㎡）</th>
                    <th>容纳人数</th>
                    <th>层高（㎡）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in item.privateroomList" :key="index">
                    <td>{{ item.roomName ? item.roomName : "-" }}</td>
                    <td>{{ item.roomArea ? item.roomArea : "-" }}</td>
                    <td>{{ item.capacity ? item.capacity : "-" }}</td>
                    <td>{{ item.roomHigh ? item.roomHigh : "-" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- end -->
          <!-- <div v-for="(item) in info.conferencelist" :key="item.id"> -->
          <!-- 基本信息 -->
          <!-- <div class="flex_row">
							<div>
									<img :src="item.piclist.length?item.piclist[0].pic:require('../../assets/images/meeting.jpg')" style="width: 165px; height: 120px" />
							</div>
							<div>
								<div class="flex_row">
									<h2>{{ item.name }}</h2>
									<p>人均参考价：{{  }}</p>
								</div>
								<p>桌餐 {{  }}</p>
								<p>营业时间：{{  }}</p>
								<p>其他信息{{  }}</p>
								
							</div>
						</div> -->
          <!-- 包厢信息 -->
          <!-- <div>
							<el-table >
								<el-table-column label="包厢名称" prop="event_city_name" align="center" ></el-table-column>
								<el-table-column label="面积" prop="event_city_name" align="center" ></el-table-column>
								<el-table-column label="容纳人数" prop="event_city_name" align="center" ></el-table-column>
								<el-table-column label="层高" prop="event_city_name" align="center" ></el-table-column>
							</el-table>
							<p style="text-align:center"><el-button type="text" size="small" @click="goDetail(scope.row)">收起包厢信息</el-button></p>
						</div> -->
          <!-- </div> -->

          <!-- <table>
						<thead>
							<tr class="color_2">
								<th >图片效果</th>
								<th>名称</th>
								<th > 楼层 </th>
								<th > 常开自助 </th>
								<th > 单开自助	</th>
								<th > 桌餐 </th>
								<th> 分餐 </th>
							</tr>
						</thead>
						<tbody v-for="(item) in info.conferencelist" :key="item.id">
							<tr>
								<td rowspan="2">
									<img src="../../assets/images/huanxi_icon.png" style="width: 90px; height: 90px" />
									<img :src="item.piclist.length?item.piclist[0].pic:require('../../assets/images/meeting.jpg')" style="width: 165px; height: 120px" />
								</td>
								<td >
									{{ item.name }}
								</td>
								<td>
									12层
								</td>
								<td>
									<span class="uniprice"> ￥100/位 </span> <br>
									<span>可容纳：80人</span>
								</td>
								<td>
									<span class="uniprice"> ￥100/位 </span> <br>
									<span>可容纳：80人</span>
								</td>
								<td>
									<span class="uniprice"> ￥100/位 </span> <br>
									<span>可容纳：80人</span>
								</td>
								<td>
									<span class="uniprice"> ￥100/位 </span> <br>
									<span>可容纳：80人</span>
								</td>
							</tr>
							<tr>
								<td colspan="6" style="text-align: left;">
									其他信息：位于12楼 高6.25m 矩形 不可拆分 无窗 无柱
								</td>
							</tr>
						</tbody>
					</table> -->

          <div id="anchorlink_hotel" class="title">酒店信息</div>
          <div class="stitle">
            <el-descriptions title="" direction="vertical" :column="4" border>
              <!-- <el-descriptions-item label="开业时间"
                >2022年6月20日</el-descriptions-item
              >
              <el-descriptions-item label="地点"
                >北京市丰台区</el-descriptions-item
              >
              <el-descriptions-item label="停车位数" :span="2"
                >230</el-descriptions-item
              > -->
              <el-descriptions-item label="酒店介绍">
                <div class="hotelTxt">
                  <span>开业时间：{{
                      info.opening_time ? info.opening_time : "-"
                    }}</span>
                  <span>酒店名称：{{ info.name ? info.name : "-" }}</span>
                  <span>停车位数：{{
                      info.parking_spaces_number
                        ? info.parking_spaces_number
                        : "-"
                    }}</span>
                </div>
                <p style="margin-left: 20px">
                  {{ info.hotel_profile ? info.hotel_profile : "-" }}
                </p>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <!-- <div class="stitle">酒店介绍</div>
          <table class="table-hotel" border="1">
            <tr>
              <th>开业时间</th>
              <td>{{ info.opening_time }}</td>
            </tr>
            <tr>
              <th>最近装修时间</th>
              <td>{{ info.recent_decoration }}</td>
            </tr>
            <tr>
              <th>酒店简介</th>
              <td>{{ info.hotel_profile }}</td>
            </tr>
          </table> -->
          <div id="ancillary_facility" class="title">配套设施</div>
          <!-- <div class="stitle">酒店简介</div> -->
          <table class="table-hotel" border="1">
            <tr>
              <th>酒店服务设施</th>
              <td>{{ info.facilities ? info.facilities : "-" }}</td>
            </tr>
            <tr>
              <th>会议服务设施</th>
              <td>{{ info.restaurant ? info.restaurant : "-" }}</td>
            </tr>
            <tr>
              <th>客房服务设施</th>
              <td>{{ info.room_facilities ? info.room_facilities : "-" }}</td>
            </tr>
            <tr>
              <th>酒店餐饮设施</th>
              <td>{{ info.restaurantCodes ? info.restaurantCodes : "-" }}</td>
            </tr>
          </table>
          <!-- <div class="item_s">
						<span>酒店设施和服务</span>
						<p class="info-hotel">{{ info.facilities }}</p>
					</div>
					<div class="item_s">
						<span>酒店餐饮设施</span>
						<p class="info-hotel">{{ info.restaurant }}</p>
					</div>
					<div class="item_s">
						<span>客房设施和服务</span>
						<p class="info-hotel">{{ info.room_facilities }}</p>
					</div> -->
        </div>
        <div class="lookMap">
          <baidu-map>
            <bm-view class="map"></bm-view>
            <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
            <!-- <bm-circle center="灯市口" radius="1000"></bm-circle> -->
          </baidu-map>
        </div>
      </div>
    </div>
    <el-dialog title="会议厅效果图" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div class="viewLook">
        <div class="view_left">
          <img :src="largeIcon.pic" alt style="width: 100%; height: 100%; cursor: pointer" />
        </div>
        <div class="view_right">
          <div v-for="(item, index) in pictureList" :key="index" style="margin_bottom: 5px">
            <!-- :class="item.num == index ? 'is_active' : ''" -->
            <img :src="item.pic" alt style="width: 100%; cursor: pointer" @click="imgLook(item)" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">关闭</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @page 酒店详情
 */
import { detectZoom } from '@/utils/detectZoom'
// 处理笔记本系统默认系统比例为150%带来的布局影响

const m = detectZoom()

document.body.style.zoom = 100 / Number(m)
export default {
  data() {
    return {
      info: null,
      activeName: '0',
      isOpen: false,
      carouselItemIndex: 0,
      showAll: true, //是否展开全部
      showAll_room: true, //是否展开全部
      arrData: [],
      arrData_: [],
      roomData: [],
      arrData_roomData: [],
      showHotelAll: false,
      showHotel: false,
      showGuest: false,
      location: '',
      keyword: sessionStorage.getItem('hotelName'),
      // sessionStorage.getItem(hotelName)
      is_span: 0,
      dialogVisible: false,
      pictureAll: [
        {
          src: 'https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg',
          num: 0
        },
        {
          src: 'https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg',
          num: 1
        },
        {
          src: 'https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg',
          num: 2
        },
        {
          src: 'https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg',
          num: 3
        },
        {
          src: 'https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg',
          num: 4
        },
        {
          src: 'https://back.tobosu.com/new_impress_pic/water_mark/2022-05-09/6278db1f4e037.jpg',
          num: 5
        }
      ],
      kkk: [
        {
          TableName: 'event_hotel_pic',
          id: null,
          father_id: null,
          pic: 'https://img1.baidu.com/it/u=2537712248,2018351523&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500',
          pic_type: null
        },
        {
          TableName: 'event_hotel_pic',
          id: null,
          father_id: null,
          pic: 'https://img2.baidu.com/it/u=3742188983,2927504392&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=400',
          pic_type: null
        },
        {
          TableName: 'event_hotel_pic',
          id: null,
          father_id: null,
          pic: 'https://img2.baidu.com/it/u=493459701,3550054331&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500',
          pic_type: null
        },
        // https://img0.baidu.com/it/u=295896979,919754981&fm=253&fmt=auto&app=138&f=JPEG?w=895&h=500
        {
          TableName: 'event_hotel_pic',
          id: null,
          father_id: null,
          pic: 'https://img2.baidu.com/it/u=432859711,3148420507&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=400',
          pic_type: null
        },
        {
          TableName: 'event_hotel_pic',
          id: null,
          father_id: null,
          pic: 'https://img2.baidu.com/it/u=432859711,3148420507&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=400',
          pic_type: null
        }
      ],
      arr: [
        {
          src: '11111',
          fileList: [
            {
              aaa: '12222',
              bbb: [
                {
                  ccc: '0001'
                },
                {
                  ccc: '0002'
                },
                {
                  ccc: '0003'
                }
              ]
            },
            {
              aaa: '12222',
              bbb: [
                {
                  ccc: '0004'
                },
                {
                  ccc: '0005'
                },
                {
                  ccc: '0006'
                }
              ]
            }
          ]
        },
        {
          src: '11111',
          fileList: [
            {
              aaa: '12222',
              bbb: [
                {
                  ccc: '0007'
                },
                {
                  ccc: '0008'
                },
                {
                  ccc: '0009'
                }
              ]
            },
            {
              aaa: '12222',
              bbb: [
                {
                  ccc: '00010'
                },
                {
                  ccc: '00011'
                },
                {
                  ccc: '00012'
                }
              ]
            }
          ]
        }
      ],
      tableLook: false,
      tableLook_: false,
      tableLook_hotel: false,
      flag_: true,
      largeIcon: '',
      pictureList: [],
      resourcePlatform: []
    }
  },

  computed: {
    word: function() {
      if (this.showAll == false) {
        //对文字进行处理
        return '展开其他会议厅'
      } else {
        return '收起其他会议厅'
      }
    },
    lookHotel: function() {
      if (this.showHotel == false) {
        //对文字进行处理
        return '效果图展示'
      } else {
        return '效果图展示'
      }
    },
    lookHotel_: function() {
      if (this.showGuest == false) {
        //对文字进行处理
        return '效果图展示'
      } else {
        return '效果图展示'
      }
    },
    word_room: function() {
      if (this.showAll_room == false) {
        //对文字进行处理
        return '展开其他客房信息'
      } else {
        return '收起其他客房信息'
      }
    },
    btns: function() {
      if (this.showHotelAll == false) {
        //对文字进行处理
        return '包厢信息'
      } else {
        return '包厢信息'
      }
    }
  },
  methods: {
    removeLeft() {
      // this.carouselItemIndex -= 1;
      this.$refs.carousel.prev()
      console.log(this.carouselItemIndex)
      // if(this.carouselItemIndex >= 5 && this.carouselItemIndex < [1,2,3,4,5,6,7,8].length-1){
      // 	this.$refs.thumbnailList.style.transform = `translateX(${-75*(this.carouselItemIndex-4)}px)`
      // }else if(this.carouselItemIndex == [1,2,3,4,5,6,7,8].length-1){
      // 	this.$refs.thumbnailList.style.transform = `translateX(${-75*(this.carouselItemIndex - 7)}px)`
      // }
      if (this.carouselItemIndex == 0) {
        this.$refs.thumbnailList.style.transform = `translateX(${100 * (this.carouselItemIndex - (this.pictureAll.length - 5 - 1))}px)`
      } else if (this.pictureAll.length - 5 > this.carouselItemIndex) {
        this.$refs.thumbnailList.style.transform = `translateX(${100 * (1 - this.carouselItemIndex)}px)`
      }
    },
    removeRight() {
      // this.carouselItemIndex += 1;
      this.$refs.carousel.next()
      // debugger
      console.log(this.carouselItemIndex)
      if (this.carouselItemIndex >= 5 && this.carouselItemIndex < this.pictureAll.length - 1) {
        this.$refs.thumbnailList.style.transform = `translateX(${-100 * (this.carouselItemIndex - 4)}px)`
      } else if (this.carouselItemIndex == this.pictureAll.length - 1) {
        this.$refs.thumbnailList.style.transform = `translateX(${-100 * (this.carouselItemIndex - (this.pictureAll.length - 1))}px)`
      }
    },
    carouselItemChange(index) {
      this.carouselItemIndex = index
    },
    checkImg(index) {
      this.$refs.carousel.setActiveItem(index)
    },
    onCollection() {
      // console.log(this.info);
      if (this.info.iscollection) {
        this.requestApi({
          url: '/hotel/CancelCollection',
          method: 'POST',
          data: { id: this.info.id }
        }).then(res => {
          this.$message({
            message: '取消收藏成功',
            type: 'warning'
          })
          // this.$notify({
          //   title: "成功",
          //   message: "取消收藏",
          //   type: "success",
          //   offset: 100,
          // });
          this.info.iscollection = 0
        })
      } else {
        this.requestApi({
          url: '/hotel/Collection',
          method: 'POST',
          data: { id: this.info.id }
        }).then(res => {
          this.$message({
            message: '收藏成功',
            type: 'success'
          })
          // this.$notify({
          //   title: "成功",
          //   message: "收藏成功",
          //   type: "success",
          //   offset: 100,
          // });
          this.info.iscollection = 1
        })
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      document.getElementById(tab.name).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    },
    open() {
      this.info.conferencelist.forEach((val, index) => {
        val['openClose'] = 'name'
        console.log(this.info)
      })
    },
    close(val) {
      console.log(val)
    },
    closeSearch() {
      // debugger
      this.showAll = !this.showAll
      // this.info.conferencelist
      this.arrData_ = []
      if (this.info.conferencelist.length >= 3) {
        for (let i = 0; i < 3; i++) {
          this.arrData_.push(this.info.conferencelist[i])
        }
      } else {
        this.arrData_ = this.info.conferencelist
      }
      if (this.showAll == false) {
        console.log(123)
        this.info.conferencelist = this.arrData_
      } else {
        console.log(456)
        this.info.conferencelist = this.arrData
      }
    },
    closeHotel(item, index) {
      this.tableLook = false
      this.showHotel = false
      this.info.conferencelist[index].flag_ = !this.info.conferencelist[index].flag_
      this.tableLook = !this.tableLook
      this.showHotel = !this.showHotel
      console.log(item, index)
    },
    closeGuest(item, index) {
      this.tableLook_ = false
      this.showGuest = false
      this.info.roomlist[index].flag_ = !this.info.roomlist[index].flag_
      this.tableLook_ = !this.tableLook_
      this.showGuest = !this.showGuest
      console.log(item, index)
    },
    hotelBtn(item, index) {
      console.log(item, index)
      this.tableLook_hotel = false
      this.info.restaurantlist[index].flag_ = !this.info.restaurantlist[index].flag_
      this.showHotelAll = !this.showHotelAll
      this.tableLook_hotel = !this.tableLook_hotel
    },
    closeSearch_room() {
      // debugger
      this.showAll_room = !this.showAll_room
      // this.info.conferencelist
      this.arrData_roomData = []
      console.log(this.info.roomlist, this.arrData_roomData, '33333')
      if (this.info.roomlist.length >= 3) {
        for (let i = 0; i < 3; i++) {
          this.arrData_roomData.push(this.info.roomlist[i])
        }
      } else {
        this.arrData_roomData = this.info.roomlist
      }
      if (this.showAll_room == false) {
        console.log(123)
        this.info.roomlist = this.arrData_roomData
      } else {
        console.log(456)
        this.info.roomlist = this.roomData
      }
    },
    pictureLook(val) {
      if (val == 0) {
        console.log(this.info.length)
        let arr_ = []
        for (let j = 0; j < this.info.conferencelist.length; j++) {
          for (let k = 0; k < this.info.conferencelist[j].piclist.length; k++) {
            arr_.push(this.info.conferencelist[j].piclist[k])
          }
        }
        if (arr_.length > 0) {
          this.$refs.normal.style.left = -380 + 'px'
          this.pictureAll = arr_
          this.is_span = val
        } else {
          this.$message({
            message: '会场下暂无可展示图片',
            type: 'warning'
          })
        }
        //
        console.log(this.pictureAll)
      } else if (val == 1) {
        // debugger
        let arr_ = []
        for (let j = 0; j < this.info.roomlist.length; j++) {
          for (let k = 0; k < this.info.roomlist[j].piclist.length; k++) {
            arr_.push(this.info.roomlist[j].piclist[k])
          }
        }
        if (arr_.length > 0) {
          this.$refs.normal.style.left = -203 + 'px'
          this.pictureAll = arr_
          this.is_span = val
        } else {
          this.$message({
            message: '客房下暂无可展示图片',
            type: 'warning'
          })
        }
        //
        console.log(this.pictureAll)
      } else if (val == 3) {
        // debugger
        let arr_ = []
        for (let j = 0; j < this.info.restaurantlist.length; j++) {
          for (let k = 0; k < this.info.restaurantlist[j].piclist.length; k++) {
            arr_.push(this.info.restaurantlist[j].piclist[k])
          }
        }
        if (arr_.length > 0) {
          this.$refs.normal.style.left = -25 + 'px'
          this.pictureAll = arr_
          this.is_span = val
        } else {
          this.$message({
            message: '餐厅下暂无可展示图片',
            type: 'warning'
          })
        }
        //
        console.log(this.pictureAll)
      } else {
      }
    },
    picture_Look() {
      // this.dialogVisible = true;
      console.log(123)
    },
    handleClose(done) {
      done()
    },
    more(val, item, index_) {
      console.log(val, item, index_)
      // 单张图片
      this.largeIcon = item
      // 打开弹窗
      this.dialogVisible = true
      if (val == 0) {
        // 所有图片
        this.pictureList = this.info.conferencelist[index_].piclist
      } else if (val == 1) {
        this.pictureList = this.info.roomlist[index_].piclist
      }
    },
    imgLook(item) {
      this.largeIcon = item
    }
  },
  created() {},
  filters: {
    //内容过滤
    daylis(value) {
      console.log(value)
      if (value.length != undefined) {
        var result = ''
        if (value.indexOf('1') != -1) {
          result += '周一 '
        }
        if (value.indexOf('2') != -1) {
          result += '周二 '
        }
        if (value.indexOf('3') != -1) {
          result += '周三 '
        }
        if (value.indexOf('4') != -1) {
          result += '周四 '
        }
        if (value.indexOf('5') != -1) {
          result += '周五 '
        }
        if (value.indexOf('6') != -1) {
          result += '周六 '
        }
        if (value.indexOf('7') != -1) {
          result += '周日 '
        }
        return result
        // if (value.length > 5) {
        //   return value.slice(0, 4) + "...";
        // } else {
        //   return value;
        // }
      }
    }
  },
  mounted() {
    debugger
    this.$nextTick(() => {
      console.log(this.$route.params.id)
      this.requestApi({
        url: '/hotel/info',
        method: 'POST',
        data: { id: this.$route.params.id }
      }).then(res => {
        this.info = res
        if (this.info.hotel_label) {
          this.resourcePlatform = this.info.hotel_label.split(',')
        }
        this.info.conferencelist.forEach(item => {
          item.flag_ = 0
        })
        this.info.roomlist.forEach(item => {
          item.flag_ = 0
        })
        this.info.restaurantlist.forEach(item => {
          item.flag_ = 0
        })
        console.log(this.info)
        let arr_ = []
        for (let j = 0; j < this.info.conferencelist.length; j++) {
          for (let k = 0; k < this.info.conferencelist[j].piclist.length; k++) {
            arr_.push(this.info.conferencelist[j].piclist[k])
          }
        }
        this.pictureAll = arr_
        console.log(this.pictureAll)
        // debugger;
        this.arrData = this.info.conferencelist
        this.roomData = this.info.roomlist
        this.closeSearch()
        this.closeSearch_room()
        this.info.facilities = this.info.facilities ? this.info.facilities.replace(/,/g, ' ') : ''
        this.info.restaurant = this.info.restaurant ? this.info.restaurant.replace(/,/g, ' ') : ''
        this.info.room_facilities = this.info.room_facilities ? this.info.room_facilities.replace(/,/g, ' ') : ''
        this.open()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.table-hotel {
  margin-top: 5px;
  border: none;
}
.table-hotel > tr > th {
  width: 150px;
  background-color: #fafafa;
  color: gray;
  vertical-align: top;
  text-align: left;
  line-height: 25px;
  padding-left: 25px;
}

.table-hotel > tr > td {
  color: #0d0d0d;
  line-height: 25px;
  text-align: left;
}

.price-color {
  font-size: 14px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #409eff;
}

.info-hotel {
  color: #666;
}

.openOrClose {
  cursor: pointer;
  display: flex;
}

.price-th {
  width: 62px;
}

.th-width {
  width: 76px;
}

.hotleInfo {
  .section {
    width: 1230px;
    margin: 20px auto;
    padding: 5px 15px;
    box-sizing: border-box;
  }

  .header {
    display: flex;

    .left {
      flex: 1;
      .ziyuanInfo {
        margin: 0 5px;
      }
      .name {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
        span {
          font-size: 12px;
          font-weight: 400;
        }
      }

      .number {
        font-size: 14px;
        color: #cdc1c1;
        margin-bottom: 5px;
      }

      .address {
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px dotted #cdc1c1;
      }

      .line {
        display: flex;
        margin-bottom: 10px;

        p {
          flex: 1;

          span {
            display: inline-block;
            width: 90px;
            color: #a69999;
          }
        }
      }

      .other {
        margin-top: 5px;
        margin-left: 20px;
        border-top: 1px dotted #cdc1c1;
        .el-icon-phone {
          font-size: 26px;
          color: #ff9900;
        }
        .contactsInfo {
          span {
            display: inline-block;
            min-width: 150px;
          }
          // display: flex;
          // justify-content: space-between;
        }
        p {
          margin: 10px 0;
        }
        .hotel_operating {
          float: right;

          .iconColor {
            color: #fa7a7a;
          }

          .iconfont {
            cursor: pointer;
            color: #fa7a7a;
          }
        }
      }
    }

    .right {
      width: 650px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        // height: 250px;
        object-fit: cover;
      }
      .thumbnail {
        position: relative;
        display: flex;
        top: -129px;
        width: 100%;
        height: 100px;
        overflow: hidden;
        padding: 0 25px;
        box-sizing: border-box;
        z-index: 3;
        .is-active {
          border: 1px solid #409eff;
        }
      }
      .thumbnail img {
        width: 100px;
        height: 100px;
        border: 1px solid #fff;
        // margin: 0 2px;
        box-sizing: border-box;
        cursor: pointer;
      }
      .arrow {
        font-size: 25px;
        background: #000;
        color: #fff;
        line-height: 100px;
        cursor: pointer;
        z-index: 1;
      }
      .el-icon-arrow-left {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
      }
      .el-icon-arrow-right {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.5;
      }
      ::deep .el-carousel__container {
        height: 500px;
      }
    }
  }
}

.bottom {
  display: flex;
  width: 100%;
  margin-top: -90px;
  margin-bottom: 40px;
  .main {
    flex: none;
    width: 70%;
    .uniprice {
      color: #f91;
      font-weight: bold;
    }
    .title {
      // border-left: 5px solid #0066cc;
      font-weight: 600;
      padding-left: 15px;
      line-height: 30px;
      margin-top: 30px;
      // background-color: #eee;
    }
  }
}

table {
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-top: 15px;
  // border: 1px solid #dddddd;

  tr,
  td,
  th {
    text-align: center;
    border-bottom: 1px solid #dddddd;
    padding: 10px;
    box-sizing: border-box;

    input {
      border: 1px solid #ccc;
      width: 100%;
      line-height: 30px;
      border-radius: 5px;
      color: #0066cc;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .radio {
      display: inline-block;
      width: 20px;
    }

    .line {
      display: inline-block;
      width: 60%;
      margin: 0 10px;
    }

    span {
      color: #999999;
      font-size: 14px;
    }

    p {
      span {
        color: #ff9900;
        font-size: 16px;
      }
    }
  }

  .topleft {
    text-align: left;
  }

  .color_1 {
    background-color: #dff0d8;
    font-size: 16px;
  }

  .color_2 {
    background-color: #f5f5f5;
  }

  .color_3 {
    background-color: #e6e6e6;
  }

  .color_4 {
    background-color: #f2f2f2;
  }
}

.stitle {
  font-size: 16px;
  margin-top: 15px;
}

.item_s {
  line-height: 30px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;

  span {
    display: inline-block;
    width: 150px;
    font-weight: bold;
  }
}
.number-one {
  color: #ff9429;
  font-size: 20px;
}
.title-sp {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  span {
    font-size: 14px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #666666;
  }
}
.title-p {
  margin-top: 10px;
  margin-left: 20px;
  width: 45%;
  float: left;
  img {
    width: 20px;
    float: left;
    margin-right: 10px;
  }
  .span_one {
    margin-right: 10px;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
  }
}
.picture_img {
  // border: 1px solid lawngreen;
}
.hotelTxt {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}
.canteen {
  display: flex;
  justify-content: space-between;
  min-height: 200px;
}
.canteen_one {
  width: 30%;
  margin-top: 15px;
  // border: 1px solid lightblue;
}
.canteen_two {
  width: 68%;
  // border: 1px solid green;
  p {
    margin-top: 22px;
  }
}
.hotel_p {
  span {
    margin-left: 10px;
  }
}
.lookMap {
  width: 29%;
  // border: 1px solid red;
  margin-left: 1%;
  margin-top: 39px;
}
.map {
  width: 100%;
  height: 500px;
  margin-bottom: 15px;
  border: 1px solid rgb(153, 153, 153);
}
.genre {
  display: flex;
  justify-content: center;
  color: #fff;
  z-index: 3;
  position: relative;
  top: -135px;
  padding: 5px;
  // background-color: black;
  // opacity: 0.8;
  line-height: 19px;
}
.sp_color {
  color: orange;
}
.sp_look {
  position: relative;
  top: -28px;
  left: 10px;
  color: #409eff;
  cursor: pointer;
}
.viewLook {
  height: 500px;
  display: flex;
  .view_left {
    padding: 5px;
    width: 75%;
    // height: 100%;
    // border: 1px solid black;
  }
  .view_right {
    margin-left: 20px;
    width: 20%;
    height: 500px;
    overflow-y: scroll;
    // border: 1px solid orange;
  }
}
.bg-purple {
  img {
    width: 100%;
    margin-bottom: 15px;
  }
}
.icon_hotel {
  display: flex;
  margin-bottom: 20px;
  margin-top: 35px;
  div {
    width: 20%;
    height: 100%;
    text-align: center;
    p {
      margin-top: 5px;
    }
    img {
      // margin-left:15px;
    }
  }
}
::deep.el-tag--mini {
  color: #409eff;
}
th {
  color: #999;
}
.imgBorder {
  // border: 2px solid blue;
}
.is_active {
  border: 1px solid #409eff;
}
.normal {
  border-top: 10px solid transparent;

  border-bottom: 10px solid white;

  border-left: 10px solid transparent;

  border-right: 10px solid transparent;

  position: relative;

  left: -380px;

  top: 10px;
}
</style>
