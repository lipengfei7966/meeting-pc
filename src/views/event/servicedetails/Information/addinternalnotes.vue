<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title spread_retract">
          <strong>添加内部备注</strong>
        </div>
      </div>
      <div class="rfp_box">
        <div class="event_base clx">
          <div class="add_notes">
            <textarea placeholder="请详细填写其它需求或者注意事项" id="rfp_note_con" v-model="addText"></textarea>
            <div class="notes_btn">
              <input type="hidden" id="create_user_name" value="中旅会展" />
              <input type="submit" value="确认" class="notes_submit" id="save_note" data-number="DO210927130615" @click="submitRemarks" />
            </div>
          </div>
          <div class="notes_con">
            <div class="notes_title">备注信息列表：</div>
            <ul class="notes_list" id="note_list" v-show="remarks" v-for="(item,index) in noteText" :key="index">
              <li>
                <p class="notes_name">{{item.user}} {{item.data}}</p>
                <div class="notes_txt">{{item.remarks}}</div>
              </li>
            </ul>
            <div class="notes_non" v-show="!remarks">暂无备注</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['provideName'],
  data() {
    return {
      addText: '', //文本
      remarks: false, //有无备注
      noteText: [],
      provideId: []
    }
  },
  mounted() {
    this.addNotesQuery()
  },
  methods: {
    //点击提交备注
    submitRemarks() {
      //保存
      this.requestApi({
        url: '/MeetingMa/InternalDemandSava',
        method: 'post',
        data: {
          Parameter: JSON.stringify({
            foreign_key_id: this.$route.query.sheetId, // 询价单ID
            // user: '测试',
            remarks: this.addText,
            type: 0
          })
        }
      }).then(res => {
        if (res === true) {
          this.addNotesQuery()
        }
      })
    },
    //查询
    addNotesQuery() {
      this.requestApi({
        url: '/MeetingMa/GetInternalDemand',
        method: 'post',
        data: {
          ForeignKeyId: this.$route.query.sheetId,
          type: 0
        }
      }).then(res => {
        if (res && res.length >= 0) {
          this.noteText = res
          this.remarks = true
        }
        console.log(res, '======-=----')
      })
    }
  }
}
</script>

<style lang="scss">
.rfp_title {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
  height: 27px;
}
.rfp_title .title strong {
  float: left;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.international-formevent-title {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 5px;
}
.clx {
  zoom: 1;
}
.rfp_title .spread_retract {
  cursor: pointer;
}
.rfp_title .title {
  float: left;
  line-height: 28px;
}
.rfp_item {
  margin: 20px 0 0 0;
  background: #fff;
  box-shadow: 0 0 4px 1px #e8e8e8;
}
.demand .rfp_box {
  padding: 20px;
}
.add_notes textarea {
  width: 100%;
  height: 100px;
  padding: 9px;
  line-height: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  *width: 1040px;
  *height: 80px;
}
.add_notes .notes_btn {
  margin: 20px 0;
  text-align: center;
}
.add_notes .notes_btn .notes_submit {
  display: inline-block;
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: none;
  border-radius: 2px;
  background: #2896eb;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}
.notes_con .notes_title {
  color: #282828;
  font-size: 14px;
  line-height: 20px;
  border-bottom: 1px solid #dcdcdc;
  padding: 5px 0;
}
.notes_con .notes_non {
  font-size: 14px;
  color: #bebebe;
  line-height: 20px;
  padding: 10px 0;
}
.notes_con .notes_list li {
  padding: 8px 0;
  border-bottom: 1px dashed #e4e4e4;
  margin: 10px 0 0 0;
}
.notes_con .notes_list .notes_name {
  font-size: 14px;
  color: #a7a7a7;
  line-height: 20px;
  margin: 0 0 5px 0;
}
.notes_con .notes_list .notes_txt {
  font-size: 14px;
  color: #282828;
  line-height: 20px;
}
</style>