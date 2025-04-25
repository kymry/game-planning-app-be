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
      },
      description: {
        type: DataTypes.STRING,
      }
    }
  );
  try {
    await database.sync({alter: true});
    console.log("The table for Event model was upserted");
  } catch (error) {
    console.log(error);
  }

  return event;
};

export default Event;
