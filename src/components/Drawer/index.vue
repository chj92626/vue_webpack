<template>
  <el-drawer
    class="drawer-list"
    :title="title"
    :visible.sync="dialogVisible"
    :size="size"
    destroy-on-close
    append-to-body
    :wrapper-closable="wrapperClosable"
    :modal="modal"
    :before-close="handleDrawerClose"
    @open="handleDrawerOpen"
  >
    <div class="content">
      <!-- 提示信息 -->
      <slot name="headerTip" />

      <!-- 搜索 -->
      <slot name="formFilter" />

      <!-- 列表 -->
      <div>
        <slot name="tableList" />
      </div>
    </div>

    <span v-if="footerBtn" class="drawer-footer">
      <el-button v-if="submitBtnText" :loading="submitLoading" type="primary" @click="handleDrawerSave">{{ submitBtnText }}</el-button>
      <el-button :type="submitBtnText?'':'primary'" @click="handleDrawerClose">{{ closeBtnText }}</el-button>
    </span>
  </el-drawer>
</template>

<script>
/**
 * @description Drawer 抽屉 【表单长, 亦或是需要临时展示一些文档】
 * @Author 程华军
 */
export default {
  name: 'Drawer',
  components: {
  },
  props: {
    // 控制弹框显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 提交加载
    submitLoading: {
      type: Boolean,
      default: false
    },
    // 遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // 弹框大小
    size: {
      type: [Number, String],
      default: '75%'
    },
    // 弹框关闭事件
    handleDrawerClose: {
      type: Function,
      default: () => {}
    },
    // 弹框提交事件
    handleDrawerSave: {
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
    },
    // 取消按钮文案
    closeBtnText: {
      type: String,
      default: '取消'
    },
    // 是否展示底部按钮
    footerBtn: {
      type: Boolean,
      default: true
    },
    // 点击modal是否关闭弹框
    wrapperClosable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDrawerOpen() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-list{
  ::v-deep .el-drawer__header{
    margin-bottom:10px ;
    color: #000;
    font-size: 20px;
    padding-top: 10px;
  }
  .content{
    height: 100% !important;
    padding:10px 0;
    >div{
      height: 100% !important;
    }
  }
  .drawer-footer{
    position: fixed;
    bottom: 0;
    padding: 10px 20px;
    background: #fff;
  }
  ::v-deep .el-drawer__body{
    margin-bottom: 60px;
    padding: 10px 20px;
    border-bottom: 1px solid #ECEFF8;
    border-top: 1px solid #ECEFF8;
  }

}
</style>
<style lang="scss">
.drawer-list{
  .pagination-container {
    position: fixed !important;
    z-index: 111;
    bottom: 0;
    right: 0;
  }
  }
</style>
