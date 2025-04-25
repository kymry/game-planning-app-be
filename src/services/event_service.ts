import Event from "../models/event/event";
import EventDate from "../models/event/event_date";
import EventGame from "../models/event/event_game";
import { EventDto } from "../models/event/event_dto";
import { Model } from "sequelize";

const listEvents = async () => {
  const eventRepo = await Event();
  return eventRepo.findAll();
};

const getEvent = async (id: number) => {
    const eventRepo = await Event();
    const eventGameRepo = await EventGame();
    const eventDateRepo = await EventDate();

    const eventRecord: Model = await eventRepo.findOne({
        where: {
            id: id
        }
    })

    const relatedGames: Array<Model> = await eventGameRepo.findAll({
        where: {
            event_id: id
        }
    })


    const dates: Array<Model> = await eventDateRepo.findAll({
        where: {
            event_id: id
        }
    })


    const eventRecordJson = eventRecord.toJSON()

    const datesList: Array<string> = dates.map((relatedDate) => {
        return relatedDate.toJSON().date
    })
    
    const relatedGamesList: Array<string> = relatedGames.map((game) => {
        return game.toJSON().id
    })

    return new EventDto(
        eventRecordJson.title,
        eventRecordJson.description,
        datesList,
        relatedGamesList
    )
}

const createEvent = async (dto: EventDto) => {
  const eventRepo = await Event();
  const eventGameRepo = await EventGame();
  const eventDateRepo = await EventDate();

  const eventRecord: Model = await eventRepo.create({
    title: dto.title,
    description: dto.description
  });

  const eventJson = eventRecord.toJSON()

  dto.games.forEach(async (game) => {
    await eventGameRepo.create({
        event_id: eventJson.id,
        game_id: game
      });
  })

  dto.datetimes.forEach(async (date_time) => {
    await eventDateRepo.create({
        event_id: eventJson.id,
        date: date_time
      });
  })

  return eventRecord
};

const deleteEvent = async (id) => {
  const eventRepo = await Event();
  return eventRepo.destroy({
    where: {
      id: id,
    },
  });
};

// Export functions
export { listEvents, createEvent, deleteEvent, getEvent };
