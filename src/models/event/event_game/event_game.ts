import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface EventGameAttributes {
  id: number;
  event_id: number;
  game_id: number;
}

export class EventGameModel
  extends Model<EventGameAttributes, Optional<EventGameAttributes, "id">>
  implements EventGameAttributes
{
  public id!: number;
  public event_id!: number;
  public game_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initEventGameModel = (sequelize: Sequelize) => {
  EventGameModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      tableName: "event_games",
      sequelize,
    },
  );

  return EventGameModel;
};
