<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div></template>
    <el-cascader
      v-else
      ref="cascader"
      v-model="value"
      placeholder="请选择客户省/市/区地址"
      :props="{ value: 'code', label: 'name' }"
      :options="options"
      class="w320"
      :filterable="filterable"
      clearable
    />
  </div>
</template>

<script>

export default {
  name: 'CascaderForm',
  props: {
    valuedata: {
      type: [Array, String],
      default: () => []
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    name: {
      type: [Array, String],
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: false
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
