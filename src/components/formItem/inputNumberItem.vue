<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div></template>
    <el-input-number
      v-else
      v-model="value"
      :min="min"
      :precision="precision"
      :step="step"
      :max="max"
      placeholder="请输入"
      :class="unit?'w290':'w320'"
      clearable
      :style="unit?'margin-right:10px':''"
      size="small"
    />{{ unit?unit:'' }}
  </div>
</template>

<script>

export default {
  name: 'InputForm',
  props: {
    valuedata: {
      type: Number,
      default: null
    },
    itemStyle: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    precision: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: 0
    },
    name: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    value: {
      get() {
        return typeof this.valuedata === 'number' ? this.valuedata : undefined
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
