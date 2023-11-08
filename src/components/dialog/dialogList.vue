
<template>
  <el-dialog
    class="clarify-dialog-list"
    :title="title"
    :visible.sync="dialogVisible"
    width="75%"
    lock-scroll
    destroy-on-close
    :close-on-click-modal="false"
    :before-close="handleListClose"
  >
    <div class="demand m-box">
      <!-- 提示信息 -->
      <slot name="headerTip" />

      <!-- 搜索 -->
      <slot name="formFilter" />

      <!-- 列表 -->
      <div class="m-table mt0">
        <slot name="tableList" />
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleListSave">{{ submitBtnText }}</el-button>
      <el-button @click="handleListClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'DialogList',
  components: {
  },
  props: {
    // 控制弹框显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹框关闭事件
    handleListClose: {
      type: Function,
      default: () => {}
    },
    // 弹框提交事件
    handleListSave: {
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
.clarify-dialog-list{
  ::v-deep .el-dialog__body{
    padding-top:0 ;
  }
}
</style>
