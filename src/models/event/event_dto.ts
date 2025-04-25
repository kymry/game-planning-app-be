import { Expose } from "class-transformer";

export class EventDto {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  datetimes: Array<string>;
  @Expose()
  games: Array<number>;

  constructor(
    title: string,
    description: string,
    datetimes: Array<string>,
    games: Array<number>,
  ) {
    this.title = title;
    this.description = description;
    this.datetimes = datetimes;
    this.games = games;
  }
}
