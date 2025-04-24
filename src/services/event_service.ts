import Event from "../models/event/event";
import { EventDto } from "../models/event/event_dto";

const initialize = async () => {
  return await Event();
};

const listEvents = async () => {
  const event = await initialize();
  return event.findAll();
};

const createEvent = async (dto: EventDto) => {
  const event = await initialize();
  const eventRecord = event.create({
    title: dto.title,
    description: dto.description
  });
};

const deleteEvent = async (id) => {
  const event = await initialize();
  return event.destroy({
    where: {
      id: id,
    },
  });
};

// Export functions
export { listEvents, createEvent, deleteEvent };
