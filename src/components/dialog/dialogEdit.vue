
<template>
  <el-drawer
    class="clarify-edit-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    :wrapper-closable="false"
    size="75%"
    :before-close="handleEditClose"
    destroy-on-close
  >
    <!-- 弹框内容 -->
    <div class="dialog-edit-item-content">
      <slot name="content" />
    </div>

    <div class="dialog-footer">
      <el-button @click="handleEditClose">取 消</el-button>
      <el-button type="primary" @click="handleEditSave">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>

export default {
  name: 'DialogEdit',
  props: {
    // 控制弹框显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹框关闭事件
    handleEditClose: {
      type: Function,
      default: () => {}
    },
    // 弹框保存事件
    handleEditSave: {
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

.clarify-edit-dialog{
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
