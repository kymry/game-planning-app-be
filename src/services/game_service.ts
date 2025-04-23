import Game from "../models/game/game";
import { GameDto } from "../models/game/gameDto";

const initialize = async () => {
  return await Game();
};

const listGames = async () => {
  const game = await initialize();
  return game.findAll();
};

const createGame = async (dto: GameDto) => {
  const game = await initialize();
  return game.create({
    title: dto.title,
    year: dto.year,
    max_players: dto.max_players,
    min_players: dto.min_players,
    min_time: dto.min_time,
    type: dto.type,
  });
};

const deleteGame = async (id) => {
  const game = await initialize();
  return game.destroy({
    where: {
      id: id,
    },
  });
};

// Export functions
export { listGames, createGame, deleteGame };
