import { Router } from "express";
import {
  listEvents,
  createEvent,
  deleteEvent,
  getEvent,
} from "../../services/event_service";
import { EventDto } from "../../models/event/event_dto";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";

export default (app: Router) => {
  const router = Router();
  app.use("/api/events", router);

  router.get("/list", async (req, res) => {
    const games = await listEvents();
    res.send({
      games: games,
    });
  });

  router.get("/:id", async (req, res) => {
    const eventId = req.params.id;
    const event = await getEvent(parseInt(eventId));
    res.send({
      games: event,
    });
  });

  router.post("/create", (req: Request, res: Response) => {
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
    const eventId = req.params.id;
    deleteEvent(eventId);

    res.send({
      status: 200,
    });
  });

  return app;
};
