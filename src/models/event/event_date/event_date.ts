import { Sequelize, DataTypes } from "sequelize";
import Database from "../../../config/database";

const EventDate = async () => {
  const database: Sequelize = Database();
  const event_date = database.define("event_date", {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  try {
    await database.sync();
    console.log("The table for Date model was upserted");
  } catch (error) {
    console.log(error);
  }

  return event_date;
};

export default EventDate;
