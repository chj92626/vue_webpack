import { Message } from 'element-ui'

export function errorFieldFind(message) {
  // 获取报错dom元素
  return new Promise((resolve) => {
    const isError = document.getElementsByClassName('is-error')
    setTimeout(() => {
      // 输入框
      if (isError[0].querySelector('input')) {
        isError[0].querySelector('input').focus()
      }
      // 文本域
      if (isError[0].querySelector('textarea')) {
        isError[0].querySelector('textarea').focus()
      }
      Message.error(message)
      resolve()
    }, 100)
  })
}
