export class DateUtils {
  private systemNow(): Date {
    return new Date();
  }

  /** Read system time AS business local time */
  now() {
    return this.fromDate(this.systemNow());
  }

  /** Convert any Date into business-local representation */
  fromDate(date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(date);

    const get = (t: string) => parts.find((p) => p.type === t)!.value;

    const year = get("year");
    const month = get("month");
    const day = get("day");

    const hour = Number(get("hour"));
    const minute = Number(get("minute"));
    const second = Number(get("second"));

    const dateStr = `${year}-${month}-${day}`;

    return {
      /** YYYY-MM-DD */
      date: dateStr,

      /** HH:mm */
      time: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`,

      year,
      month,
      day,
      hour,
      minute,
      second,
    };
  }
}
