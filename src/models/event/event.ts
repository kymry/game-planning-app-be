import { Sequelize, DataTypes } from "sequelize";
import Database from "../../config/database";

const Event = async () => {
  const database: Sequelize = Database();
  const event = database.define(
    "event",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.INTEGER,
      },
      datetimes: {
        type: DataTypes.ARRAY,
      }
    }
  );
  try {
    await database.sync();
    console.log("The table for Event model was upserted");
  } catch (error) {
    console.log(error);
  }

  return event;
};

export default Event;
