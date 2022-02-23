import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}
export const timeFormatFilter = {
  filters: {
    timeFormat(datetime) {
      return datetime ? moment(datetime).format('a h:mm:ss , MMMM Do YYYY') : '-'
    }
  }
}
export const accountTagFilter = {
  filters: {
    accountTag(account) {
      return "@" + account
    }
  }
}
export const numberFormatTCFilter = {
  filters: {
    numberFormatTC(num) {
      return num.length > 4 ? `${num.substr(0, num.length - 4)}.${num.substr(num.length - 4, 1)} 萬` : num
    }
  }
}//回傳資料為字串時適用若為數字需更改
export const numberFormatEndFilter = {
  filters: {
    numberFormatEnd(num) {
      return num.length > 3 ? `${num.substr(0, num.length - 3)}.${num.substr(num.length - 3, 1)} k` : num
    }
  }
}//回傳資料為字串時適用若為數字需更改