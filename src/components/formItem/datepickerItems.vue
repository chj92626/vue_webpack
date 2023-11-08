<template>
  <div>
    <template v-if="readOnly">
      <div class="w320 xclamp">
        {{ value }}
      </div></template>
    <el-date-picker
      v-else
      v-model="value"
      :value-format="valueFormat"
      align="right"
      :type="type"
      style="width: 320px"
      placeholder="选择日期"
      size="small"
    />
    <!-- :picker-options="timeStutus&&pickerOptions" -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatepickerItems',
  props: {
    valuedata: {
      type: [String, Date],
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    timeStutus: {
      type: String,
      default: ''
    },
    startDate: {
      type: [String, Date],
      default: null
    },
    endDate: {
      type: [String, Date],
      default: null
    },
    name: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'date'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    }

  },
  data() {
    return {
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
          value: newValue && moment(newValue).format(this.type === 'year' ? 'YYYY' : 'YYYY-MM-DD')
        })
      }
    }
  }

}
</script>
