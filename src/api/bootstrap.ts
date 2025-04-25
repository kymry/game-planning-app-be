import { Sequelize } from "sequelize";
import config from "../config/database";
import { initEventModel } from "../models/event/event";
import { initEventDateModel } from "../models/event/event_date/event_date";
import { initEventGameModel } from "../models/event/event_game/event_game";

// This function will initialize everything we need before the app starts
const bootstrap = async () => {
  // Initialize the Sequelize connection
  const sequelize: Sequelize = config();

  // Initialize models using the Sequelize instance
  const Event = initEventModel(sequelize);
  const EventDate = initEventDateModel(sequelize);
  const EventGame = initEventGameModel(sequelize);

  // Define relationships between models (if necessary)
  //   Event.hasMany(EventDate, { foreignKey: "event_id" });
  //   Event.hasMany(EventGame, { foreignKey: "event_id" });
  //   EventDate.belongsTo(Event, { foreignKey: "event_id" });
  //   EventGame.belongsTo(Event, { foreignKey: "event_id" });

  // Sync the database with the current models
  await sequelize.sync({ alter: true });

  // Return the initialized models and Sequelize instance
  return { sequelize, Event, EventDate, EventGame };
};

export { bootstrap };
