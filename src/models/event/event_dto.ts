import { Expose } from "class-transformer";

export class EventDto {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  datetimes: Array<string>;
  @Expose()
  games: Array<string>;

  constructor(title: string, description: string, datetimes: Array<string>, games: Array<string>) {
    this.title = title;
    this.description = description;
    this.datetimes = datetimes;
    this.games = games;
  }
}
