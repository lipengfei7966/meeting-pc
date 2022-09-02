<template>
  <div class="hotleIndex">
    <div class="section">
      <!-- <div class="search">
          <a :class="{  select: !listFormData.isagreement && !listFormData.iscollection }" href="javascript:void(0)" @click="searchall">所有酒店</a>
          <a :class="{  select: listFormData.isagreement }" href="javascript:void(0)" @click="searchagreement">公司协议酒店</a>
          <a :class="{  select: listFormData.iscollection }" href="javascript:void(0)" @click="searchcollection">我收藏的酒店</a>
        <div class="R global-search">
            <input class="text br2 new-search-input" placeholder="输入酒店名称或关键词" type="text" name="hotel_name" v-model="listFormData.hotel_name">
            <i class="el-icon-search"></i>
            <input class="btn br4 btn-primary" type="submit" id="top_search" value="搜索" @click="getList">
        </div>
        <div class="clear"></div>
      </div> -->
      <!--  -->
      <div class="search" v-if="exhibition">
        <div class="R global-search" v-if="collectHotel">
          <!-- <input
            class="text br2 new-search-input"
            placeholder="输入酒店名称或关键词"
            type="text"
            name="hotel_name"
            v-model="listFormData.hotel_name"
          /> -->
          <!--  -->
          <el-input v-model="listFormData.hotel_name" placeholder="输入酒店名称或关键词" class="seachInp"></el-input>
          <!--  -->
          <!-- <i class="el-icon-search"></i> -->
          <!-- <input
            class="btn br4 btn-primary"
            type="submit"
            id="top_search"
            value="搜索"
            @click="getList"
          /> -->
          <!--  -->
          <el-button type="primary" @click="getList" style="float: left">搜索</el-button>
          <!--  -->
        </div>
        <div class="clear"></div>
      </div>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有酒店" name="first"></el-tab-pane>
          <!-- <el-tab-pane label="公司协议酒店" name="second"></el-tab-pane> -->
          <el-tab-pane label="我收藏的酒店" name="third"></el-tab-pane>
          <el-tab-pane label="供应商库" name="fourth">
            <div class="supplierBase">
              <el-card>
                <el-form :model="formData" label-width="150px">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="供应商名称：">
                        <el-input size="small" v-model="formData.supplierName" placeholder="请输入供应商名称" clearable></el-input>
                      </el-form-item>

                      <!-- <span class="sp_one">所属公司：</span>
                      <el-input
                        class="elipt"
                        size="small"
                        v-model="formData.organizationName"
                        placeholder="请输入所属公司"
                        clearable
                      ></el-input> -->
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="所属公司">
                        <el-input size="small" v-model="formData.organizationName" placeholder="请输入所属公司" clearable></el-input>
                      </el-form-item>
                      <!-- <span class="sp_two">供应商名称：</span>
                      <el-input
                        class="elipt"
                        size="small"
                        v-model="formData.supplierName"
                        placeholder="请输入供应商名称"
                        clearable
                      ></el-input> -->
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="供应商属性：">
                        <el-select multiple size="small" v-model="formData.supplierAttributes" clearable>
                          <el-option label="常规资源" value="常规资源"></el-option>
                          <el-option label="紧急采购" value="紧急采购"></el-option>
                          <el-option label="签约供应商" value="签约供应商"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--  -->
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="供应商一级类型：">
                        <el-input size="small" v-model="formData.supplierOneName" placeholder="请输入供应商一级类型" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="供应商二级类型：">
                        <el-input size="small" v-model="formData.supplierTwoName" placeholder="请输入供应商二级类型" clearable></el-input>
                      </el-form-item>
                      <!-- <span class="sp_five">供应商二级类型：</span>
                      <el-input
                        class="elipt"
                        size="small"
                        v-model="formData.supplierTwoName"
                        placeholder="请输入供应商二级类型"
                        clearable
                      ></el-input> -->
                    </el-col>
                    <el-col :span="8"> </el-col>
                    <el-col :span="8">
                      <el-form-item label="供应商状态：">
                        <el-select multiple size="small" v-model="formData.supplierState" clearable>
                          <el-option label="使用" value="使用"></el-option>
                          <el-option label="停用" value="停用"></el-option>
                          <el-option label="试用" value="试用"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--  -->
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="酒店所属集团：">
                        <el-input size="small" v-model="formData.hotelGroupCompany" placeholder="请输入酒店所属集团" clearable></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="所属地区（洲）：">
                        <el-input size="small" v-model="formData.continent" placeholder="请输入所属地区（洲）" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="区域：">
                        <el-select size="small" v-model="formData.regin" clearable>
                          <el-option label="全部" value="全部"></el-option>
                          <el-option label="国内" value="国内"></el-option>
                          <el-option label="国外" value="国外"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--  -->
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="所属省（国家）：">
                        <el-input size="small" v-model="formData.province" placeholder="请输入所属省（国家）" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="所在城市：">
                        <el-input size="small" v-model="formData.city" placeholder="请输入所在城市" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="审核状态：">
                        <el-select multiple size="small" v-model="formData.toExamineState" clearable>
                          <el-option label="申请" value="申请"></el-option>
                          <el-option label="重新申报" value="重新申报"></el-option>
                          <el-option label="同意" value="同意"></el-option>
                          <el-option label="不同意" value="不同意"></el-option>
                          <el-option label="重复" value="重复"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--  -->
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="账期（天）：">
                        <el-input size="small" v-model="formData.accountingPeriod" placeholder="请输入账期（天）" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12"> </el-col>
                  </el-row>
                </el-form>
                <div class="search">
                  <el-button type="primary" size="small" @click="examineBtn(1)">查询</el-button>
                  <el-button size="small" @click="resetBtn">重置</el-button>
                </div>
              </el-card>
            </div>
            <div class="content">
              <el-card>
                <el-button type="primary" size="small" class="addHote" @click="addHote(0, '')">新建酒店</el-button>
                <template>
                  <el-table :data="tableData" style="width: 100%" :border="true">
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column prop="masterData" label="供应商ID" width="100">
                    </el-table-column>
                    <el-table-column prop="supplierName" label="供应商名称" width="180">
                    </el-table-column>
                    <el-table-column prop="taxRegistrationNo" label="财务结算码" width="150">
                    </el-table-column>
                    <el-table-column prop="supplierOneName" label="供应商一级类型" width="120">
                    </el-table-column>
                    <el-table-column prop="supplierTwoName" label="供应商二级类型" width="120">
                    </el-table-column>
                    <el-table-column prop="accountingPeriod" label="账期" width="120">
                    </el-table-column>
                    <el-table-column prop="regin" label="区域" width="180">
                    </el-table-column>
                    <el-table-column prop="hotelGroupCompany" label="酒店所属集团" width="180"></el-table-column>
                    <el-table-column prop="supplierState" label="供应商状态" width="100"></el-table-column>
                    <el-table-column prop="toExamineState" label="审核状态" width="150">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="150">
                      <template slot-scope="scope">
                        <el-button @click="handleExamine(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="addHote(1, scope.row)">一键生成酒店</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
                <el-pagination class="pagination" background layout="prev, pager, next,total" :total="pageInfo.totalCount" @current-change="distributorSizeChange">
                </el-pagination>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <!--  -->
      <div v-show="exhibition">
        <div class="typeList" v-if="collectHotel">
          <div class="item" v-if="type.city != null">
            <div class="name">选择城市</div>
            <div class="context">
              <div>
                <el-checkbox-group v-model="CitySelection_" @change="citySelect_" class="ck_one">
                  <el-checkbox label="不限"></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="CitySelection" @change="citySelect">
                  <el-checkbox :label="item.AbbreviationName" v-for="item in type.city[0].city_list" :key="item.code"></el-checkbox>
                </el-checkbox-group>
              </div>
              <!--  -->
              <template v-for="item in type.city">
                <div class="more" :key="item.Key" v-if="item.Key != '热门' && statusList.cityStatus">
                  <div class="moreTitle">{{ item.Key }}</div>
                  <el-checkbox-group v-model="CitySelection" @change="citySelect">
                    <el-checkbox :label="item.AbbreviationName" v-for="item in item.city_list" :key="item.code"></el-checkbox>
                  </el-checkbox-group>
                  <!--  -->
                </div>
              </template>
              <!-- 暂时注释~勿动 -->
              <!-- <template>
              <el-radio v-model="cityType" label="1">不限</el-radio>
              <el-radio v-model="cityType" label="2">医院周边</el-radio>
              <el-radio v-model="cityType" label="3">行政区</el-radio>
              <el-radio v-model="cityType" label="4">商业区</el-radio>
              <el-radio v-model="cityType" label="5">机场/车站</el-radio>
              <el-radio v-model="cityType" label="6">地铁周边</el-radio>
              <el-radio v-model="cityType" label="7">热门景点</el-radio>
              <el-radio v-model="cityType" label="8">展馆周边</el-radio>
            </template> -->
              <!--  -->
            </div>
            <div class="opt">
              <!-- <el-button
                :type="statusList.cityStatus ? 'warning' : 'success'"
                size="mini"
                @click="statusList.cityStatus = !statusList.cityStatus"
                >{{ statusList.cityStatus ? "收起" : "展开" }}</el-button
              > -->
              <el-button type="text" style="margin-left: 10px" @click="statusList.cityStatus = !statusList.cityStatus">
                {{ word }}
                <i :class="
                    statusList.cityStatus
                      ? 'el-icon-arrow-up '
                      : 'el-icon-arrow-down'
                  "></i>
              </el-button>
            </div>
          </div>
          <div class="item" v-if="type.sitetype">
            <div class="name">场地类型</div>
            <div class="context">
              <el-checkbox-group v-model="siteSelection_" @change="siteSelect_" class="ck_one">
                <el-checkbox label="不限"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="siteType_" @change="siteSelect">
                <el-checkbox :label="item.dictValue" v-for="item in type.sitetype" :key="item.dictKey"></el-checkbox>
              </el-checkbox-group>
              <!--  -->
            </div>
            <div class="opt"></div>
          </div>
          <div class="item" v-if="type.brand">
            <div class="name">酒店品牌</div>
            <div class="context">
              <el-checkbox-group v-model="trademark_" @change="trademarkSelect_" class="ck_one">
                <el-checkbox label="不限"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="trademark" @change="trademarkSelect">
                <el-checkbox :label="item.name" v-for="item in hotelTrademark" :key="item.id"></el-checkbox>
              </el-checkbox-group>
              <!--  -->
              <template v-for="item in letterBrand">
                <div class="more" :key="item.key" v-if="statusList.brandStatus">
                  <div class="moreItems">
                    <el-checkbox-group v-model="trademark" @change="trademarkSelect">
                      <el-checkbox :label="item.name" v-for="item in type.brand" :key="item.id"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </template>
            </div>
            <div class="opt">
              <!-- <el-button
                :type="statusList.brandStatus ? 'warning' : 'success'"
                size="mini"
                @click="statusList.brandStatus = !statusList.brandStatus"
                >{{ statusList.brandStatus ? "收起" : "展开" }}</el-button
              > -->
              <el-button type="text" style="margin-left: 10px" @click="statusList.brandStatus = !statusList.brandStatus">
                {{ word_ }}
                <i :class="
                    statusList.brandStatus
                      ? 'el-icon-arrow-up '
                      : 'el-icon-arrow-down'
                  "></i>
              </el-button>
            </div>
          </div>
          <div class="item" v-if="type.venuearea">
            <div class="name">会场面积</div>
            <div class="context">
              <template>
                <el-radio-group v-model="hotelArea" @change="areaSelect">
                  <el-radio label="不限">不限</el-radio>
                  <el-radio v-for="item in type.venuearea" :key="item.id" :label="item.name">{{ item.name }}</el-radio>
                </el-radio-group>
                <div style="margin-left: 7px; display: inline-block">
                  <el-input type="text" size="mini" style="width: 100px" v-model.number="listFormData.venue_min_area"></el-input>
                  ~
                  <el-input type="text" size="mini" style="width: 100px" v-model.number="listFormData.venue_max_area"></el-input>
                  <el-button size="small" type="primary" style="margin-left: 20px" @click="getList">确定</el-button>
                </div>
              </template>
            </div>
            <div class="opt"></div>
          </div>
          <div class="item">
            <div class="name">是否公司协议酒店</div>
            <div class="context">
              <el-radio-group v-model="agreement" @change="agreementSelect">
                <el-radio label="不限">不限</el-radio>
                <el-radio label="协议酒店">协议酒店</el-radio>
              </el-radio-group>
            </div>
            <div class="opt"></div>
          </div>

          <!-- <div class="moreSearch" v-show="showMoreSearch"> -->
          <!-- 会场人数 -->
          <!-- <div class="item" v-if="type.venuepeoplenumber && showMoreSearch">
            <div class="name">会场人数</div>
            <div class="context">
              <div
                class="item"
                :class="{
                  current:
                    listFormData.venue_min_people_number == null &&
                    listFormData.venue_max_people_number == null,
                }"
                @click="selectedvenue(null, null)"
              >
                不限
              </div>
              <div
                class="item"
                v-for="item in type.venuepeoplenumber"
                :key="item.id"
                :class="{
                  current:
                    listFormData.venue_min_people_number == item.minvalue &&
                    listFormData.venue_max_people_number == item.maxvalue,
                }"
                @click="selectedvenue(item.minvalue, item.maxvalue)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="opt"></div>
          </div> -->
          <!-- 团房均价 -->
          <!-- <div class="item" v-if="type.roomprice && showMoreSearch">
            <div class="name">团房均价</div>
            <div class="context">
              <div
                class="item"
                :class="{
                  current:
                    listFormData.room_min_avg_price == null &&
                    listFormData.room_max_avg_price == null,
                }"
                @click="selectedroom(null, null)"
              >
                不限
              </div>
              <div
                class="item"
                v-for="item in type.roomprice"
                :key="item.id"
                :class="{
                  current:
                    listFormData.room_min_avg_price == item.minvalue &&
                    listFormData.room_max_avg_price == item.maxvalue,
                }"
                @click="selectedroom(item.minvalue, item.maxvalue)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="opt"></div>
          </div> -->
          <!-- </div> -->

          <!-- <div class="optionMoreSearch" style="text-align:center">
          <span class="showMore" @click="showMoreSearch = !showMoreSearch">
            {{ showMoreSearch? '⩓ 收起':'⩔ 更多查询条件' }}
          </span>
          <span class="clearSearch" @click="clearSearchData">清空筛选条件</span>
        </div> -->
          <div class="optionMoreSearch" style="text-align: center">
            <span class="clearSearch" @click="clearSearchData">清空筛选条件</span>
          </div>
        </div>
      </div>
      <div class="botContext" v-show="exhibition" :style="!collectHotel ? 'display:inherit;' : ''">
        <div class="hotelList" :style="!collectHotel || !$route.params.id ? 'width:100%;' : ''">
          <div class="number">
            本次查询出 <span>{{ hotel.Counts }}</span> 条记录
          </div>

          <div class="list">
            <el-card class="box-card" v-for="item in hotel.List" :key="item.id">
              <div class="item" @mouseover="mapLook(item)" @mouseleave="mapLook_" @click.stop="jumpInfo(item)">
                <!-- <img :src="item.coverpicture" alt /> -->
                <!-- 轮播图位置 -->
                <div class="photograph">
                  <el-carousel trigger="click" height="205px">
                    <el-carousel-item>
                      <img class="title-img" :src="item.coverpicture" alt />
                      <!-- <img class="title-img" :src="item.coverpicture" alt /> -->
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="matter">
                  <p class="p_one">
                    <i v-if="item.sitetype_name == '五星级酒店'" class="el-icon-medal"></i>
                    {{ item.name }} <span> {{ item.sitetype_name }} </span>
                  </p>
                  <p class="p_two">地址:{{ item.address }}</p>
                  <div style="margin-bottom: 10px">
                    <el-tag size="small" v-for="item in item.fieldAddress" :key="item.id">item.name</el-tag>
                    <!-- <el-tag size="small">标签二 </el-tag>
                    <el-tag size="small">标签三 </el-tag>
                    <el-tag size="small">标签四 </el-tag> -->
                  </div>
                  <div class="div_one">
                    <p>
                      会议厅面积： {{ item.venue_min_area }} ~
                      {{ item.venue_max_area }}㎡
                    </p>
                    <p>会议厅数量： {{ item.venue_number }} 间</p>
                  </div>
                  <div class="div_two">
                    <p>
                      会议厅容量： {{ item.venue_min_people_number }} ~
                      {{ item.venue_max_people_number }} 人
                    </p>
                    <p>客房数量： {{ item.room_number }} 间</p>
                    <!-- <p>会场半天参考价：暂无</p>
                    <p>会员全天参考价：暂无</p> -->
                  </div>
                </div>
                <!-- <div class="center">
                  <div class="name" @click="jumpInfo(item.id)">
                    <i v-if="item.iscollection == 1" class="collection"></i>
                    <i v-else class="notcollection"></i>
                    {{ item.name }}
                  </div>
                  <div class="address">地址:{{ item.address }}</div>
                  <div class="other">
                    <p>
                      <span>场地类型:</span>
                      {{ item.sitetype_name }}
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
                  </div>
                </div> -->
                <div class="right">
                  <div class="top">
                    <!-- <div v-if="item.iscollection == 0"> -->
                    <i v-if="item.iscollection == 0" @click.stop="collection(item)" class="el-icon-star-off" :key="0"></i>
                    <el-button style="font-size: 15px; color: rgb(255, 148, 41)" v-if="item.iscollection == 0" type="text" @click.stop="collection(item)">收藏</el-button>
                    <!-- </div> -->
                    <!-- <div v-else> -->
                    <i v-if="item.iscollection == 1" @click.stop="cancelcollection(item)" class="el-icon-star-on" :key="1"></i>
                    <el-button style="font-size: 14px; color: rgb(255, 148, 41)" v-if="item.iscollection == 1" type="text" @click.stop="cancelcollection(item)">已收藏</el-button>
                    <!-- </div> -->
                    <!--  -->

                    <!--  -->
                  </div>
                  <div>
                    <div class="bottom" v-if="collectHotel && item.isblacklist != 1">
                      <el-button type="warning" v-if="
                          HotelSelectedList.findIndex(
                            (i) => i.hotelid == item.id
                          ) == -1
                        " @click.stop="selected(item)">加入询价单</el-button>
                      <el-button type="info" v-else @click.stop="selected(item)">取消询价单</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="item justify_between">
                <img :src="item.coverpicture" alt />
                <img :src="item.coverpicture" alt />
                <img :src="item.coverpicture" alt />
                <img :src="item.coverpicture" alt />
                <img :src="item.coverpicture" alt />
              </div> -->
            </el-card>
          </div>
          <el-pagination v-show="collectHotel" class="pagination" background layout="prev, pager, next" :total="hotel.Counts" @current-change="sizeChange"></el-pagination>
          <!--  -->
          <el-pagination v-show="!collectHotel" class="pagination" background layout="prev, pager, next" :total="hotel.Counts" @current-change="sizeChange_"></el-pagination>
          <!--  -->
        </div>
        <div class="right right-con">
          <div id="demo" v-show="collectHotel" style="position: relative; top: 0">
            <!-- <el-button type="warning">
            创见会议询价
            <br />Create RFP
          </el-button>-->
            <!-- 放地图预留 -->
            <div class="atlas">
              <!-- 地图位置 -->
              <div class="baiduMap">
                <div id="container" style="height: 100%; width: 100%" ref="allmap"></div>
              </div>
              <!-- <baidu-map
                class="baiduMap"
                :center="center"
                :zoom="zoom"
                @ready="handler"
              ></baidu-map> -->
            </div>
            <div class="selectedHotel">
              <div class="title">
                已选择目标酒店（<span>{{ HotelSelectedList.length }}</span>）
              </div>
              <div class="context">
                <div class="tips" v-if="HotelSelectedList.length == 0">
                  暂未选择目标酒店
                </div>
                <div class="item" v-for="item in HotelSelectedList" :key="`s${item.id}`">
                  <div class="hotelname">
                    <i class="badge"></i>
                    {{ item.hotelname }}
                  </div>
                  <i class="remove el-icon-close" @click="cancel(item)"></i>
                </div>
              </div>
              <div class="buttons">
                <el-button type="primary" style="width: 100%" @click="Inquiry" class="btn-c">提交询价清单</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 供应商新建酒店弹窗 -->
    <el-dialog :title="addTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" @close="closeDiv" :before-close="handleClose">
      <div v-if="editExhibition">
        <el-form :model="addHotelForm" :rules="rules" ref="addHotelForm" label-width="150px" class="demo-addHotelForm" v-show="!addHotelNextStep">
          <div>
            <el-form-item label="场地名称：" prop="name">
              <el-input v-model="addHotelForm.name" placeholder="请输入场地名称"></el-input>
            </el-form-item>
            <el-form-item label="场地品牌：" prop="resourcesBrandId">
              <el-select v-model="addHotelForm.resourcesBrandId" filterable placeholder="请选择场地品牌" style="width: 100%" @change="handleBrandChange">
                <el-option v-for="item in type.brand" :key="item.id" :label="item.shortName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市区域：" prop="area" class="cityArea">
              <el-cascader style="width: 100%" v-model="addHotelForm.area" :options="options" @change="handleCityChange" placeholder="请选择城市区域"></el-cascader>
            </el-form-item>
            <el-form-item label="场地类型：" prop="fieldTypeCode">
              <el-select v-model="addHotelForm.fieldTypeCode" placeholder="请选择场地类型" style="width: 100%" filterable @change="handleTypeChange">
                <el-option v-for="item in type.sitetype" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey" filterable>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="详细地址：" prop="fieldAddress">
              <el-input v-model="addHotelForm.fieldAddress" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <!-- 下一步 -->
        <el-form :model="addHotelNextForm" :rules="nextRules" ref="addHotelNextForm" label-width="150px" class="demo-addHotelForm" v-show="addHotelNextStep">
          <el-form-item label="姓名" prop="adminName">
            <el-input v-model="addHotelNextForm.adminName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="adminPhone">
            <el-input v-model="addHotelNextForm.adminPhone" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="adminEmail">
            <el-input v-model="addHotelNextForm.adminEmail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="名片" prop="fieldAddress">
            <!-- <el-input v-model="addHotelForm.name"  placeholder="请输入"></el-input> -->
            <el-upload class="avatar-uploader" :action="UploadFilesUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <i v-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <img v-if="imageUrl" :src="imageUrl" style="max-width: 300px" />
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-descriptions title="">
          <el-descriptions-item label="场地名称">{{
            rowHotelInfo.supplierName
          }}</el-descriptions-item>
          <el-descriptions-item label="供应商一级类型">{{
            rowHotelInfo.supplierOneName
          }}</el-descriptions-item>
          <el-descriptions-item label="供应商二级类型">{{
            rowHotelInfo.supplierTwoName
          }}</el-descriptions-item>
          <el-descriptions-item label="账期">{{
            rowHotelInfo.accountingPeriod
          }}</el-descriptions-item>
          <el-descriptions-item label="区域">{{
            rowHotelInfo.regin
          }}</el-descriptions-item>
          <el-descriptions-item label="酒店所属集团">{{
            rowHotelInfo.hotelGroupCompany
          }}</el-descriptions-item>
          <el-descriptions-item label="供应商状态">{{
            rowHotelInfo.supplierState
          }}</el-descriptions-item>
          <el-descriptions-item label="审核状态">{{
            rowHotelInfo.toExamineState
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <!--  -->
      <span v-if="editExhibition" slot="footer" class="dialog-footer">
        <el-button type="primary" v-show="!addHotelNextStep" @click="addNext()">
          下一步
        </el-button>
        <el-button v-show="addHotelNextStep" @click="addHotelNextStep = false">上一步
        </el-button>
        <el-button type="primary" v-show="addHotelNextStep" @click="perfect(), (dialogVisible = true)">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script  type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=zeIWZvTuFXvei4GPOWNy3jcMa4GC6sIa" ></script>
<script>
var map
let geoc = null
/**
 * @page 酒店列表
 */
import { MP } from '@/utils/map.js'
import qualificationAdded from '@/components/event/qualification-added.vue'
import { regionData } from 'element-china-area-data'
import { MAINHOST } from '@/config'
import { detectZoom } from '@/utils/detectZoom'
// 处理笔记本系统默认系统比例为150%带来的布局影响

const m = detectZoom()

document.body.style.zoom = 100 / Number(m)
export default {
  name: 'Qualification',
  components: { qualificationAdded },
  data() {
    return {
      imageUrl: '', // 上传名片图片地址
      UploadFilesUrl: MAINHOST + '/MeetingMa/UploadFiles',
      showMoreSearch: false, // 是否显示更多查询条件
      // type
      routeType: null,
      //city
      routeCity: null,
      // 已选择询价酒店列表
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
        meeting_id: this.$route.params.id,
        city: [],
        sitetype: [],
        brand: [],
        venue_min_area: null,
        venue_max_area: null,
        venue_min_people_number: null,
        venue_max_people_number: null,
        room_min_avg_price: null,
        room_max_avg_price: null,
        hotel_name: '',
        isagreement: false,
        iscollection: false,
        Page: 1,
        Rows: 10
      },
      listSearchFormData: {
        Page: 1,
        Rows: 10,
        Search: {
          cityCode: '', // 城市编码, 多选逗号隔开
          fieldTypeCode: '', // 场地类型编码
          resourcesBrandId: '', // 场地品牌ID
          fromHallArea: '', // 起始会场面积
          toHallArea: '', // 截止会场面积
          isCtgmProtocol: '' // 是否协议酒店
        }
      },
      // 酒店列表
      hotel: {
        Counts: 0,
        CurrentPage: 0,
        List: [],
        PageCount: 0
      },
      activeName: 'first',
      exhibition: true,
      formData: {
        organizationName: '',
        supplierName: '',
        supplierOneName: '',
        supplierTwoName: '',
        hotelGroupCompany: '',
        supplierState: [], //供应商状态
        supplierAttributes: [],
        accountingPeriod: '',
        toExamineState: [],
        regin: '',
        continent: '',
        province: '',
        city: '',
        starDate: '',
        endDate: '',
        page: 1,
        pageSize: 10
      },
      // cityArea:[], // 省市三级联动
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0
      },
      selectingData: [
        {
          value: 'one',
          label: '选项1'
        },
        {
          value: 'two',
          label: '选项2'
        }
      ],
      tableData: [
        {
          supplierId: '测试',
          supplierName: '测试',
          financeYard: '测试',
          supplierTypeOne: '测试',
          supplierTypeTwo: '测试',
          supplierProperty: '测试',
          paymentDays: '测试',
          applicant: '测试',
          financeYard: '测试',
          hotelGroup: '测试',
          supplierStatus: '测试',
          approvalStatus: '测试'
        },
        {
          supplierId: '测试2',
          supplierName: '测试2',
          financeYard: '测试2',
          supplierTypeOne: '测试2',
          supplierTypeTwo: '测试2',
          supplierProperty: '测试2',
          paymentDays: '测试2',
          applicant: '测试2',
          financeYard: '测试2',
          hotelGroup: '测试2',
          supplierStatus: '测试2',
          approvalStatus: '测试2'
        },
        {
          supplierId: '测试3',
          supplierName: '测试3',
          financeYard: '测试3',
          supplierTypeOne: '测试3',
          supplierTypeTwo: '测试3',
          supplierProperty: '测试3',
          paymentDays: '测试3',
          applicant: '测试3',
          financeYard: '测试3',
          hotelGroup: '测试3',
          supplierStatus: '测试3',
          approvalStatus: '测试3'
        },
        {
          supplierId: '测试4',
          supplierName: '测试4',
          financeYard: '测试4',
          supplierTypeOne: '测试4',
          supplierTypeTwo: '测试4',
          supplierProperty: '测试4',
          paymentDays: '测试4',
          applicant: '测试4',
          financeYard: '测试4',
          hotelGroup: '测试4',
          supplierStatus: '测试4',
          approvalStatus: '测试4'
        },
        {
          supplierId: '测试5',
          supplierName: '测试5',
          financeYard: '测试5',
          supplierTypeOne: '测试5',
          supplierTypeTwo: '测试5',
          supplierProperty: '测试5',
          paymentDays: '测试5',
          applicant: '测试5',
          financeYard: '测试5',
          hotelGroup: '测试5',
          supplierStatus: '测试5',
          approvalStatus: '测试5'
        }
      ],
      currentPage: 1,
      dialogVisible: false,
      addTitle: '新建酒店',
      rowHotelInfo: {}, // 查看酒店详情信息
      // 新建酒店表表单
      addHotelForm: {
        name: '', // 场地名称
        resourcesBrandName: '', // 场地品牌
        resourcesBrandId: '', // 场地品牌ID
        fieldType: '', // 场地类型
        fieldTypeCode: '', // 场地类型编码
        provinceName: '', // 省名称
        provinceCode: '', // 省编码
        cityCode: '', // 市编码
        cityName: '', // 市名称
        cityArea: '', // 区域
        area: [],
        fieldAddress: '' // 详细地址
      },
      addHotelNextForm: {
        adminName: '', // 管理员姓名
        adminPhone: '', // 管理员电话
        adminEmail: '', // 管理员邮箱
        adminCard: '' // 名片上传图片地址
      },
      addHotelNextStep: false, // 新增酒店下一步
      rules: {
        name: [{ required: true, message: '请输入场地名称', trigger: 'blur' }],
        resourcesBrandId: [{ required: true, message: '请选择场地品牌', trigger: 'change' }],
        area: [{ required: true, message: '请选择城市区域', trigger: 'change' }],
        fieldTypeCode: [{ required: true, message: '请选择场地类型', trigger: 'change' }],
        fieldAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      nextRules: {
        adminName: [{ required: true, message: '请输入管理员姓名' }],
        adminPhone: [{ required: true, message: '请输入管理员电话' }],
        adminEmail: [{ required: true, message: '请输入管理员邮箱' }]
      },
      editExhibition: true,
      //
      options: regionData,
      //
      CitySelection: [],
      CitySelection_: ['不限'],
      siteSelection_: ['不限'],
      cityType: '1',
      siteType_: [],
      trademark: [],
      trademark_: ['不限'],
      hotelArea: '不限',
      agreement: '不限',
      hotelTrademark: [],
      collectHotel: true,
      // 百度地图
      center: { lng: 0, lat: 0 },
      zoom: 3,
      //
      dialogMap: false,
      mapPointName: '',
      mapGetshow: true,
      place: '天安门',
      flag: true,
      screenHeight: document.body.clientHeight, // 获取页面高度
      collectPage: 1, //我收藏的酒店分页
      resourceFlag: false //判断是否为场地资源进来的
    }
  },
  computed: {
    // 字母分类酒店品牌
    letterBrand() {
      let data = []
      let filtersName = [
        'A,B,C'
        // "D,E,F",
        // "G,H,I",
        // "G,K,L",
        // "M,N,O",
        // "P,Q,X",
        // "Y,Z",
      ]
      filtersName.forEach(item => {
        let key = item.replace(',/g', '')
        // debugger;
        data.push({
          key,
          list: this.type.brand
        })
      })
      return data
    },
    word: function() {
      if (this.statusList.cityStatus == false) {
        //对文字进行处理
        return '展开'
      } else {
        return '收起'
      }
    },
    word_: function() {
      if (this.statusList.brandStatus == false) {
        //对文字进行处理
        return '展开'
      } else {
        return '收起'
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // debugger
      this.addHotelNextForm.adminCard = res.weburl
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG,JPEG,PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },

    // 新建酒店下一步
    addNext() {
      this.$refs['addHotelForm'].validate(valid => {
        console.log(this.addHotelForm)
        if (valid) {
          this.addHotelNextStep = true
        }
      })
    },
    // 查询供应商库列表
    examineBtn(type) {
      if (type) {
        this.formData.page = 1
      }
      this.requestApi({
        url: '/DataSynchro/SupplierList',
        method: 'post',
        data: this.formData
      }).then(res => {
        if (res) {
          this.tableData = res.EventModels ? res.EventModels : []
          this.pageInfo = res.pageInfo
        }
      })
    },
    resetBtn() {
      this.formData = {
        organizationName: '',
        supplierName: '',
        supplierOneName: '',
        supplierTwoName: '',
        hotelGroupCompany: '',
        supplierState: [],
        supplierAttributes: [],
        accountingPeriod: '',
        toExamineState: [],
        regin: '',
        continent: '',
        province: '',
        city: '',
        starDate: '',
        endDate: '',
        page: 1,
        pageSize: 10
      }
      this.examineBtn()
    },
    Inquiry() {
      if (this.resourceFlag == false) {
        var type = 0
        if (this.$route.params.type == 'addintentionhotel') {
          type = 2
          this.requestApi({
            url: '/procurementprocess/Selectintentionhotel',
            method: 'post',
            data: { hotel: this.HotelSelectedList }
          }).then(res => {
            // this.$router.push({
            //   name: "ServiceProviderProcurement",
            //   params: { id: this.$route.params.id },
            // });
          })
        } else {
          type = 1
          if (this.HotelSelectedList.length === 0) {
            this.$message({ message: '至少选择一家酒店', type: 'warning' })
            return
          }
          this.requestApi({
            url: '/procurementprocess/selecthotel',
            method: 'post',
            data: { hotel: this.HotelSelectedList }
          }).then(res => {
            // this.$router.push({
            //   name: "HotelProcurement",
            //   params: { id: this.$route.params.id },
            // });
          })
        }
        this.$router.push({
          name: 'HotelProcurement',
          params: { id: this.$route.params.id, type }
        })
      } else {
        //         debugger
        if (this.HotelSelectedList.length === 0) {
          this.$message({ message: '至少选择一家酒店', type: 'warning' })
          return
        }
        this.$router.push({
          name: 'CreateEvent',
          params: { id: this.$route.params.id, hotel: this.HotelSelectedList }
        })
        console.log(this.HotelSelectedList)
      }
    },
    cancel(item) {
      let index = this.HotelSelectedList.findIndex(i => i.hotelid == item.hotelid)
      if (index > -1) {
        this.HotelSelectedList.splice(index, 1)
      }
    },
    selected(item) {
      console.log(item)
      let index = this.HotelSelectedList.findIndex(i => i.hotelid == item.id)
      if (index == -1) {
        this.HotelSelectedList.push({
          hotelid: item.id,
          hotelname: item.name,
          hotel_address: item.address,
          hotelemail: item.email,
          hotelecontacts: item.contacts,
          hoteletelephone: item.telephone,
          hotel_pic: item.coverpicture,
          agreement_hotel: item.protocol_hotel,
          sendemail: true,
          receptionist: {
            id: item.receptionist_id,
            contacts: item.receptionist_contacts,
            telephone: item.receptionist_telephone,
            email: item.receptionist_email
          },
          master_data: item.master_data,
          business_license_no: item.business_license_no,
          social_credit_no: item.social_credit_no
        })
      } else {
        this.HotelSelectedList.splice(index, 1)
      }
    },
    jumpInfo(item) {
      // debugger;
      console.log(item)
      // this.$router.push({ name: "hotelInfo", params: { id } });
      sessionStorage.setItem('hotelName', item.name)
      let routeData = this.$router.resolve({
        name: 'hotelInfo',
        params: {
          id: item.id
        }
      })
      window.open(routeData.href, '_blank') //跳转新页面
    },

    // 获取酒店列表
    getList() {
      // debugger
      // coco
      if (this.collectHotel) {
        this.requestApi({
          url: '/hotel/list',
          method: 'post',
          data: this.listFormData
        }).then(res => {
          this.hotel = res
        })
      } else {
        let params = {
          meeting_id: this.$route.params.id,
          Page: this.collectPage,
          Rows: 10
        }
        this.requestApi({
          url: '/hotel/QueryCollection',
          method: 'post',
          data: params
        }).then(res => {
          this.hotel = res
        })
      }
    },

    // 切换分页
    sizeChange(value) {
      console.log(value)
      this.listFormData.Page = value
      this.getList()
    },
    // 我收藏的酒店
    sizeChange_(value) {
      console.log(value)
      this.collectPage = value
      this.getList()
    },
    // 选择城市
    selectedCity(code) {
      // debugger;
      console.log(code)
      if (code) {
        if (this.listFormData.city.findIndex(item => item.code === code) == -1) this.listFormData.city.push({ code })
        else this.listFormData.city = this.listFormData.city.filter(item => item.code != code)
      } else this.listFormData.city = []
      this.listFormData.Page = 1
      this.listSearchFormData.Page = 1
      this.listSearchFormData.Search.cityCode = this.listFormData.city.join(',')
      this.getList()
    },
    selectedsitetype(dictKey) {
      //this.listFormData.sitetype = [{ code }];
      if (dictKey) {
        if (this.listFormData.sitetype.findIndex(item => item.code === dictKey) == -1) this.listFormData.sitetype.push({ code: dictKey })
        else this.listFormData.sitetype = this.listFormData.sitetype.filter(item => item.code != dictKey)
      } else this.listFormData.sitetype = []
      this.listFormData.Page = 1
      this.getList()
    },

    // 选择酒店品牌
    selectedbrand(id) {
      //this.listFormData.brand = [{ id }];
      if (id) {
        if (this.listFormData.brand.findIndex(item => item.id === id) == -1) this.listFormData.brand.push({ id })
        else this.listFormData.brand = this.listFormData.brand.filter(item => item.id != id)
      } else this.listFormData.brand = []
      this.listFormData.Page = 1
      this.getList()
    },
    // 选择面积范围
    selectedarea(min, max) {
      this.listFormData.venue_min_area = min
      this.listFormData.venue_max_area = max
      this.listFormData.Page = 1
      this.getList()
    },
    // 选择会场人数
    selectedvenue(min, max) {
      this.listFormData.venue_min_people_number = min
      this.listFormData.venue_max_people_number = max
      this.listFormData.Page = 1
      this.getList()
    },
    // 选择团房均价
    selectedroom(min, max) {
      this.listFormData.room_min_avg_price = min
      this.listFormData.room_max_avg_price = max
      this.listFormData.Page = 1
      this.getList()
    },
    // 所有酒店
    searchall() {
      this.listFormData.isagreement = false
      this.listFormData.iscollection = false
      this.listFormData.Page = 1
      this.getList()
    },
    // 查询协议酒店
    searchagreement(isagreement) {
      this.listFormData.isagreement = isagreement
      this.listFormData.Page = 1
      this.getList()
    },
    // 查询收藏酒店
    searchcollection() {
      this.listFormData.isagreement = false
      this.listFormData.iscollection = true
      this.listFormData.Page = 1
      this.getList()
    },
    // 收藏酒店
    collection(item) {
      this.requestApi({
        url: '/hotel/Collection',
        method: 'post',
        data: { id: item.id }
      }).then(res => {
        this.$message({
          message: '收藏成功',
          type: 'success'
        })
        item.iscollection = 1
        if (this.listFormData.iscollection) {
          this.listFormData.Page = 1
          this.getList()
        }
      })
    },
    // 取消酒店收藏
    cancelcollection(item) {
      this.requestApi({
        url: '/hotel/cancelcollection',
        method: 'post',
        data: { id: item.id }
      }).then(res => {
        this.$message({
          message: '取消收藏成功',
          type: 'warning'
        })
        item.iscollection = 0
        if (this.listFormData.iscollection) {
          this.listFormData.Page = 1
          this.getList()
        }
      })
    },
    handleClick(tab, event) {
      this.collectPage = 1
      if (tab.name == 'first') {
        this.collectHotel = true
        if (!this.$route.params.id) {
          this.resourceFlag = true
        }
        this.exhibition = true
        this.listFormData.isagreement = false
        this.listFormData.iscollection = false
        this.listFormData.Page = 1
        this.getList()
      } else if (tab.name == 'second') {
        this.collectHotel = true
        this.exhibition = true
        this.listFormData.isagreement = true
        this.listFormData.iscollection = false
        this.listFormData.Page = 1
        this.getList()
      } else if (tab.name == 'third') {
        this.collectHotel = false
        this.resourceFlag = false
        this.exhibition = true
        this.listFormData.isagreement = false
        this.listFormData.iscollection = true
        this.listFormData.Page = 1
        // coco
        console.log(this.$route)
        this.getList()
      } else if (tab.name == 'fourth') {
        // 切换供应商库页签
        this.collectHotel = false
        this.resourceFlag = false
        console.log(12345)
        this.exhibition = false
        this.examineBtn()
      }
      console.log(tab, event)
      this.mapNameChange()
    },
    Choose(val) {
      console.log(val, this.formData)
    },

    // 查看供应商详情
    handleExamine(row) {
      console.log(row)
      this.editExhibition = false
      this.dialogVisible = true
      this.addTitle = '酒店详情'
      this.rowHotelInfo = row
    },

    // 新建酒店
    addHote(type, rowData) {
      this.editExhibition = true
      this.dialogVisible = true
      this.addHotelNextStep = false
      if (type == 0) {
        this.addTitle = '新建酒店'
        this.addHotelForm.name = ''
        this.addHotelForm.fieldAddress = ''
        // this.addHotelFormInit();
      } else if (type == 1) {
        this.addTitle = '一键生成酒店'
        this.addHotelForm.name = rowData.supplierName
        this.addHotelForm.fieldAddress = rowData.address
        console.log(this.addHotelForm, rowData)
      }
    },
    addHotelFormInit() {
      this.addHotelForm = {
        name: '', // 场地名称
        resourcesBrandName: '', // 场地品牌
        resourcesBrandId: '', // 场地品牌ID
        fieldType: '', // 场地类型
        fieldTypeCode: '', // 场地类型编码
        provinceName: '', // 省名称
        provinceCode: '', // 省编码
        cityCode: '', // 市编码
        cityName: '', // 市名称
        cityArea: '', // 区域
        area: [],
        fieldAddress: '' // 详细地址
      }
      this.addHotelNextForm = {
        adminName: '', // 管理员姓名
        adminPhone: '', // 管理员电话
        adminEmail: '', // 管理员邮箱
        adminCard: '' // 名片上传图片地址
      }
    },
    closeDiv() {
      this.imageUrl = ''
      this.addHotelForm.name = ''
      this.addHotelForm.fieldAddress = ''
      this.$refs['addHotelForm'].resetFields()
      this.$refs['addHotelNextForm'].resetFields()
    },
    handleClose(done) {
      done()
    },
    // 清空筛选条件
    clearSearchData() {
      this.listFormData = {
        meeting_id: this.$route.params.id,
        city: [],
        sitetype: [],
        brand: [],
        venue_min_area: null,
        venue_max_area: null,
        venue_min_people_number: null,
        venue_max_people_number: null,
        room_min_avg_price: null,
        room_max_avg_price: null,
        hotel_name: '',
        isagreement: false,
        iscollection: false,
        Page: 1,
        Rows: 10
      }
      ;(this.CitySelection_ = ['不限']),
        (this.siteSelection_ = ['不限']),
        (this.trademark_ = ['不限']),
        (this.agreement = '不限'),
        //
        (this.CitySelection = []),
        (this.siteType_ = []),
        (this.trademark = []),
        (this.hotelArea = '不限')
      this.getList()
    },
    //
    perfect() {
      // 表单提交前预验证
      this.$refs.addHotelForm.validate(valid => {
        if (valid) {
          // 验证下一步表单
          this.$refs.addHotelNextForm.validate(valid2 => {
            if (valid2) {
              let params = {
                ...this.addHotelForm,
                ...this.addHotelNextForm
              }
              this.requestApi({
                url: '/ResourcesApi/Taxpayers',
                method: 'post',
                data: params
              }).then(res => {
                console.log(res)
                if (res) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.dialogVisible = false
                } else {
                  this.$message({
                    message: '提交失败',
                    type: 'error'
                  })
                }
              })
            }
          })
        } else {
          // 表单验证错误
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择城市区域
    handleCityChange(cityArr) {
      console.log(cityArr)
      console.log(this.options)
      // 省
      let province = this.options.find(item => item.value == cityArr[0])
      this.addHotelForm.provinceCode = cityArr[0]
      this.addHotelForm.provinceName = province.label
      // 市
      let city = province.children.find(item => item.value == cityArr[1])
      this.addHotelForm.cityCode = cityArr[1]
      this.addHotelForm.cityName = city.label
      // 县
      let cityArea = city.children.find(item => item.value == cityArr[2])
      // this.addHotelForm.cityArea = cityArr[2]
      this.addHotelForm.cityArea = cityArea.label
    },
    handleBrandChange(brand) {
      let brandInfo = this.type.brand.find(item => item.id == brand)
      this.addHotelForm.resourcesBrandName = brandInfo.shortName
    },
    handleTypeChange(type) {
      let typeInfo = this.type.sitetype.find(item => item.dictKey == type)
      this.addHotelForm.fieldType = typeInfo.dictValue
    },
    distributorSizeChange(value) {
      console.log(value)
      this.formData.page = value
      this.examineBtn()
    },
    getDistributorList() {
      // this.$api.hotelList(this.listFormData, "POST").then((res) => {
      //   this.hotel = res;
      // });
    },
    changeEventDate(date) {
      this.formData.starDate = this.formatDate('YYYY-mm-dd', date[0]) ? this.formatDate('YYYY-mm-dd', date[0]) : ''
      this.formData.endDate = this.formatDate('YYYY-mm-dd', date[1]) ? this.formatDate('YYYY-mm-dd', date[1]) : ''
    },
    // citySelect(val) {
    //   console.log(val);
    //   this.CitySelection_ = [];
    //   console.log(this.type.city, "-------");
    //   let isHanList = [];
    //   for (let i = 0; i < this.type.city.length; i++) {
    //     for (let j = 0; j < this.type.city[i].city_list.length; j++) {
    //       isHanList = this.CitySelection.map((item) => {
    //         // debugger;
    //         if (item === this.type.city[i].city_list[j].AbbreviationName) {
    //           return (item = this.type.city[i].city_list[j].code);
    //         }
    //       });
    //     }
    //   }
    //   console.log(isHanList, "hkz");
    // },
    selectedCity_(code, val) {
      // debugger;
      console.log(code)
      if (code) {
        let arr = []
        if (code instanceof Array == true) {
          for (let i = 0; i < code.length; i++) {
            let obj = {
              code: code[i],
              name: val[i]
            }
            arr.push(obj)
          }
        } else {
          // debugger;
          //
          let selectedCityCode = []
          for (let i = 0; i < this.type.city.length; i++) {
            this.type.city[i].city_list.forEach(item => {
              // debugger
              if (item.code == code) {
                selectedCityCode.push(item.AbbreviationName)
              }
            })
          }
          //
          this.CitySelection = selectedCityCode
          this.CitySelection_ = []
          let obj = {
            code: code,
            name: selectedCityCode[0]
          }
          arr.push(obj)
        }
        this.listFormData.city = arr
      } else this.listFormData.city = []
      this.listFormData.Page = 1
      this.listSearchFormData.Page = 1
      this.listSearchFormData.Search.cityCode = this.listFormData.city.join(',')
      // debugger
      if (!code instanceof Array) {
        this.getList()
      } else {
        this.getList()
      }
    },
    selectedsitetype_(dictKey) {
      //this.listFormData.sitetype = [{ code }];
      if (dictKey) {
        let arr = []
        for (let i = 0; i < dictKey.length; i++) {
          let obj = {
            code: dictKey[i]
          }
          arr.push(obj)
        }
        this.listFormData.sitetype = arr
      } else this.listFormData.sitetype = []
      this.listFormData.Page = 1
      this.getList()
    },
    //
    citySelect(val) {
      console.log(val)
      console.log(this.type.city, '-------')
      if (this.CitySelection.length > 0) {
        this.CitySelection_ = []
      } else {
        this.CitySelection_ = ['不限']
      }
      let isHanList = []
      let selectedCityCode = []
      this.CitySelection.forEach(selectedCity => {
        for (let i = 0; i < this.type.city.length; i++) {
          this.type.city[i].city_list.forEach(item => {
            // debugger
            if (item.AbbreviationName == selectedCity) {
              selectedCityCode.push(item.code)
            }
          })
        }
      })
      console.log(isHanList, 'hkz')
      console.log([...new Set(selectedCityCode)], 'hkz')
      this.selectedCity_([...new Set(selectedCityCode)], val)
    },
    citySelect_(val) {
      console.log(val)
      this.CitySelection = []
      this.selectedCity_()
    },
    siteSelect(val) {
      this.siteSelection_ = []
      console.log(this.type.sitetype, val)
      let selectedCityCode = []
      this.siteType_.forEach(item => {
        for (let i = 0; i < this.type.sitetype.length; i++) {
          // this.type.sitetype[i].city_list.forEach((item) => {
          // debugger
          if (item == this.type.sitetype[i].dictValue) {
            selectedCityCode.push(this.type.sitetype[i].dictKey)
          }
          // });
        }
      })
      // console.log(isHanList, "hkz");
      console.log([...new Set(selectedCityCode)], 'hkz---')
      this.selectedsitetype_([...new Set(selectedCityCode)])
    },
    siteSelect_(val) {
      console.log(val)
      this.siteType_ = []
      this.selectedsitetype_()
    },
    // 选择酒店品牌
    selectedbrand_(id) {
      // debugger;
      console.log(id)
      if (id) {
        let arr = []
        for (let i = 0; i < id.length; i++) {
          let obj = {
            id: id[i]
          }
          arr.push(obj)
        }
        this.listFormData.brand = arr
      } else this.listFormData.brand = []
      this.listFormData.Page = 1
      this.getList()
    },
    trademarkSelect(val) {
      //
      console.log(this.type.brand, val)
      this.trademark_ = []

      let selectedCityCode = []
      this.trademark.forEach(item => {
        for (let i = 0; i < this.type.brand.length; i++) {
          if (item == this.type.brand[i].name) {
            selectedCityCode.push(this.type.brand[i].id)
          }
        }
      })
      console.log([...new Set(selectedCityCode)], 'hkz---')
      this.selectedbrand_([...new Set(selectedCityCode)])
    },
    trademarkSelect_(val) {
      console.log(this.type.brand, val)
      this.trademark = []
      this.selectedbrand_()
    },
    // 选择面积范围
    selectedarea_(min, max) {
      this.listFormData.venue_min_area = min
      this.listFormData.venue_max_area = max
      this.listFormData.Page = 1
      this.getList()
    },
    areaSelect(val) {
      console.log(val)
      let max = ''
      let min = ''
      if (val == '不限') {
        max = ''
        min = ''
      } else {
        for (let i = 0; i < this.type.venuearea.length; i++) {
          if (val == this.type.venuearea[i].name) {
            max = this.type.venuearea[i].maxvalue
            min = this.type.venuearea[i].minvalue
          }
        }
      }
      console.log(max, min, 'hkz---')
      this.selectedarea_(min, max)
    },
    agreementSelect(val) {
      if (val == '不限') {
        this.searchagreement(false)
      } else {
        this.searchagreement(true)
      }
      console.log(val)
    },
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    mapLook(item) {
      if (this.flag) {
        this.place = item.name
        this.mapNameChange()
      }
      this.flag = false
      // console.log(item);
    },
    mapLook_() {
      this.flag = true
    },
    mapNameChange() {
      // debugger
      let that = this,
        point,
        marker = null
      let local = new BMap.LocalSearch(map, {
        renderOptions: { map: map },
        onSearchComplete: res => {
          if (local.getResults() != undefined) {
            map.clearOverlays() //清除地图上所有覆盖物
            if (local.getResults().getPoi(0)) {
              point = local.getResults().getPoi(0).point //获取第一个智能搜索的结果
              map.centerAndZoom(point, 10)
              marker = new BMap.Marker(point) // 创建标注
              map.addOverlay(marker) // 将标注添加到地图中
              marker.enableDragging() // 可拖拽
              geoc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents
                that.mapPointName = addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber
              })
            } else {
              console.log('未搜索到结果')
            }
          } else {
            alert('未搜索到结果')
          }
        }
      })
      local.search(this.place) //要展示的地点
    }
  },
  mounted() {
    console.log(this.$route)
    // debugger
    if (!this.$route.params.id) {
      this.resourceFlag = true
      this.getList()
    } else {
      // debugger;
    }
    // window.addEventListener("scroll", function (e) {
    //   let scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   console.log(
    //     "div的top：",
    //     document.getElementById("demo").style.top,
    //     "window的top：",
    //     window.pageYOffset,
    //     "body的：",
    //     scrollTop
    //   );
    //   if (window.pageYOffset >= 500) {
    //     document.getElementById("demo").style.top =
    //       window.pageYOffset - 500 + "px";
    //   }
    //   if (window.pageYOffset <= 0) {
    //     document.getElementById("demo").style.top = 0 + "px";
    //   }
    // });

    this.$nextTick(function() {
      var _this = this
      MP(_this.ak).then(BMap => {
        let that = this
        this.dialogMap = !this.dialogMap
        if (that.mapGetshow) {
          map = new BMap.Map('container') //存放地图容器的id
          geoc = new BMap.Geocoder()
          map.enableScrollWheelZoom()
        }
        _this.mapNameChange() //调用定位地点的方法
      })
    })
    //addhotel 酒店采购
    //addintentionhotel 服务商包含酒店采购 意向采购
    this.routeType = this.$route.params.type
    if (this.routeType == 'addhotel') {
      this.requestApi({
        url: '/procurementprocess/getselecthotel',
        method: 'post',
        data: {}
      }).then(res => {
        if (res.length > 0) this.HotelSelectedList = res
        else this.HotelSelectedList = []
      })
    } else {
      this.requestApi({
        url: '/procurementprocess/getselectintentionhotel',
        method: 'post',
        data: {}
      }).then(res => {
        debugger
        if (res.length > 0) this.HotelSelectedList = res
        else this.HotelSelectedList = []
      })
    }

    this.getDistributorList()
    this.requestApi({
      url: '/serviceprovider/city',
      method: 'post',
      data: {}
    })
      .then(res => {
        this.type.city = res.city
        //
        this.routeCity = this.$route.params.city
        if (this.routeCity) {
          this.selectedCity_(this.routeCity)
        } else {
          this.getList()
        }
        //
        return this.requestApi({
          url: '/ResourcesApi/GetDictionaries',
          method: 'post',
          data: { alias: 'ResourcesType' }
        })
      })
      .then(res => {
        this.type.sitetype = res
        return this.requestApi({
          url: '/ResourcesApi/GetBrand',
          method: 'post',
          data: { shortName: '', name: '' }
        })
      })
      .then(res => {
        console.log(res.length)
        if (res.length >= 9) {
          for (let i = 0; i < 9; i++) {
            this.hotelTrademark.push(res[i])
          }
        } else {
          this.hotelTrademark = res
        }
        // debugger;
        this.type.brand = res
        return this.requestApi({
          url: '/hotel/venuearea',
          method: 'post',
          data: {}
        })
      })
      .then(res => {
        this.type.venuearea = res
        return this.requestApi({
          url: '/hotel/venuepeoplenumber',
          method: 'post',
          data: {}
        })
      })
      .then(res => {
        this.type.venuepeoplenumber = res
        return this.requestApi({
          url: '/hotel/roomprice',
          method: 'post',
          data: {}
        })
      })
      .then(res => {
        this.type.roomprice = res
      })
  }
}
</script>

<style lang="scss" scoped>
.hotleIndex {
  .section {
    width: 1230px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .search {
    // width: 1400px;
    text-align: center;
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
      // position: fixed;
      top: 35px;
      right: -8px;
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
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    > .item {
      // border-bottom: 1px solid #ccc;
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
        min-width: 50px;
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
    .optionMoreSearch {
      text-align: center;
      // line-height: 35px;
      .showMore {
        margin: 0 20px;
        color: #3a8ee6;
        cursor: pointer;
      }
      .clearSearch {
        color: #666;
        cursor: pointer;
        margin-left: 50px;
      }
      .clearSearch:hover {
        color: #3a8ee6;
      }
    }
  }
  .botContext {
    display: flex;
    margin-top: 15px;

    .hotelList {
      // flex: 1;
      width: 75%;
      margin-right: 15px;
      // border: 1px solid #eaecf3;
      // box-sizing: border-box;
      .number {
        line-height: 40px;
        padding: 0 15px;
        box-sizing: border-box;
        color: #666666;
        // background-color: #f7f7f7;
        span {
          color: #409eff;
        }
      }
      .clear {
        width: 80%;
        text-align: center;

        span {
          cursor: pointer;
          color: #666;
        }
        span:hover {
          color: #409eff;
        }
      }

      .list {
        padding: 0 15px;
        box-sizing: border-box;
        margin-top: 15px;
        .box-card {
          margin: 5px 0;
          min-height: 205px;
        }
        .box-card:hover {
          cursor: pointer;
          /* transform属性 */
          transform: translate(-3px, -3px);
          /* 第一个参数指定X轴的位移量,必填, 第二个参数指定Y轴的位移量,不必填 默认0*/
        }
        .item {
          display: flex;
          // padding: 15px 0;
          border-bottom: 1px solid #eaecf3;
          &:last-child {
            border: 0;
          }
          &:first-child {
            padding-top: 0;
          }
          img {
            // width: 130px;
            // height: 130px;
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
            font-size: 15px;
            color: rgb(255, 148, 41);
          }
        }
      }
      .pagination {
        margin-bottom: 15px;
      }
    }
  }
}
.avatar-uploader {
  width: 120px;
  ::deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.selectedHotel {
  width: 100%;
  border: 1px solid #eaecf3;
  box-sizing: border-box;
  margin-top: 30px;
  .title {
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    background-color: #ffffff;
    padding: 15px;
    box-sizing: border-box;
    span {
      color: #409eff;
    }
  }
  .context {
    padding: 0 15px;
    min-height: 100px;
    .tips {
      text-align: center;
      line-height: 80px;
    }
    .item {
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid #eaecf3;
      .hotelname {
        font-size: 14px;
        color: #333333;
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
.supplierBase {
  width: 100%;
  // height: 320px;
  // border: 1px solid red;
}
//
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.elipt {
  width: 60%;
}
.sp_one {
  margin-left: 42px;
}
.sp_two {
  margin-left: 40px;
}
.sp_three {
  margin-left: 70px;
}
.sp_five {
  margin-left: 12px;
}
.sp_sex {
  margin-left: 57px;
}
.sp_seven {
  font-size: 14px;
  margin-left: 28px;
}
.sp_eight {
  font-size: 14px;
  margin-left: 42px;
}
.sp_nine {
  font-size: 14px;
}
// .sp_ten {
// }
.sp_eleven {
  margin-left: 15px;
}
.sp_twelve {
  margin-left: 88px;
}
.sp_thirteen {
  font-size: 14px;
  margin-left: 42px;
}
.search {
  // margin-left: 533px;
}
.content {
  width: 100%;
  margin-top: 40px;
  // border: 1px solid red;
}
.addHote {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.cityArea {
  width: 100%;
}
.el-cascader-panel {
  height: 350px;
}
//
.seachInp {
  margin-right: 5px;
  float: left;
  width: 70%;
}
.ck_one {
  float: left;
  margin-right: 30px;
}
.atlas {
  width: 100%;
  height: 275px;
  // background: lightblue;
  // border: 1px solid #333333;
  margin-bottom: 8px;
}
.right-con {
  width: 30%;
  margin-top: 55px;
}
.btn-c {
  height: 56px;
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}
.photograph {
  width: 40%;
  min-height: 205px;
  margin-right: 15px;
  // background-color: lavenderblush;
}
.matter {
  width: 50%;
  min-height: 205px;
  // background-color: navajowhite;
  margin-right: 5px;
}
.p_one {
  margin-left: 5px;
  font-size: 20px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #333333;
  span {
    color: #ff9429;
    font-size: 12px;
  }
}
.p_two {
  display: block;
  margin: 10px 5px;
  font-size: 14px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #666666;
}
.el-tag--small {
  margin-left: 5px;
}
.div_one {
  width: 48%;
  margin-left: 5px;
  // background-color: red;
  float: left;
  min-height: 136px;
  p {
    margin-top: 10px;
    font-size: 14px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
  }
}
.div_two {
  width: 48%;
  // background-color: blue;
  float: left;
  min-height: 136px;
  p {
    margin-top: 10px;
    font-size: 14px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
  }
}
// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
.title-img {
  width: 100%;
  // height: 100%;
}
.el-icon-medal {
  color: #ff9429;
}
.baiduMap {
  width: 100%;
  height: 100%;
}
.el-radio {
  margin-right: 10px;
}
::deep.el-tabs__nav-wrap::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #e4e7ed;
  z-index: 1;
}
#demo {
  transition: all 500ms ease, top 1s ease;
}
</style>
