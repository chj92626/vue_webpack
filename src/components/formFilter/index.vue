<template>
  <div class="filter-container m-item ">
    <div ref="filterForm" class="item-spacing display-ib " :class="filterSetting.moreFilterOpen?'max-filter-form':btnLength>maxLen?'min-filter-form':'filter-form'">
      <slot name="filter" />
    </div>
    <div class="filter-button">
      <el-button v-if="btnLength>maxLen" :icon="filterSetting.iconName" type="text" @click="moreFilter">更多</el-button>
      <el-button type="primary" @click="handleFilter">
        搜索
      </el-button>
      <el-button @click="handleRest">
        重置
      </el-button>
    </div>

  </div>
</template>

<script>
/**
 * @description 搜索栏
 * @Author 程华军
 */
export default {
  props: {
    maxLen: {
      type: Number,
      default: 2
    },
    handleFilter: {
      type: Function,
      default: () => {}
    },
    handleRest: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      btnLength: 0,
      filterSetting: {
        moreFilterOpen: false,
        iconName: 'el-icon-arrow-down'
      }
    }
  },
  mounted() {
    this.btnLength = this.$refs.filterForm.childNodes[0].childNodes.length || 0
  },
  methods: {
    handleFilter() {
      this.$emit('handleFilter')
    },
    handleRest() {
      const data = {
        current: 1,
        size: 50
      }
      this.$emit('handleRest', data)
    },
    moreFilter() {
      this.filterSetting.moreFilterOpen = !this.filterSetting.moreFilterOpen
      this.filterSetting.iconName = this.filterSetting.moreFilterOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
}
.filter-form{
  @media only screen and (min-width: 800px) {
    height: 40px;
    overflow: hidden;
  }

  @media only screen and (max-width: 1000px){
    // height: auto;
    // overflow: none;
  }
}

.min-filter-form{
 height: 40px;
    overflow: hidden;
}
.max-filter-form{
 height: auto;
    overflow: none;
}
.filter-button{
  height: 35px;
  display: flex;
}
::v-deep .el-form-item__label{
  max-width: 100px;
  text-align: left;
}
::v-deep .el-form-item__content{
  width: 180px;
  margin-right: 40px;
  >div{
    width: 100%;
  }
}
</style>
