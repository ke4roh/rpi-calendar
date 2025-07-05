import moment from "moment-timezone";

export default class DateWithoutTime {
  private date: moment.Moment;

  constructor();
  constructor(date: Date);
  constructor(dateString: string);
  constructor(year: number, month: number, day: number);
  constructor(arg1?: Date | string | number, arg2?: number, arg3?: number) {
    let _year = 0;
    let _month = 0;
    let _day = 0;
    try {
      if (arg1 instanceof Date) {
        _year = arg1.getFullYear();
        _month = arg1.getMonth();
        _day = arg1.getDate();
      } else if (typeof arg1 === 'string') {
        [_year, _month, _day] = arg1.split('T')[0].split('-').map(Number);
        _month--; // Moment uses 0-based index for months
      } else {
        _year = arg1 || new Date().getFullYear();
        _month = arg2 == null ? new Date().getMonth() : arg2;
        _day = arg3 == null ? new Date().getDate() : arg3;
      }
      this.date = moment.utc({ year: _year, month: _month, day: _day}).startOf("day");
    } catch (error) {
        if (error instanceof RangeError) {
           console.error(`${error.message}: ${_year}-${_month + 1}-${_day}`)
        }
        throw error;
    }
  }

  toString(): string {
    return this.toISOString();
  }

  get year(): number {
    return this.date.utc().year();
  }

  get month(): number {
    return this.date.utc().month(); // Moment uses 0-based index for months
  }

  get day(): number {
    return this.date.utc().date();
  }

  get dayOfYear(): number {
    return this.date.utc().dayOfYear();
  }

  toISOString(): string {
    return this.date.utc().format("YYYY-MM-DD");
  }

  getDay(): number {
    return this.date.utc().day();
  }

  getTime(): number {
    return this.date.unix();
  }

  public valueOf(): number {
    return Math.floor(this.getTime() / (60 * 60 * 24));
  }

  public addDays(days: number): DateWithoutTime {
    const newDate = new Date(this.toISOString());
    newDate.setUTCDate(newDate.getUTCDate() + days);
    return new DateWithoutTime(newDate.toISOString().substring(0, 10));
  }

  public toLocaleDateString(locale?: string | string[], options?: Intl.DateTimeFormatOptions): string {
    let _date = new Date(this.date.year(), this.date.month(), this.date.date())
    return _date.toLocaleDateString(locale, options);
  }

}

