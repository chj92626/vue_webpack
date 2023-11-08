import { attachmentPreview, attachmentPreviewByPath } from '@/api/recruitApi/myResume'
import { batchDownLoad } from '@/api/recruitApi/recommendApproval'

function getBlob(url, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      cb(xhr.response)
    }
  }
  xhr.send()
}
function browse(blob, filename, cb) {
  const reader = new window.FileReader()
  reader.readAsDataURL(blob)
  reader.onload = () => {
    const imageDataUrl = reader.result
    cb(imageDataUrl)
    // imageElement.setAttribute("src",imageDataUrl);
  }
}

function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}
function download(url, filename, type, cb) {
  getBlob(url, (blob) => {
    if (type === 'seeImg') {
      browse(blob, filename, (base) => {
        cb(base)
      })
    } else {
      saveAs(blob, filename)
    }
  })
}
// 附件下载
export function fileDownloadFun(url, filename, type) {
  return new Promise((reslove) => {
    download(url, filename, type, (cb) => {
      reslove(cb)
    })
  })
}

// 附件多个下载
export function fileAllDownloadFun(ids) {
  return batchDownLoad(ids).then(() => new Promise((reslove) => {
    reslove()
  }))
}

function initPreview(res, reslove) {
  if (res.data) {
    if (!res.data.accessToken) {
      reslove(false)
      return
    }
    /* eslint-disable */
    const instance = aliyun.config({
      mount: document.querySelector('#container'),
      url: res.data.previewURL,
      refreshToken: res.data.accessToken, // 设置Token过期自动刷新。
      wordOptions: {
        isBestScale: true
      },
      pdfOptions: {
        isBestScale: true
      }
    })
    instance.setToken({
      token: res.data.accessToken,
      timeout: 10 * 60 * 1000 // 设置Token过期时间，单位为ms。此处设置为10分钟之后刷新Token。
    })
    reslove(instance)
  } else {
    reslove(false)
  }
}

// 附件预览
export function attachmentPreviewFun(row) {
  const { id, type, bucket, fullPath } = row

  return new Promise((reslove) => {
    // 下载接口
    if (type === 'path') {
      attachmentPreviewByPath({
        bucket,
        fullPath
      }).then((res) => {
        initPreview(res, reslove)
      })
    } else {
      attachmentPreview(id).then((res) => {
        initPreview(res, reslove)
      })
    }
  })
}
