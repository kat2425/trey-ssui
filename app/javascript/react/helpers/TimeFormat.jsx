/*
  https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
  formatMSS(    0 );  //   0:00
  formatMSS(   '8');  //   0:08
  formatMSS(    9 );  //   0:09
  formatMSS(  '10');  //   0:10
  formatMSS(   59 );  //   0:59
  formatMSS( +'60');  //   1:00
  formatMSS(   69 );  //   1:09
  formatMSS( 3599 );  //  59:59
  formatMSS('3600');  //  60:00
  formatMSS('3661');  //  61:01
  formatMSS( 7425 );  // 123:45
*/

export default class TimeFormat{
  static formatMSS(s) {
    return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s
  }
}
