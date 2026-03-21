import dayjs from "dayjs";
import buddha from "dayjs/plugin/buddhistEra";

export function displayDate(dateString: string): string {
  dayjs.locale("th");
  dayjs.extend(buddha);
  return dayjs(dateString).format("D MMMM BBBB");
}
