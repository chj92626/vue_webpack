/**
 * Created by PanJiaChen on 16/11/18.
 */
import { isBlankString, isNumber } from './objectUtils'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  /* eslint-disable-next-line */
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function validRequestPath(requestPath) {
  const reg = /^(\/([a-zA-Z0-9.{}_-]+))*$/
  return reg.test(requestPath)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function isEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function isMobile(mobile) {
  return mobile.length === 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(mobile)
}

/**
 * 座机电话
 * @param {String} telephone
 * @returns {Boolean}
 */
export function isTelephone(telephone) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(telephone)
}

/**
 * 银行账号（简单验证）
 * @param {String} bankAccount
 * @returns {Boolean}
 */
export function isBankAccount(bankAccount) {
  return /^([1-9]{1})\d+$/.test(bankAccount)
}

/**
 * 判断两个字符是否相等
 * @param {string} oldStr
 * @param {string} newStr
 * @returns {Boolean}
 */
export function strEqualsStr(oldStr, newStr) {
  if (oldStr && newStr) {
    return oldStr === newStr
  }
  return false
}

export function isPositiveNum(num) {
  return isNumber(num) && num > 0
}

export function isNonnegativeNumber(num) {
  return isNumber(num) && num >= 0
}

/**
 * 判断字符串是否是json格式
 * @param {string} oldStr
 * @param {string} newStr
 * @returns {Boolean}
 */
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
}

/**
 * 可直接使用的验证方法
 */
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(rule, value, callback) {
  const reg = /[0-9a-zA-Z_]{3,8}/
  if (!value || !reg.test(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(rule, value, callback) {
  const reg = /[0-9a-zA-Z_]{6,18}/
  if (!value || !reg.test(value)) {
    callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

export function validTelephone(rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  isMobile(value) ? callback() : callback(new Error('手机号码格式不正确'))
}

export function validEmail(rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  isEmail(value) ? callback() : callback(new Error('邮箱格式不正确'))
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabetsAndNum(rule, str, callback) {
  if (!str) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    const reg = /^[A-Za-z0-9]+$/
    const rsCheck = reg.test(str)
    if (!rsCheck) {
      callback(new Error('请输入输入数字或字母'))
    } else {
      callback()
    }
  }, 200)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validStr(rule, str, callback) {
  if (!str) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    const reg = /^[A-Za-z0-9_]+$/
    const rsCheck = reg.test(str)
    if (!rsCheck) {
      callback(new Error('请输入输入数字,字母,下划线'))
    } else {
      callback()
    }
  }, 200)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validBlankStr(rule, str, callback) {
  if (isBlankString(str)) {
    return callback(new Error('输入不可以为空'))
  }
  return callback()
}

/**
 * 验证正数, 可用于金额数量等
 * @param {string} str
 * @returns {Boolean}
 */
export function validPositiveNum(rule, num, callback) {
  if (!isNumber(num)) {
    return callback(new Error('请输入数字'))
  } if (num > 0) {
    return callback()
  }
  return callback(new Error('请输入正数'))
}
