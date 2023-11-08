<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div>
    </template>
    <div v-else class="w320">
      <el-radio-group v-model="value">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelectForm',
  props: {
    valuedata: {
      type: [Number, String, Boolean],
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
