import moment from 'moment'

class DateFormat {
  timeAgo(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
  }

  fullDate(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('ddd, MMM D, YYYY')
  }

  time12Hour(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('h:mm A')
  }
}

export default DateFormat = new DateFormat()
