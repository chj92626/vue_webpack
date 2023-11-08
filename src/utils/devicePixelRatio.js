const DevicePixelRatio = {
  // 获取系统类型
  _getSystem() {
    // let flag = false;
    const agent = navigator.userAgent.toLowerCase()
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
    if (isMac) {
      return true
    }

    if (agent.indexOf('windows') >= 0) {
      return true
    }
  },

  // 监听方法兼容写法
  _addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, handler)
    } else {
      element[`on${type}`] = handler
    }
  },
  // 校正浏览器缩放比例
  _correct() {
    /**
     * 根据window.screen.height 分辨率大小来适配
     * mac系统按640处理，windows系统按720处理
     */
    if (window.screen.height <= 540) {
      document.getElementsByTagName('body')[0].style.zoom = 0.47
    } else {
      document.getElementsByTagName('body')[0].style.zoom = window.screen.height > 721 ? '' : 0.67
    }
  },

  // 监听页面缩放
  _watch() {
    const t = this
    t._addHandler(window, 'resize', () => { // 注意这个方法是解决全局有两个window.resize
      // 重新校正
      t._correct()
    })
  },
  // 初始化页面比例
  init() {
    const t = this
    if (t._getSystem()) { // 判断设备，
      // 初始化页面校正浏览器缩放比例
      t._correct()
      // 开启监听页面缩放
      t._watch()
    }
  }
}

export default DevicePixelRatio
