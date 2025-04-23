import { Sequelize, DataTypes } from "sequelize";
import Database from "../config/database";

const Game = async () => {
  const database: Sequelize = Database();
  const game = database.define(
    "game", 
    {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    max_players: {
      type: DataTypes.INTEGER,
    },
    min_players: {
      type: DataTypes.INTEGER,
    },
    min_time: {
      type: DataTypes.INTEGER,
    },
    max_time: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false
  }
);
  try {
    await database.sync();
    console.log("The table for Game model was upserted");
  } catch (error) {
    console.log(error);
  }

  return game;
};

export default Game;
