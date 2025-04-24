import { Router } from "express";
import { listEvents, createEvent, deleteEvent } from "../../services/event_service";
import { EventDto } from "../../models/event/event_dto";
import { plainToClass } from "class-transformer";

export default (app: Router) => {
  const router = Router();
  app.use("/api/events", router);

  router.get("/list", async (req, res) => {
    const games = await listEvents();
    res.send({
      games: games,
    });
  });

  router.post("/create", (req, res) => {
    const eventDto: EventDto = plainToClass(EventDto, req.body, {
      excludeExtraneousValues: true,
    });

    try {
      createEvent(eventDto);
      res.send({
        status: 200,
      });
    } catch (error) {
      res.send({
        status: 500,
        error,
      });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    const gameId = req.params.id;
    deleteEvent(gameId);

    res.send({
      status: 200,
    });
  });

  return app;
};
