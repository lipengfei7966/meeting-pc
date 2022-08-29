<template>
  <div>
    <div class="content">
      <div class="approval-box" style="overflow-y: auto;height: 512px;">
        <div class="approval-title approval-title-no-line clearfix">
          <label style=" float: left; margin-left: 50px; margin-top: 30px;cursor: pointer;">
            <input type="checkbox" name="select-all" @click="selectAll($event)" />全选
          </label>
          <span>
            <el-select v-model="listValue" filterable placeholder="请选择" @change="GetDepartmentyMeeting">
              <el-option v-for="item in nameList" :key="item.value" :label="item.shortname" :value="item.id">
              </el-option>
            </el-select>
          </span>
          <div class="approval-header-a select-group" data-user-type="biller" data-title="指派合规人员">
            <!-- @click="outerVisible = true"  //没有选中的弹框-->
            <el-button type="text" @click="nullTrue">指派合规人员</el-button>
          </div>
          <span class="approval-header-a select-see-group" data-visible="0" @click="setVisible((isShow = 1))">
            <i class="biz"></i>设为不可见
          </span>
          <span class="approval-header-a select-see-group" data-visible="1" @click="setInvisible((isShow = 0))">
            <i class="biz"></i>设为可见
          </span>
          <span class="approval-header-a select-see-group" data-visible="1" @click="approvalTable">
            <i class="biz"></i>设置合规餐标
          </span>
          <span class="approval-header-a select-see-group" data-visible="1" @click="SetMeetingType = true">
            <i class="biz"></i>设置会议类型
          </span>
          <!-- 没有选中的弹框 -->
          <el-dialog title="提示" :visible.sync="outerVisible">
            <span>请先选中需要批量修改的单元格</span>
            <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisible = false">确定</el-button>
            </div>
          </el-dialog>
          <!-- 没有选中的弹框 结束 -->

          <!-- 指派合规人员（通用） 有选中的弹框 -->
          <el-button type="text" @click="centerDialogVisible = true"></el-button>
          <el-dialog title="指派合规人员" :visible.sync="centerDialogVisible" width="30%" center>
            <span style="margin: 10px">姓名</span>
            <span>
              <el-select v-model="userValue" filterable placeholder="请选择">
                <el-option v-for="item in GetUser" :key="item.value" :label="item.fullname" :value="item.username">
                </el-option>
              </el-select>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="assignUser((type = 2))">确 定</el-button>
            </span>
          </el-dialog>
          <!--指派合规人员 有选中的弹框  结束 -->
          <!-- 指派合规人员（通用） 有选中的弹框 -->
          <el-button type="text" @click="personnel = true"></el-button>
          <el-dialog title="指派合规人员" :visible.sync="personnel" width="30%" center>
            <span style="margin: 10px">姓名</span>
            <span>
              <el-row class="demo-autocomplete">
                <el-col :span="12">
                  <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                </el-col>
              </el-row>
            </span>

            <span slot="footer" class="dialog-footer">
              <span style="margin: -25px 0 29px; display: block" class="replace-all">
                <input type="checkbox" name="replace_all" value="0" />
                替换全部（批量修改指派给该用户的内容）
              </span>
              <el-button @click="personnel = false">取 消</el-button>
              <el-button type="primary" @click="personnel = false">确 定</el-button>
            </span>
          </el-dialog>
          <!--指派合规人员 有选中的弹框  结束 -->

          <!-- 设置合规餐标 有选中的弹框 开始-->
          <el-button type="text" @click="complianceMeal = true"></el-button>
          <el-dialog title="设置合规餐标" :visible.sync="complianceMeal" width="30%" center>
            <span style="margin-right: 10px; margin-top: 10px">合规餐标</span>
            <span>
              <el-input v-model="mealValue" placeholder="请输入内容"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="complianceMeal = false">取 消</el-button>
              <el-button type="primary" @click="typeSave((type = 1))">保存</el-button>
            </span>
          </el-dialog>
          <!--设置合规餐标 有选中的弹框  结束 -->
          <!--设置会议类型 有选中的弹框 开始-->
          <el-button type="text" @click="SetMeetingType = true"></el-button>
          <tbody></tbody>
          <el-dialog title="设置会议类型" :visible.sync="SetMeetingType" width="80%" margin-top="5vh" center>
            <!-- 弹框内容 -->
            <div>
              <table class="tableBody">
                <tbody>
                  <tr class="trh">
                    <th>会议类型</th>
                    <th>操作</th>
                  </tr>
                  <tr class="trh" v-for="(item, index) in mettingType" :key="index">
                    <th>
                      <el-input v-show="showInput === index" placeholder="请输入内容" v-model="item.name" clearable></el-input>
                      <span v-show="showInput !== index">{{ item.name }}</span>
                    </th>
                    <th class="foterText">
                      <span @click="colack(item, index)" v-show="controlHiding !== index">编辑</span>
                      <span v-show="controlHiding  === index">
                        <span type="primary" @click="hander(item, index)">保存</span>
                        <span type="primary" @click="quxiao">取消</span>
                      </span>
                      <span @click="deleteRow(index)" style="color: red">删除</span>
                      <span @click="up(index)">
                        <img src="@/assets/images/on.png" alt="" style="width: 17px" />
                      </span>
                      <span @click="down(index)">
                        <img src="@/assets/images/up.png" alt="" style="width: 17px" />
                      </span>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <span slot="footer" class="dialog-footer">
              <div class="increase">
                <el-button type="primary" @click="addCondition">添加会议类型</el-button>
              </div>

              <el-button @click="cancelBox">取 消</el-button>
              <!-- <el-button type="primary" @click="hander">保存</el-button> -->
            </span>
          </el-dialog>
          <!--设置会议类型 有选中的弹框  结束 -->
        </div>
        <!--zhao 2.0-->
        <div class="approval-body">
          <div class="approval-table-box" style="position: relative; margin-top: 100px">
            <div class="approval-table-no-department">
              <table class="approval-table" cellpadding="1" cellspacing="1" border="1">
                <tbody>
                  <tr class="approval-table-header">
                    <th v-for="(item, colIndex) in mettingType" :key="colIndex">
                      <label class="table-header-item" style="cursor: pointer">
                        {{ item.name }}
                        <input type="checkbox" class="table-header-checkbox-header select-all-event-type" :checked="item.isChecked" data-event-type-id="4714" @click="selectCol(colIndex, $event)" />
                      </label>
                    </th>
                  </tr>
                  <tr class="approval-table-tr" v-for="(tabData, allIndex) in allTableData" :key="allIndex">
                    <th data-event-type-id="4714" data-department-id="921" data-is-show="1" v-for="(item, index) in tabData.temp" :key='index'>
                      <div style="display: flex; justify-content: space-between">
                        <!-- 第一行 -->
                        <input type="checkbox" class="table-header-checkbox" name="item-checkbox" :checked="item.isChecked" @click="itemSelect(index, allIndex, $event)" />
                        <div class="tag-vislble select-see-one" data-visible="0" v-show="item.show == 0">
                          Visible
                        </div>
                        <div class="tag-vislble select-see-one" data-visible="0" v-show="item.show == 1" style="background: #b6b7b7">
                          Visible
                        </div>
                      </div>
                      <div class="approval-table-user select-one" data-title="指派合规人员" data-user-type="biller">
                        <!-- @click="personnel = true" -->
                        <div>合规: {{ item.conformance }}</div>
                        <!-- @click="complianceMeal = true" -->
                        <div>合规餐标 :{{ item.meal_label }}</div>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <table class="approval-table approval-table-single" cellpadding="1" cellspacing="1" border="1">
              <tbody>
                <tr class="approval-table-tr" style="height: 72px">
                  <th class="table-department-item" style="height: 33px !important">
                    <label class="table-department-item-ch">部门</label>
                  </th>
                </tr>
                <tr class="approval-table-tr" v-for="(item, index) in department" :key="item.id">
                  <th class="table-department-item">
                    <label class="table-department-item-ch" style="cursor: pointer; display: block">
                      <input type="checkbox" class="table-header-checkbox-normal select-all-department" :checked="item.isChecked" @click="selectRow(index, $event)" data-department-id="921" />
                      {{ item.shortname }}
                    </label>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showInput: -1,
      alltool: true,
      outerVisible: false,
      innerVisible: false,
      centerDialogVisible: false,
      personnel: false,
      restaurants: [],
      state1: '',
      state2: '',
      complianceMeal: false,
      input: '',
      SetMeetingType: false,
      top: false,
      left: false,
      newStatus: false,
      department: [], //
      mettingType: [], //
      Compliance: [], //
      customer: [],
      tabledatas: [],
      bbb: 0,
      content: '',
      mealValue: '200',
      userList: [],
      userValue: 'GHQ243',
      listValue: '',
      // nameList:[ {shortname: "测试部门",id:"CeShi"}],
      wholeList: [],
      nameList: [],
      controlHiding: -1,

      // 每个单元格的数据
      allTableData: [],
    };
  },
  created() {
    // this.GetDepartmentyMeeting();
    this.GetUser();
    this.getAll();
  },
  methods: {
    // 向上
    up(index) {
      if (index === 0) return;
      // debugger
      let item = this.mettingType.splice(index, 1);
      this.mettingType.splice(index - 1, 0, item[0]);
      let Parameter = []
      this.mettingType.forEach((item,index) => {
        Parameter.push({
          id: item.id,
          order: index+1
        })
      })
      this.requestApi({
        url: '/MeetingMa/MeetingTypeOrder',
        method: 'POST',
        data: {
          Parameter: JSON.stringify(Parameter)
        },
      }).then({

      })
    },
    // 向下
    down(index) {
      if (index === this.mettingType.length - 1) return;
      let item = this.mettingType.splice(index, 1);
      this.mettingType.splice(index + 1, 0, item[0]);
      let Parameter = []
      this.mettingType.forEach((item,index) => {
        Parameter.push({
          id: item.id,
          order: index+1
        })
      })
      this.requestApi({
        url: '/MeetingMa/MeetingTypeOrder',
        method: 'POST',
        data: {
          Parameter: JSON.stringify(Parameter)
        },
      }).then({

      })
    },

    //
    nullTrue() {
     let ids = [];
      this.allTableData.forEach((tab) => {
        tab.temp.forEach((t, i) => {
          if (t.isChecked === true) {
            ids.push({ id: t.id });
          }
        });
      });
      if (ids.length <= 0) {
        this.outerVisible = true;
        return;
      } else {
        this.centerDialogVisible = true;
      }
    },
    approvalTable() {
      let ids = [];
      this.allTableData.forEach((tab) => {
        tab.temp.forEach((t, i) => {
          if (t.isChecked === true) {
            ids.push({ id: t.id });
          }
        });
      });
      if (ids.length <= 0) {
        this.outerVisible = true;
        return;
      } else {
        this.complianceMeal = true;
      }
    },
    // 全选
    selectAll($event) {
      this.mettingType = this.mettingType.map((item, i) => {
        item.isChecked = $event.target.checked ? true : false;
        return item;
      });
      this.department = this.department.map((item, i) => {
        item.isChecked = $event.target.checked ? true : false;
        return item;
      });
      this.allTableData = this.allTableData.map((tab) => {
        tab.temp.map((t) => {
          t.isChecked = $event.target.checked ? true : false;
          return t;
        });
        return tab;
      });
    },

    // 选择列
    selectCol(index, $event) {
      this.allTableData = this.allTableData.map((tab) => {
        tab.temp.map((t, i) => {
          if (+index === i) {
            t.isChecked = $event.target.checked ? true : false;
          }
          return t;
        });
        return tab;
      });
    },

    // 选择行
    selectRow(index, $event) {
      // if (+index === 0) {
      //   this.customer = this.customer.map((item, i) => {
      //     item.isChecked = $event.target.checked ? true : false;
      //     return item;
      //   });
      //   return;
      // }
      // if (+index === 1) {
      //   this.tabledatas = this.tabledatas.map((item, i) => {
      //     item.isChecked = $event.target.checked ? true : false;
      //     return item;
      //   });
      // }

      this.allTableData = this.allTableData.map((tab, curIndex) => {
        if (curIndex === +index) {
          tab.temp.map((t) => {
            t.isChecked = $event.target.checked ? true : false;
            return t;
          });
        }
        return tab;
      });
    },

    // 单个选
    itemSelect(index, type, $event) {
      this.allTableData = this.allTableData.map((tab, curIndex) => {
        if (curIndex === +type) {
          tab.temp.map((t, i) => {
            if (+index === i) {
              t.isChecked = $event.target.checked ? true : false;
            }
            return t;
          });
        }
        return tab;
      });
    },

    // 指派合规人员
    assignUser(type) {
      this.typeSave(type);
      this.centerDialogVisible = false;
    },
    //点击删除
    deleteRow(index) {
      this.requestApi({
        url: '/MeetingMa/MeetingTypeDelete',
        method: 'POST',
        data: {
          TypeID: this.mettingType[index].id
        },
      }).then((res) => {
          if (res) {
            this.GetDepartmentyMeeting();
          }
        });
    },
    //人员
    GetUser() {
      this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'POST',
        data: {
          
        },
      }).then((res) => {
        if (res) {
          this.GetUser = res;
        }
      });
    },
    //点击取消
    cancelBox() {
      // approvaProcessSort
    //   let paster = [{
    //     id:"20431744-e0a1-430d-905d-c3622868796b",	//审批ID
    //     sort:1							//	排序顺序
    // },
    // {
    //     id:"c54c63e9-d8b9-4de3-a330-682a50b3a2d0",
    //     sort:2
    // }]

    //   this.$api.approvaProcessSort({ Parameter: JSON.stringify(paster)}, 'POST').then((res) => {
    //     if (res) {
    //       this.nameList = res;
    //     }
    //   });
      this.SetMeetingType = false;
      // location.reload();
    },
    quxiao(){this.controlHiding=false;this.showInput = !this.showInput;},
    //点击编辑
    colack(item, index) {
      this.showInput = index;
      this.itemID = item.id;
      this.controlHiding = index;
    },
    //添加会议类型
    addCondition() {
      let mettingType = [];
      this.mettingType.push({ name: 'new', value: 1 });
    },
    GetDepartmentyMeeting() {
      this.requestApi({
        url: '/MeetingMa/GetDepartmentyMeeting',
        method: 'POST',
        data: {
          CompanyID: this.listValue,
        },
      }).then((res) => {
        if (res) {
          // debugger
          this.allTableData=[];
          if(res.department) {
            this.department = res.department.map((item) => {
              item.isChecked = false;
              return item;
            });
          }else {
            this.department = []
          }
          if(res.type){
            this.mettingType = res.type.map((item) => {
              item.isChecked = false;
              return item;
            });
          }else {
            this.mettingType = []
          }

          this.Compliance = res.data || [];
          // 数据筛选根据返回的数据customer_id分类
          this.department.forEach((d) => {
            let temp = [];
            let temp1 = [];
            this.Compliance.forEach((c) => {
              if (c.customer_id == d.id) {
                c.isChecked = false;
                temp1.push(c);
              }
            });
            // temp 按照会议类型排序
            this.mettingType.forEach(d => {
              temp1.forEach(f => {
                if(d.id == f.meeting_type_id){
                  temp.push(f);
                }
              })
            })
            
            this.allTableData.push({ temp });
          });
        }
      });
    },
    //增加/编辑 点击保存
    hander(item, index) {
      this.showInput = !this.showInput;
      this.itemID = item.id;
      const arr = this.mettingType.filter((item) => item.id === this.itemID);
      let obj = {};
      obj.name = arr[0].name;
      obj.company_id = this.listValue;
      obj.id = arr[0].id || '';
      this.requestApi({
        url: '/MeetingMa/MeetingTypeSava',
        method: 'POST',
        data: {
          Parameter: JSON.stringify(obj),
        },
      }).then((res) => {
        if (res) {
          this.$message('保存成功');
          this.controlHiding = false;
          this.GetDepartmentyMeeting();
          // location.reload()
        }
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {},
    //可见不可见
    Visible() {
     let ids = [];
      this.allTableData.forEach((tab) => {
        tab.temp.forEach((t, i) => {
          if (t.isChecked === true) {
            ids.push({ id: t.id });
          }
        });
      });
      this.requestApi({
        url: '/MeetingMa/DepartmentMeetingTypeShow',
        method: 'POST',
        data: {
          id: JSON.stringify({ ids }), //	 this.mettingType[index].id
          Show: 1,
        },
      }).then((res) => {
        if (res == true) {
        }
      });
    },
    //设置不可见
    setVisible(isShow) {
      let ids = [];
      this.allTableData.forEach((tab) => {
        tab.temp.forEach((t, i) => {
          if (t.isChecked === true) {
            ids.push({ id: t.id });
          }
        });
      });
      console.log(ids, 'ids');
      if (ids.length <= 0) {
        this.outerVisible = true;
        return;
      }
      this.DepartmentMeetingTypeShow(ids, isShow);
    },
    //设置可见
    setInvisible(isShow) {
      let ids = [];
      this.allTableData.forEach((tab) => {
        tab.temp.forEach((t, i) => {
          if (t.isChecked === true) {
            ids.push({ id: t.id });
          }
        });
      });
      if (ids.length <= 0) {
        this.outerVisible = true;
        return;
      }
      this.DepartmentMeetingTypeShow(ids, isShow);
    },
    //可见不可见接口
    DepartmentMeetingTypeShow(ids, isShow) {
      this.requestApi({
        url: '/MeetingMa/DepartmentMeetingTypeShow',
        method: 'POST',
        data: {
          IDList: JSON.stringify({ ids }), //
          Show: isShow,
        },
      }).then((res) => {
        if (res) {
          location.reload();
          console.log(res, '111');
        }
      });
    },
    // 保存  DepartmentMeetingTypeSava
    typeSave(type) {
      let ids = [];
      this.allTableData.forEach((tab) => {
        tab.temp.forEach((t, i) => {
          if (t.isChecked === true) {
            ids.push({ id: t.id });
          }
        });
      });
      this.DepartmentMeetingTypeSava(ids, type);
      this.complianceMeal = false;
    },
    //列表接口
    DepartmentMeetingTypeSava(ids, type) {
      this.requestApi({
        url: '/MeetingMa/DepartmentMeetingTypeSava',
        method: 'POST',
        data: {
          IDList: JSON.stringify({ ids }),
          Value: type === 1 ? this.mealValue : this.userValue,
          Type: type,
        },
      }).then((res) => {
        if (res) {
          location.reload();
        }
      });
    },
    getAll() {
      this.requestApi({
        url: '/MeetingMa/GetAllCompany',
        method: 'POST',
        data: {
          
        },
      }).then((res) => {
        if (res) {
          this.nameList = res;
          this.listValue = this.nameList[0].id;
          this.GetDepartmentyMeeting();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select > .el-input {
  margin-top: 13px;
  display: block;
  margin-left: 28px;
  height: 40px;
}
.tableBody {
  border: 1px solid rgb(23, 132, 175);
  width: 500px;
}
.tableBody .tr th {
  border: 1px solid rgb(23, 132, 175);
  width: 200px;
}

.trh th {
  padding: 10px;
  border: 1px solid rgb(23, 132, 175);
}
.foterText span {
  padding: 8px;
  font-size: 16px;
  color: rgb(58, 56, 56);
}
// .tableBody .tr{
//   border:1px solid black;
//   width: 200px;
//   height: 50px;
// }
.el-dialog--center {
  margin-top: 10px;
}
.el-dialog--center .el-dialog__body {
  display: flex;
  justify-content: center;
}
.el-input {
  width: 85%;
}
.increase {
  margin: -18px 25px 0 0;
  display: flex;
  justify-content: flex-end;
}
.el-dialog__header {
  text-align: center;
  background: #f2f2f3;
}
// .el-button+.el-button {
//   display: none;
// }
.content {
  width: 1100px;
  margin: 0 auto;
}
.approval-box {
  padding: 20px;
  background: #fff;
}
.approval-title-no-line {
  border: none;
}

.approval-title {
  font-weight: 500;
  color: #57638a;
  font-size: 14px;
  line-height: 20px;
  /* padding: 10px 0; */
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: ' ';
}
label {
  font-weight: normal;
}
// .foterText span {
//     padding: 0px;
//     font-size: 11px;
//     color: #3a3838;
// }
// .el-button{
//   padding: 9px,9px;
// }
label {
  display: inline-block;
  margin-bottom: 5px;
  font-weight: bold;
}
.approval-header-a:link {
  text-decoration: none;
  color: #5bc0de;
}
.el-dialog__body {
  text-align: center;
}
.el-input__inner {
  margin-left: 104px;
}
.approval-header-a {
  display: inline-block;
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #5bc0de;
  color: #5bc0de;
  margin-left: 10px;
  float: right;
}
.el-input__inner {
  width: 210px;
}
.approval-header-a:link {
  text-decoration: none;
  color: #5bc0de;
}
.el-button--text {
  color: #5bc0de;
  margin-top: -4px;
}
.approval-header-a i {
  margin-right: 3px;
}
.clearfix:after {
  clear: both;
}
.approval-body {
  padding: 20px 0;
}
// .approval-table-box {
//     overflow-x: scroll;
// }
.approval-table-no-department {
  overflow-x: auto;
  padding-left: 150px;
}
.approval-table-single {
  border-right: none;
  background-color: #fff;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
}
// .approval-table {
//     width: 100%;
//     border: 1px solid #e0e0e0;
// }
.approval-table-tr {
  position: relative;
  height: 92px;
}
table {
  border-collapse: collapse;
}
.approval-table-header {
  height: 72px;
  vertical-align: middle;
  text-align: center;
  background-color: #ebecf2;
}
.approval-table-header th {
  text-align: center;
  min-width: 177px;
  /* vertical-align: top; */
  /* height: 33px !important; */
  /* padding: 10px; */
}
.table-header-item {
  position: relative;
  text-align: left;
  padding: 3px 2px 3px 26px;
  font-weight: normal;
}
.table-header-checkbox-header {
  font-size: 18px;
  position: absolute;
  top: 2px;
  left: 5%;
}
.approval-table-tr {
  position: relative;
  height: 92px;
}
.approval-table-tr > th {
  padding: 10px;
  position: relative;
  min-width: 110px;
  height: 92px;
}
.tag-vislble {
  float: right;
  color: #ffffff;
  background-color: #5bc0de;
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: normal;
  cursor: pointer;
}
.table-department-item-ch {
  font-size: 14px;
  line-height: 20px;
  /* font-weight: normal; */
  color: #333333;
  margin-bottom: 7px;
  padding-left: 30px;
}
.approval-table-user {
  margin-left: 27px;
  color: #6d8298;
  line-height: 20px;
  font-weight: normal;
  margin-top: -24px;
  cursor: pointer;
  width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.approval-table-user {
  color: #6d8298;
  line-height: 20px;
  font-weight: normal;
  margin-top: 5px;
  cursor: pointer;
  width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .approval-table {
//     width: 100%;
//     border: 1px solid #e0e0e0;
// }
.approval-table-tr > th {
  padding: 0px;
  position: relative;
  min-width: 134px;
  height: 92px;
}
.tag-invislble {
  float: right;
  color: #ffffff;
  background-color: #e8e8e8;
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: normal;
  cursor: pointer;
}
input[type='radio'],
input[type='checkbox'] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  /* line-height: normal; */
}
input[type='checkbox'],
input[type='radio'] {
  /* padding: 0; */
  box-sizing: border-box;
}
.el-input__inner {
  margin-left: 0;
}
.el-dialog__headerbtn .el-dialog__close {
  display: none;
}
</style>
