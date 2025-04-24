import { Expose } from "class-transformer";

export class EventDto {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  datetimes: Array<Date>;
  @Expose()
  games: Array<string>;
}
