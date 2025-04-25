import { EventDto } from "../models/event/event_dto";
import { Model, ModelStatic } from "sequelize";

export class EventService {
  constructor(
    private eventRepo: ModelStatic<Model>,
    private eventDateRepo: ModelStatic<Model>,
    private eventGameRepo: ModelStatic<Model>,
  ) {}

  listEvents = () => {
    return this.eventRepo.findAll();
  };

  getEvent = async (id: number): Promise<EventDto> => {
    const eventRecord: Model = await this.eventRepo.findOne({
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

    const eventRecordJson = eventRecord.toJSON();

    const datesList: Array<string> = dates.map((relatedDate) => {
      return relatedDate.toJSON().date;
    });

    const relatedGamesList: Array<number> = relatedGames.map((game) => {
      return game.toJSON().game_id;
    });

    return new EventDto(
      eventRecordJson.title,
      eventRecordJson.description,
      datesList,
      relatedGamesList,
    );
  };

  createEvent = async (dto: EventDto) => {
    const eventRecord: Model = await this.eventRepo.create({
      title: dto.title,
      description: dto.description,
    });

    const eventJson = eventRecord.toJSON();

    await Promise.all(
      dto.games.map((game_id) => {
        this.eventGameRepo.create({ event_id: eventJson.id, game_id: game_id });
      }),
    );

    await Promise.all(
      dto.datetimes.map((date) => {
        this.eventDateRepo.create({ event_id: eventJson.id, date: date });
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
