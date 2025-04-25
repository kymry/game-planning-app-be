import express from "express";
import home from "./routes/home_controller.js";
import games from "./routes/game_controller.js";
import events from "./routes/event_controller.js";

export default (() => {
  const PORT = process.env.PORT || 3000;
  // Browser security measure that allows the front-end to connect
  const cors = require("cors");
  const app = express();
  app.use(cors());
  app.use(express.json());

  home(app);
  games(app);
  events(app);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });

  return app;
})();
