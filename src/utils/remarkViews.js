export function remarkViews(message) {
  this.$msgbox({
    title: '查看',
    message,
    confirmButtonText: '确定'
  })
}
