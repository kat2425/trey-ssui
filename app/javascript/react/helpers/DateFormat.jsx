import moment from 'moment'

class DateFormat {
  timeAgo(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
  }
}

export default DateFormat = new DateFormat()
