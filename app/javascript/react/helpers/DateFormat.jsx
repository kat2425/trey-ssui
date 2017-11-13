import moment from 'moment'

export default class DateFormat {
  static timeAgo(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
  }

  static fullDate(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('ddd, MMM D, YYYY')
  }

  static time12Hour(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('h:mm A')
  }
}
