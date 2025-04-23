import { Expose } from "class-transformer";

export class GameDto {
  @Expose()
  title: string;
  @Expose()
  year: number;
  @Expose()
  max_players: number;
  @Expose()
  min_players: number;
  @Expose()
  min_time: number;
  @Expose()
  max_time: number;
  @Expose()
  type: string;
}
