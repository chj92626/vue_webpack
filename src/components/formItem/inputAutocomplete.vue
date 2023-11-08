<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div></template>
    <el-autocomplete
      v-else
      v-model="value"
      placeholder="请输入"
      :maxlength="maxlength ? maxlength : null"
      class="inline-input"
      :class="[itemStyle?itemStyle:'w320',{'max-input-length':maxlength}]"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      show-word-limit
      clearable
      @select="handleSelect"
    />
  </div>
</template>

<script>

export default {
  name: 'InputForm',
  props: {
    valuedata: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    itemStyle: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: null
    },
    name: {
      type: Array,
      default: () => []
    },
    restaurants: {
      type: Array,
      default: () => []
    },
    querySearch: {
      type: Function,
      default: () => {}
    },
    handleSelect: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    value: {
      get() {
        return this.valuedata
      },
      set(newValue) {
        this.$emit('onChange', {
          name: this.name,
          value: newValue
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
}
  .max-input-length{

::v-deep .el-input__inner{
  padding-right: 50px;

}
  }
</style>
