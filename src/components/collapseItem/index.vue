<template>
  <div>
    <el-collapse v-for="(item,key) in stepList" :key="key" class="collapses" @change="handleCollapseChange(item)">
      <el-collapse-item :name="nameValue(item.id)" class="collapse-items">
        <template slot="title">
          <div class="header-title">
            <div :title="getTitleText(item)">{{ getTitleText(item) }}</div>
            <div>{{ getStatusName(item) }}</div>
          </div>
        </template>

        <template v-for="(i,k) in item.list">
          <StepItemlist :key="'step'+k" :step-list="i.list" :title="i.title" :active-step="i.activeStep" />
        </template>

      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
import StepItemlist from '../stepItem'
import { RecommendStatusMap, SexTypeMap, InductionStatusMap,
  InterviewStatusMap, InductionProcessMap, EducationTypeMap,
  ApprovalStatusMap, ProcessMap, SequenceMap, ApprovalTypeMap, ApprovalStatusTypeMap } from '@/filters/recruit'

import { resumeRecommendListDetails } from '@/api/recruitApi/jobRequirement'
export default {
  name: 'CollapseItems',
  components: { StepItemlist },
  props: {
    stepList: {
      type: Array,
      default: () => { return [] }
    },
    queryType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      RecommendStatusMap,
      EducationTypeMap,
      SexTypeMap,
      list: []
    }
  },
  created() {
  },
  methods: {
    getStatusName(data) {
      // 入职
      if (data.inductionStatus) {
        return InductionStatusMap[data.inductionStatus]
      }
      // 面试
      if (data.interviewStatus) {
        return InterviewStatusMap[data.interviewStatus]
      }
      // 审核
      if (data.approvalStatus) {
        return ApprovalStatusTypeMap[data.approvalStatus]
      }
    },
    // 审核数据处理
    recommendApprovalsHandle(e, list, recommendApprovals) {
      const recommendApprovalsList = recommendApprovals.map((item) => {
        return {
          title: ApprovalTypeMap[item.approvalType] + ApprovalStatusMap[item.approvalStatus],
          description: ` ${item.updateTime} ( ${item.operatorName || '--'} )`,
          status: item.approvalStatus ? 'success' : 'error'
        }
      }) || []
      recommendApprovalsList.unshift({
        title: '投递简历',
        description: ` ${e.updateTime} ( ${e.recruiterName || '--'} )`,
        status: 'success'
      })
      list.push(
        {
          title: '审核进度',
          activeStep: recommendApprovalsList.length + 1,
          list: recommendApprovalsList
        }
      )
    },
    // 面试数据处理
    recommendInterviewsHandle(interviewWay, list, recommendInterviews) {
      // 预约
      const appointmentList = JSON.parse(JSON.stringify(recommendInterviews)).map(i => {
        return { ...i, processStatus: i.subscribeStatus, updateUserName: i.subscribeOperatorName || '--'
        }
      })
      // 结果
      const resultList = JSON.parse(JSON.stringify(recommendInterviews)).map(i => {
        return { ...i, processStatus: i.interviewStatus, updateUserName: i.interviewOperatorName || '--'
        }
      })
      const resultListList = []
      resultList.forEach(i => {
        if (i.processStatus) {
          resultListList.push(i)
        }
      })
      const processList = [...appointmentList, ...resultListList].sort((a, b) => a.id - b.id)
      list.push(
        {
          title: '面试进度',
          activeStep: processList.length + 1,
          list: processList.map((item) => {
            return {
              title: ProcessMap[item.processStatus] + '(' + (interviewWay === item.sequence + '' ? '终面' : SequenceMap[item.sequence]) + ')',
              description: ` ${item.updateTime} ( ${item.updateUserName || '--'} )`,
              status: ![20, 50, 60].includes(item.processStatus) ? item.processStatus ? 'success' : 'process' : 'error'
            }
          })
        }
      )
    },
    // 入职数据处理
    recommendInductionHandle(recommendInduction, list) {
      const { acceptOffer, updateTime, inductionStatus, offerOperatorName, inductionOperatorName } = recommendInduction
      // offer
      const offer = JSON.parse(JSON.stringify({ title: InductionProcessMap[acceptOffer],
        description: ` ${updateTime} ( ${offerOperatorName || '--'} )`,
        status: acceptOffer ? 'success' : 'error' }))
      // 入职
      const induction = JSON.parse(JSON.stringify({ title: InductionProcessMap[inductionStatus],
        description: ` ${updateTime} ( ${inductionOperatorName || '--'} )`,
        status: inductionStatus === 100 ? 'success' : 'error' }))
      let inductionProcess = [offer]

      if (inductionStatus) {
        inductionProcess = [offer, induction]
      }
      list.push(
        {
          title: '入职进度',
          activeStep: inductionProcess.length + 1,
          list: inductionProcess
        }
      )
    },
    handleCollapseChange(e) {
      if (e.click) return
      this.$set(e, 'click', true)
      return new Promise((resolve) => {
        resumeRecommendListDetails(e.id).then(res => {
          const { recommendApprovals, recommendInterviews, recommendInduction, jobInterviews } = res.data
          const interviewWay = jobInterviews[jobInterviews.length - 1].interviewWay
          const list = []
          if (recommendApprovals) {
            this.recommendApprovalsHandle(e, list, recommendApprovals)
          }
          if (recommendInterviews.length > 0) {
            this.recommendInterviewsHandle(interviewWay, list, recommendInterviews)
          }
          if (recommendInduction.id) {
            this.recommendInductionHandle(recommendInduction, list)
          }
          resolve(list)
          this.stepList.forEach(i => {
            if (i.id !== e.id) return
            this.$set(i, 'list', list)
          })
        })
      })
    },
    getTitleText(data) {
      const { jobRequirementDTO, resumeDTO } = data
      let title = ''
      if (['jobList', 'myJob'].includes(this.queryType)) {
        title = resumeDTO.name ? `${resumeDTO.name} ( ${resumeDTO.updateTime}-${SexTypeMap[resumeDTO.sex] || ' '}-${resumeDTO.education || ' '} )` : '简历已删除'
      } else {
        title = jobRequirementDTO.jobName ? `${jobRequirementDTO.jobName} ( ${jobRequirementDTO.projectName}-${jobRequirementDTO.customerDeptName || ' '} )` : '岗位已删除'
      }
      return title
    },
    nameValue(data) {
      return data + 1 + ''
    }
  }
}
</script>

<style lang="less" scoped>

.collapses{
  margin-top: 10px;
  .header-title{
      flex: 1;
      display: flex;
      justify-content: space-between;
    >div:first-child{
      width: 500px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
    }
  }
  .collapse-items{
    margin-top: 10px;
  }
  ::v-deep .el-collapse-item__header {
    background-color: #F5F6F9;
    padding: 0 20px;
    font-size: 16px;
  }
  ::v-deep .el-collapse-item__content{
    padding: 10px 20px;
    background: #F5F9FF;
  }
}
</style>
