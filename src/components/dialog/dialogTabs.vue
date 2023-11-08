
<template>
  <el-drawer
    class="clarify-dialogTabs-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    size="75%"
    direction="rtl"
    :wrapper-closable="false"
    :before-close="handleDetailClose"
    destroy-on-close
  >
    <!-- 弹框内tab切换页 -->
    <div v-if="tabList.length>0" class="dialog-tab-list">
      <div v-for="(i,index) in tabList" :key="index" class="dialog-tab-list-item" :class="{'activeClass':isActive === index}" @click="handleTab(index)">
        {{ i.name }}
      </div>
    </div>
    <!-- 弹框内容 -->
    <div :class="{'dialog-tab-list-item-content':tabList.length>0}">
      <template v-if="detailsType==='position'">
        <template v-if="isActive===0">
          <PositionInformation :query-type="queryType" :query-id="queryId" />
        </template>
        <template v-if="isActive===1">
          <RecruitmentInformation :query-type="queryType" :query-id="queryId" />
        </template>
      </template>
      <template v-if="detailsType==='resume'">
        <template v-if="isActive===0">
          <PersonalInformation :row-id="rowId" />
        </template>
        <template v-if="isActive===1">
          <RecruitmentInformation :query-type="queryType" :row-id="rowId" />
        </template>
      </template>
    </div>
    <div class="dialog-footer">
      <el-button @click="handleDetailClose">关 闭</el-button>
    </div>
  </el-drawer>
</template>

<script>
import PositionInformation from '../../jobRequirement/components/positionInformation.vue'
import RecruitmentInformation from '../../jobRequirement/components/recruitmentInformations.vue'
import PersonalInformation from '../../resume/components/personalInformation.vue'

export default {
  name: 'DialogTabs',
  components: { PositionInformation, RecruitmentInformation, PersonalInformation },
  props: {
    // 控制弹框显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 切换列表
    tabList: {
      type: Array,
      default: () => { return [] }
    },
    queryId: {
      type: [String, Number],
      default: null
    },
    queryType: {
      type: String,
      default: ''
    },
    rowId: {
      type: [String, Number],
      default: null
    },
    /** 岗位详情/简历详情
     *  position:岗位详情
     *  resume:简历详情
     * */
    detailsType: {
      type: String,
      default: 'position'
    },
    // 弹框关闭事件
    handleDetailClose: {
      type: Function,
      default: () => {}
    },
    // 弹框标题
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    handleTab(index) {
      this.isActive = index
    }
  }
}
</script>

<style lang="less" scoped>

.clarify-dialogTabs-dialog{
  ::v-deep .el-drawer__header{
    margin-bottom:10px ;
  }
  ::v-deep .dialog-footer{
    position: fixed;
    bottom: 0;
    padding: 10px 20px;
    background: #fff;
    width: 100%;
  }
  ::v-deep .el-drawer__body{
    margin-bottom: 60px;
    padding: 0 20px;
    position: relative;
  }
  .dialog-tab-list-item-content{
    margin-top: 50px;
  }
  ::v-deep .el-descriptions__header{
    background: #F5F6F9 ;
    padding: 10px 20px;}
  }

.dialog-tab-list{
  position: fixed;
  background: #fff;
  display: flex;
  width: 100%;
  z-index: 999;
  .dialog-tab-list-item{
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    .dialog-tab-list-item-content{
      margin-top: 10px;
      overflow: auto;
    }
  };
  .activeClass{
   background:  #E2E6EE ;
   padding: 10px 20px;
  }
  .dialog-tab-list-item:hover{
   background:  #E2E6EE ;
  }
}
</style>
