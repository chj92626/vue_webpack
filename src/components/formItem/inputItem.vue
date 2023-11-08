<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div></template>
    <el-input
      v-else
      v-model="value"
      placeholder="请输入"
      :class="[itemStyle?itemStyle:'w320',{'max-input-length':maxlength}]"
      :maxlength="maxlength ? maxlength : null"
      show-word-limit
      clearable
      size="small"

      @change="inputHandler"
    />
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'InputForm',
  props: {
    valuedata: {
      type: String,
      default: ''
    },
    itemStyle: {
      type: String,
      default: ''
    },
    tipName: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    keyup: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: null
    },
    name: {
      type: Array,
      default: () => []
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
  },
  methods: {
    inputHandler(value) {
      if (!value) {
        this.$emit('update:jobCodeRequired', false)
        return
      }
      if (!this.keyup) {
        this.$emit('update:jobCodeRequired', false)
        return
      }

      const reg = /[^\w_-]/g
      if (reg.test(value)) {
        this.$emit('update:jobCodeRequired', true)
        Message({
          message: `${this.tipName}仅支持数字、字母和下划线`,
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        this.$emit('update:jobCodeRequired', false)
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
