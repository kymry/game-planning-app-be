import Game from "../models/game";

const initialize = async () => {
  return await Game();
};

const listGames = async () => {
  const game = await initialize();
  return game.findAll();
};

const createGame = async (name, description) => {
  const game = await initialize();
  return game.create({name: name, description: description});
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
