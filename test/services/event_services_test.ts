import { describe, it } from "mocha";
import { assert } from "chai";
import { EventService } from "../../src/services/event_service";
import { EventDto } from "../../src/models/event/event_dto";
import { bootstrap } from "../../src/api/bootstrap";

describe("Event Service Tests", function () {
  let eventService: EventService;
  function createDto() {
    return new EventDto(
      "TEST TITLE",
      "TEST DESCRIPTION",
      ["2025-01-01T10:00:00Z", "2025-01-02T12:00:00Z"],
      [101, 102],
    );
  }

  // Use before hook to setup async code
  before(async () => {
    const { Event, EventDate, EventGame } = await bootstrap();
    eventService = new EventService(Event, EventDate, EventGame);
  });

  it("should return a list of events", async () => {
    const list = await eventService.listEvents();
    assert.isArray(list);
  });

  it("should create an event", async () => {
    const dto = createDto()
    const result = await eventService.createEvent(dto);

    assert.isOk(result);
    assert.equal(result.toJSON().title, dto.title);

    // Cleanup
    eventService.deleteEvent(result.id);
  });

  it("should retrieve an event by ID", async () => {
    const dto = createDto()
    const created = await eventService.createEvent(dto);
    const id = created.id;

    const retrieved = await eventService.getEvent(id);

    assert.equal(retrieved.title, dto.title);
    assert.equal(retrieved.description, dto.description);
    assert.deepEqual(retrieved.datetimes, dto.datetimes);
    assert.deepEqual(retrieved.games, dto.games);

    // Cleanup
    eventService.deleteEvent(id);
  });
});
