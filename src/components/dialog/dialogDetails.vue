
<template>
  <el-drawer
    class="clarify-detail-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    size="75%"
    direction="rtl"
    :wrapper-closable="false"
    :before-close="handleDetailClose"
    destroy-on-close
  >
    <!-- 弹框内容 -->
    <div class="dialog-detail-item-content">
      <slot name="content" />
    </div>

    <div class="dialog-footer">
      <el-button @click="handleDetailClose">关闭</el-button>
    </div>
  </el-drawer>
</template>

<script>

export default {
  name: 'Dialogdetail',
  props: {
    // 控制弹框显示
    dialogVisible: {
      type: Boolean,
      default: false
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
  }
}
</script>

<style lang="less" scoped>
.clarify-detail-dialog{
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
  ::v-deep .el-descriptions__header{background: #F5F6F9 ;
    padding: 10px 20px;}
}

</style>
