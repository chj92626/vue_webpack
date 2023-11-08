<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div>
    </template>
    <el-select
      v-else
      v-model="value"
      placeholder="请选择"
      :class="[itemStyle?itemStyle:'w320',isTag?'isTag':'']"
      :multiple="multiple"
      :allow-create="allowCreate"
      :default-first-option="defaultFirstOption"
      :popper-append-to-body="popperAppendToBody"
      clearable
      filterable
      size="small"
    >
      <el-option
        v-for="item in data"
        :key="item.key"
        :label="item.label"
        :value="item.key"
      />
    </el-select>
  </div>
</template>

<script>

export default {
  name: 'SelectForm',
  props: {
    itemStyle: {
      type: String,
      default: ''
    },
    valuedata: {
      type: [Number, String, Array],
      default: null
    },
    name: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    defaultFirstOption: {
      type: Boolean,
      default: false
    },
    isTag: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
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
.is-tag{
  ::v-deep .el-input__suffix {
    display: none;
  }
  ::v-deep .el-select-dropdown {
    display: none;
  }
}
</style>
