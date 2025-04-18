import { Sequelize, DataTypes } from "sequelize";
import Database from "../config/database";

const Game = async () => {
  const database: Sequelize = Database();
  const game = database.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
  try {
    await database.sync();
    console.log("The table for Game model was upserted");
  } catch (error) {
    console.log(error);
  }

  return game;
};

export default Game;
