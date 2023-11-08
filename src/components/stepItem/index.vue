<template>
  <div class="steps-list-item">
    <div class="steps-list-item-title">{{ title }}</div>
    <el-steps align-center :space="160" :active="activeStep">
      <el-step v-for="(item,key) in stepList" :key="key" :status="item.status" :title="item.title" :description="item.description" />
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'StepList',
  props: {
    stepList: {
      type: Array,
      default: () => { return [] }
    },
    title: {
      type: String,
      default: '审核进度'
    },
    activeStep: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="less" scoped>
.steps-list-item{
  display: flex;
  align-items: center;
  .steps-list-item-title{
    width: 100px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }
  ::v-deep .el-steps{
    flex:1;
    display: block;
    overflow-x: auto ;
  }
  ::v-deep .el-step{
    position: relative;
    margin-top: 50px;
    max-width: none !important;
  }
  ::v-deep .el-step__title{
    position: absolute;
    left: 50%;
    transform: translate( -50%, 0);
    top: -40px;
    width: 150px;
    font-size: 14px;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  ::v-deep .el-step__description{
    margin-top: 10px;
    width: 198px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>
