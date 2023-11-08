
<template>
  <el-dialog
    class="preview-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="75%"
    lock-scroll
    destroy-on-close
    :close-on-click-modal="false"
    :modal="false"
    :before-close="handleClose"
    top="5vh"
  >
    <slot name="preview" />
  </el-dialog>
</template>

<script>

export default {
  name: 'PreviewDialog',
  components: {
  },
  props: {
    // 控制弹框显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹框关闭事件
    handleClose: {
      type: Function,
      default: () => {}
    },
    // 弹框标题
    title: {
      type: String,
      default: ''
    },
    // 提交按钮文案
    submitBtnText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped >
.preview-dialog{
  ::v-deep .el-dialog__body{
    padding-top:0 ;
    height: 100%;
  }
}
</style>
