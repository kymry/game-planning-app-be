import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface EventDateAttributes {
  id: number;
  event_id: number;
  date: string;
}

export class EventDateModel
  extends Model<EventDateAttributes, Optional<EventDateAttributes, "id">>
  implements EventDateAttributes
{
  public id!: number;
  public event_id!: number;
  public date!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initEventDateModel = (sequelize: Sequelize) => {
  EventDateModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "event_dates",
      sequelize,
    },
  );

  return EventDateModel;
};
