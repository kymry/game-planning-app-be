import express from "express";
import home from "./routes/home_controller";
import games from "./routes/game_controller";
import events from "./routes/event_controller";
import { bootstrap } from "./bootstrap";
import cors from "cors";
import { EventService } from "../services/event_service";

export default (async () => {
  const PORT = process.env.PORT || 3000;
  const app = express();

  // Browser security measure that allows the front-end to connect
  app.use(cors());
  app.use(express.json());

  const { Event, EventDate, EventGame } = await bootstrap();
  const eventService = new EventService(Event, EventDate, EventGame);

  // Register routes after DB is ready
  home(app);
  games(app);
  events(app, eventService);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });

  return app;
})();
