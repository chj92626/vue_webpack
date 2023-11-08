<template>
  <div :class="column?'column':'flex'">
    <div>
      <el-upload
        :action="aliyunUploadConfig.uploadDomain"
        :before-upload="initUploadParams"
        :data="aliyunUploadConfig.uploadParams"
        :show-file-list="showFileList"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :file-list="filesList"
        :disabled="disabled"
        :on-preview="handlePreview"
        class="avatar-uploader"
        :multiple="multiple"
        :on-change="onChange"
      >
        <el-button :disabled="disabled">
          {{ btnText }}
        </el-button>
      </el-upload>
    </div>
    <PreviewDetailsDialog :dialog-visible="previewVisible" :title="previewDetailsTitle" :handle-close="handleClose">
      <template slot="preview">
        <div id="container" class="preview" />
      </template>
    </PreviewDetailsDialog>
  </div>
</template>

<script>
import { fileDownloadFun, attachmentPreviewFun } from '@/utils/utilsRecruit/filesDownload'
import ossUtils from '@/utils/utilsSettlement/ossUtils.js'
import PreviewDetailsDialog from '@/views/recruitManagement/components/dialog/previewDetails.vue'

export default {
  name: 'UploadItem',
  components: {
    PreviewDetailsDialog
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    column: {
      type: Boolean,
      default: true
    },
    buttonShow: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: '附件上传'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disabled: false,
      loading: false,
      previewVisible: false,
      previewDetailsTitle: '',
      aliyunUploadConfig: {
        uploadDomain: ossUtils.config.uploadDomain,
        uploadParams: {}
      }
    }
  },
  computed: {
    filesList: {
      get() {
        return this.fileList
      },
      set(newValue) {
        this.$emit('onChangeUpload', newValue)
      }
    }
  },

  created() {
    if (this.fileList.length > 0) {
      this.filesList = this.fileList
    }
  },
  methods: {
    initUploadParams(file) {
      return ossUtils.initUploadParams(file).then((res) => {
        this.aliyunUploadConfig = res
      })
    },
    handleUploadError() {

    },
    filesDownload(file) {
      if (!this.readOnly) return
      // 附件不预览
      this.previewDetailsTitle = file.name
      this.previewVisible = true
      this.loading = true
      attachmentPreviewFun(this.enclosureId).then((instance) => {
        if (instance) {
          this.loading = false
        }
      })
    },
    handleClose() {
      this.previewVisible = false
    },
    // 文件上传
    handleUploadSuccess(field, file) {
      // 阿里云返回后的拼接地址
      const val = `${this.aliyunUploadConfig.downloadDomain}${this.aliyunUploadConfig.uploadParams.key}`
      const fileFormat = file.raw.name.substring(file.raw.name.lastIndexOf('.') + 1)
      this.filesList = [{ url: val, fileFormat: fileFormat, name: file.raw.name }]
    },
    // 删除
    handleRemove(file) {
      this.filesList = []
      this.$emit('onChangeUpload', [])
      this.disabled = false
    },
    // 删除前的钩子
    beforeRemove(file, contractFile) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    /**
     * 文件覆盖
     */
    onChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
    },
    // 文件下载
    handlePreview(file) {
      const { url, name } = file
      fileDownloadFun(url, name)
    }

  }
}
</script>

<style lang="less" scoped>
.avatar-uploader{
  ::v-deep .el-upload-list__item-name{
    width: 280px;
  }
}
.fileList{
  display: flex;
  // margin: 10px;
  // padding:  10px;

.fileName{
  margin: 0 10px ;
  color: #0049FF;
  cursor: pointer;
}
}
.flex{
  display: flex;
}
.column{
  display: flex;
  flex-direction: column;
}

</style>
