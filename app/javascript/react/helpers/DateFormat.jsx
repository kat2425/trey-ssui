import moment from 'moment'

export default class DateFormat {
  static timeAgo(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
  }

  static fullDate(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('ddd, MMM D, YYYY')
  }

  static fullDateWithTime(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMM DD YYYY hh:mm:ss a').toString()
  }
  
  static shortDateTime(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMM D, YYYY h:mm A')
  }

  static shortDate(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMM D, YYYY')
  }

  static longDate(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMMM D, YYYY')
  }

  static time12Hour(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('h:mm A')
  }

  static slashDate(time) {
    return moment(time, 'YYYY-MM-DD').format('MM/DD/YYYY')
  }
  
  static currentDateTime() {
    return moment().format('MMM D, YYYY h:mm A')
  }
}
