import 'dayjs/locale/he';

import { Language } from '@translations';
import dayjs, { type ConfigType, type Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'HH:mm';
const FULL_TIME_FORMAT = 'HH:mm:ss';
const DATE_TIME_FORMAT = `${DATE_FORMAT}, ${TIME_FORMAT}`;

class DateService {
  init() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(duration);
    dayjs.extend(relativeTime);
  }

  formatTime(date: ConfigType): string {
    return dayjs(date).format(TIME_FORMAT);
  }

  formatFullTime(date: ConfigType): string {
    return dayjs(date).format(FULL_TIME_FORMAT);
  }

  formatDate(date: ConfigType): string {
    return dayjs(date).format(DATE_FORMAT);
  }

  formatDateTime(date: ConfigType): string {
    return dayjs(date).format(DATE_TIME_FORMAT);
  }

  formatDateTimeRange(date: ConfigType, other: ConfigType): string {
    const [min, max] = [dayjs(date), dayjs(other)].toSorted((a, b) =>
      a.diff(b),
    );
    if (min.isSame(max, 'minutes')) {
      return this.formatDateTime(min);
    }
    if (min.isSame(max, 'days')) {
      return `${this.formatDate(min)}, ${this.formatTime(min)} - ${this.formatTime(max)}`;
    }
    return `${this.formatDateTime(min)} - ${this.formatDateTime(max)}`;
  }

  isBeforeToday(date: number): boolean {
    return dayjs().isAfter(date, 'day');
  }

  getDateByHour(hour: number, timezone?: string): Dayjs {
    if (timezone) {
      return dayjs()
        .tz(timezone)
        .set('hour', hour)
        .set('minutes', 0)
        .set('seconds', 0);
    }
    return dayjs();
  }

  getDateByTimezone(date: Dayjs, timezone: string): Dayjs {
    return date.tz(timezone);
  }

  getTimezoneDiff(timezone: string): number {
    const here = dayjs()
      .startOf('day')
      .tz('Asia/Jerusalem')
      .format('YYYY-MM-DD HH:mm');
    const there = dayjs()
      .startOf('day')
      .tz(timezone)
      .format('YYYY-MM-DD HH:mm');
    return dayjs(here).diff(there, 'h');
  }

  getTimeByMinutes(totalMinutes: number, short?: boolean): string {
    const value = dayjs.duration(totalMinutes, 'minutes');
    const isLessThanHour = value.hours() < 1;
    const isRound = totalMinutes % 60 === 0;
    if (short) {
      return isLessThanHour
        ? value.format('m')
        : isRound
          ? value.format('H')
          : value.format('H:m');
    }
    const h = `${value.format('H')}h`;
    const m = `${value.format('m')}m`;
    if (isLessThanHour) return m;
    if (isRound) return h;
    return `${h} ${m}`;
  }

  formatReadableDate(date: ConfigType, language: Language): string {
    return dayjs(date).locale(language).format('MMMM YYYY');
  }
}

const dateService = new DateService();

export default dateService;
