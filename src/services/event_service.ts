import { EventModel } from "../models/event/event";
import { EventDateModel } from "../models/event/event_date/event_date";
import { EventDto } from "../models/event/event_dto";
import { Model, ModelStatic } from "sequelize";
import { EventGameModel } from "../models/event/event_game/event_game";

export class EventService {
  constructor(
    private eventRepo: typeof EventModel,
    private eventDateRepo: typeof EventDateModel,
    private eventGameRepo: typeof EventGameModel,
  ) {}

  listEvents = () => {
    return this.eventRepo.findAll();
  };

  getEvent = async (id: number): Promise<EventDto> => {
    const eventRecord = await this.eventRepo.findOne({
      where: { id: id },
    });

    if (eventRecord == null) {
      throw Error(`this event doesn't exist: ${id}`);
    }

    const relatedGames: Array<Model> = await this.eventGameRepo.findAll({
      where: { event_id: id },
    });

    const dates: Array<Model> = await this.eventDateRepo.findAll({
      where: { event_id: id },
    });

    const datesList: Array<string> = dates.map((relatedDate) => {
      return relatedDate.toJSON().date;
    });

    const relatedGamesList: Array<number> = relatedGames.map((game) => {
      return game.toJSON().game_id;
    });

    return new EventDto(
      eventRecord.title,
      eventRecord.description,
      datesList,
      relatedGamesList,
    );
  };

  createEvent = async (dto: EventDto) => {
    const eventRecord = await this.eventRepo.create({
      title: dto.title,
      description: dto.description,
    });

    
    await Promise.all(
      dto.games.map((game_id) => {
        this.eventGameRepo.create({ event_id: eventRecord.id, game_id: game_id });
      }),
    );

    await Promise.all(
      dto.datetimes.map((date) => {
        this.eventDateRepo.create({ event_id: eventRecord.id, date: date });
      }),
    );

    return eventRecord;
  };

  deleteEvent = (id: number) => {
    this.eventGameRepo.destroy({ where: { event_id: id } });
    this.eventDateRepo.destroy({ where: { event_id: id } });
    this.eventRepo.destroy({ where: { id: id } });
  };
}
