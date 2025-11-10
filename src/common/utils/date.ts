import dayJs, { ConfigType, OptionType } from 'dayjs';

export const createDate = (
  date?: ConfigType,
  format?: OptionType,
  locale?: string,
  strict?: boolean,
) => dayJs(date, format, locale, strict);

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
