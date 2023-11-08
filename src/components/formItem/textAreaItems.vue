<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div>
    </template>
    <el-input
      v-else
      v-model="value"
      type="textarea"
      style="width: 790px"
      placeholder="请输入"
      :maxlength="maxlength"
      :validate-event="false"
      show-word-limit
      clearable
      size="small"
      :autosize="{ minRows: 4, maxRows: 10}"
    />
  </div>
</template>

<script>

export default {
  name: 'TextAreaForm',
  props: {
    valuedata: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 200
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    name: {
      type: Array,
      default: () => []
    },
    labelName: {
      type: String,
      default: ''
    }
  },
  computed: {
    value: {
      get() {
        if (this.valuedata && this.labelName) {
          if (this.valuedata.length > this.maxlength) {
            this.$emit('onMessage', {
              message: `${this.labelName} 字数超出了最大限制字数（ ${this.maxlength} 字符）`
            })
            return this.valuedata
          }
        }
        return this.valuedata
      },
      set(newValue) {
        this.$emit('onMessage', {
          message: ''
        })
        this.$emit('onChange', {
          name: this.name,
          value: newValue
        })
      }
    }
  }
}
</script>

<style>
::v-deep .el-textarea__inner{
  white-space:'break-space'!important
}
</style>
