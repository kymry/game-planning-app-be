import { Sequelize, DataTypes } from "sequelize";
import Database from "../../config/database";

const EventGame = async () => {
  const database: Sequelize = Database();
  const event_game = database.define(
    "event_game",
    {
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }
  );

  try {
    await database.sync();
    console.log("The table for Event model was upserted");
  } catch (error) {
    console.log(error);
  }

  return event_game;
};

export default EventGame;
