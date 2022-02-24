import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}//顯示推文離現在多久
export const timeFormatFilter = {
  filters: {
    timeFormat(datetime) {
      return datetime ? moment(datetime).format('a h:mm:ss , MMMM Do YYYY') : '-'
    }
  }
}//把推文改成特定格式 ex. pm 10:25:12 , feb 24th 2022
export const accountTagFilter = {
  filters: {
    accountTag(account) {
      return "@" + account
    }
  }
}//名字前加上@
export const numberFormatTCFilter = {
  filters: {
    numberFormatTC(num) {
      return num.length > 4 ? `${num.substr(0, num.length - 4)}.${num.substr(num.length - 4, 1)} 萬` : num
    }
  }
}//回傳資料為字串時適用若為數字需更改,數字改成XX萬
export const numberFormatEndFilter = {
  filters: {
    numberFormatEnd(num) {
      return num.length > 3 ? `${num.substr(0, num.length - 3)}.${num.substr(num.length - 3, 1)} k` : num
    }
  }
}//回傳資料為字串時適用若為數字需更改,數字改成XX千

// email格式驗證，參考 https://hackmd.io/@FortesHuang/rJf6CYynS
export const checkEmail = (val) => {
  const validate = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  return validate.test(val)
}