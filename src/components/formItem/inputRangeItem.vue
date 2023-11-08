<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value.min?`${value.min} 至 ${value.max}`:"" }}
      </div></template>
    <template v-else>
      <el-input-number
        v-model="value.min"
        :min="0"
        :max="maxValue||999999"
        style="width: 130px; margin-right: 10px"
        placeholder="最小值"
        show-word-limit
        clearable
        size="small"
        @change="minChange"
      />至<el-input-number
        v-model="value.max"
        :min="minValue||0"
        :max="999999"
        style="width: 130px; margin: 0 10px"
        placeholder="最大值"
        show-word-limit
        clearable
        size="small"
        @change="maxChange"
      />{{ unit?unit:'' }}
    </template>
  </div>
</template>

<script>

export default {
  name: 'SelectForm',
  props: {
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
    }
  },
  data() {
    return {
      minValue: null,
      maxValue: null
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
    minChange(value) {
      this.minValue = value
    },
    maxChange(value) {
      this.maxValue = value
    }
  }
}
</script>

<style>
::v-deep .el-input__inner{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
}
</style>
