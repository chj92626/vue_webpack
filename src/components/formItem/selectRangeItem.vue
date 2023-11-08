<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value.min?`${value.min} 至 ${value.max} ${unit}`:'' }}
      </div>
    </template>
    <template v-else>
      <el-select
        v-model="value.min"
        filterable
        placeholder="请选择"
        style="width: 130px; margin-right: 10px"
        clearable
        @change="changeMin"
      >
        <el-option
          v-for="item in salaryMinList"
          :key="item.key"
          :label="item.label"
          :value="item.key"
          :disabled="item.disabled"
        /> </el-select>至
      <el-select
        v-model="value.max"
        filterable
        placeholder="请选择"
        style="width: 130px; margin: 0 10px"
        clearable
        @change="changeMax"
      >
        <el-option
          v-for="item in salaryMaxList"
          :key="item.key"
          :label="item.label"
          :value="item.key"
          :disabled="item.disabled"
        />
      </el-select>{{ unit }}
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
    unit: {
      type: String,
      default: ''
    },
    name: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      salaryMinList: [],
      salaryMaxList: [],
      min: '',
      max: ''
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
  created() {
    const salaryMin = []
    const salaryMax = []
    for (let i = 1000; i <= 100000; i += 1000) {
      salaryMin.push({
        label: i,
        key: i
      })
      salaryMax.push({
        label: i,
        key: i
      })
    }
    this.salaryMinList = salaryMin
    this.salaryMaxList = salaryMax
  },
  methods: {
    changeMin(val) {
      this.min = val
      this.value.max = ''
      this.salaryMaxList.forEach((item) => {
        if (val >= item.label && this.min) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
      if (this.min === 10000) {
        this.$message.error('最小值不能选最大上限')
        return
      }
      this.$emit('onChange', {
        name: this.name,
        value: {
          min: this.min,
          max: this.value.max || this.max
        }
      })
    },
    changeMax(val) {
      this.max = val
      this.salaryMinList.forEach((item) => {
        if (val <= item.label && this.max) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
      if (this.max === 1000) {
        this.$message.error('最大值不能选最小上限')
        return
      }
      this.$emit('onChange', {
        name: this.name,
        value: {
          min: this.min,
          max: val
        }
      })
    }
  }
}
</script>
