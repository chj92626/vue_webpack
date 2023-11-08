
<template>
  <el-drawer
    class="drawer-list"
    :title="title"
    :visible.sync="dialogVisible"
    size="75%"
    destroy-on-close
    :wrapper-closable="false"
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

    <span class="dialog-footer">
      <el-button type="primary" @click="handleListSave">{{ submitBtnText }}</el-button>
      <el-button @click="handleListClose">取 消</el-button>
    </span>
  </el-drawer>
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
.drawer-list{
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
    padding:0 20px;
  }
}
</style>
