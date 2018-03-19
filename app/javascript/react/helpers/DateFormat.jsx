import moment from 'moment'

export default class DateFormat {
  static timeAgo(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
  }

  static fullDate(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('ddd, MMM D, YYYY')
  }

  static shortDate(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMM D, YYYY')
  }

  static shortDateTime(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMM D, YYYY h:mm A')
  }

  static time12Hour(str) {
    return moment(str, 'YYYY-MM-DD hh:mm:ss +ZZ').format('h:mm A')
  }

  static slashDate(str) {
    return moment(str, 'YYYY-MM-DD').format('MM/DD/YYYY')
  }
}
