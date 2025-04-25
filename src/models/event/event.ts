import { Sequelize, DataTypes, Optional, Model } from "sequelize";

// Define attributes (with optional fields for creation)
export interface EventAttributes {
  id: number;
  title: string;
  description?: string;
}

// Define the class extending Model
export class EventModel
  extends Model<EventAttributes, Optional<EventAttributes, "id">>
  implements EventAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Init model
export const initEventModel = (sequelize: Sequelize): typeof EventModel => {
  EventModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "events",
      sequelize,
    },
  );

  return EventModel;
};
