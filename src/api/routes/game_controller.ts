import { Router } from "express";
import { listGames, createGame, deleteGame } from "../../services/game_service";
import { GameDto } from "../../models/game/gameDto";
import { plainToClass } from "class-transformer";

export default (app: Router) => {
  const router = Router();
  app.use("/api/games", router);

  router.get("/list", async (req, res) => {
    const games = await listGames();
    res.send({
      games: games,
    });
  });

  router.post("/create", (req, res) => {
    const gameDto: GameDto = plainToClass(GameDto, req.body, {
      excludeExtraneousValues: true,
    });

    try {
      createGame(gameDto);
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
    const gameId = req.params.id;
    deleteGame(gameId);

    res.send({
      status: 200,
    });
  });

  return app;
};
