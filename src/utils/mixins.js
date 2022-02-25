import moment from 'moment'
moment.locale('zh-tw');

//顯示推文離現在多久
export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).startOf('hour').fromNow() : '-'
    }
  }
}

//把推文改成特定格式 ex. pm 10:25:12 , feb 24th 2022
export const timeFormatFilter = {
  filters: {
    timeFormat(datetime) {
      return datetime ? moment(datetime).format('a h:mm．YYYY年MMM Do') : '-'
    }
  }
}

//名字前加上@
export const accountTagFilter = {
  filters: {
    accountTag(account) {
      return "@" + account
    }
  }
}

//回傳資料為字串時適用若為數字需更改,數字改成XX萬
export const numberFormatTCFilter = {
  filters: {
    numberFormatTC(num) {
      return num.length > 4 ? `${num.substr(0, num.length - 4)}.${num.substr(num.length - 4, 1)} 萬` : num
    }
  }
}

//回傳資料為字串時適用若為數字需更改,數字改成XX千
export const numberFormatEndFilter = {
  filters: {
    numberFormatEnd(num) {
      return num.length > 3 ? `${num.substr(0, num.length - 3)}.${num.substr(num.length - 3, 1)} k` : num
    }
  }
}