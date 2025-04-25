import { describe, it } from "mocha";
import { assert } from "chai";
import {
  listEvents,
  createEvent,
  deleteEvent,
  getEvent,
} from "../../src/services/event_service";
import { EventDto } from "../../src/models/event/event_dto";

function createTestEventDto(): EventDto {
  return new EventDto(
    "TEST TITLE",
    "TEST DESCRIPTION",
    ["2025-01-01T10:00:00Z", "2025-01-02T12:00:00Z"],
    [101, 102],
  );
}

describe("Event Services", function () {
  it("should return a list of events", async () => {
    const list = await listEvents();
    assert.isArray(list);
  });

  it("should create an event", async () => {
    const dto = createTestEventDto();
    const result = await createEvent(dto);
    
    assert.isOk(result);
    assert.equal(result.toJSON().title, dto.title);

    // Cleanup
    await deleteEvent(result.toJSON().id);
  });

  it("should retrieve an event by ID", async () => {
    const dto = createTestEventDto();
    const created = await createEvent(dto);
    const id = created.toJSON().id;

    const retrieved = await getEvent(id);

    assert.equal(retrieved.title, dto.title);
    assert.equal(retrieved.description, dto.description);
    assert.deepEqual(retrieved.datetimes, dto.datetimes);
    assert.deepEqual(retrieved.games, dto.games);

    // Cleanup
    await deleteEvent(id);
  });
});
