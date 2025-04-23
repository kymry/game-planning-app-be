import { Router } from "express";
import { listGames, createGame, deleteGame } from "../../services/game_service";

export default (app: Router) => {
  const router = Router();
  app.use("/api/games", router);

  router.get("/list", async (_req, res) => {
    const games = await listGames();
    res.send({
      games: games,
    });
  });

  router.post("/create", (_req, res) => {
    createGame("Catan", "Catan description");
    createGame("MTG", " MTG description");
    createGame("Scrabble", "Scrabble description");

    res.send({
      status: 200,
    });
  });

  router.delete("/delete/:id", async (_req, res) => {
    const gameId = _req.params.id
    deleteGame(gameId);

    res.send({
      status: 200,
    });
  });

  return app;
};
