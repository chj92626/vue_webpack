<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value.num?`${value.num} 至 ${value.day}`:"" }}
      </div></template>
    <template v-else>
      <el-input-number
        v-model="value.num"
        :min="0"
        :max="max"
        :style="unit?{width: '135px','margin-right':'10px'}:{width: '155px'} "
        placeholder="请输入"
        show-word-limit
        clearable
      /> {{ unit?unit:'' }}<el-select
        v-model="value.day"
        placeholder="请选择"
        :style="unit?{width: '140px','margin-left':'10px'}:{width: '160px'} "
        clearable
        filterable
      >
        <el-option
          v-for="item in data "
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SelectForm',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    valuedata: {
      type: Object,
      default: () => ({})
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    name: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: Infinity
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
