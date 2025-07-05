/// <reference types="node" />
import DateWithoutTime from "./dateWithoutTime";

// Note that the date of Easter was not so widely agreed upon before 1845 when the
// last of the protestant churches fell into agreement with the Gregorian Easter
// which the Catholic church adopted in 1583.
// See https://en.wikipedia.org/wiki/Date_of_Easter#History
// See also https://web.archive.org/web/20050302020220/https://www.smart.net/~mmontes/ec-cal.html
namespace Easter {
  // Nature, 1876 April 20, vol. 13, p. 487.
  export function gregorianEaster(year: number): DateWithoutTime {
    if (year < 1582) {
      throw new RangeError("Invalid before 1582");
    }
    let a = year % 19;
    let b = Math.floor(year / 100);
    let c = year % 100;
    let d = Math.floor(b / 4);
    let e = b % 4;
    let f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3);
    let h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4);
    let k = c % 4;
    let l = (32 + 2 * e + 2 * i - h - k) % 7;
    let m = Math.floor((a + 11 * h + 22 * l) / 451);
    let n = Math.floor((h + l - 7 * m + 114) / 31);
    let p = (h + l - 7 * m + 114) % 31;

    let month = n;
    let day = p + 1;

    return new DateWithoutTime(year, month-1, day);
  }

}

export default Easter;
