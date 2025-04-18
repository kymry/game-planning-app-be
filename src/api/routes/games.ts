import { Router } from "express";

export default (app: Router) => {
  const router = Router();
  app.use("/api/games", router);

  router.get("/", (_req, res) => {
    res.send({ Greeting: "Hello" });
  });

  router.get("/list", (_req, res) => {
    res.send({
      games: ["1", "2", "3"],
    });
  });

  return app;
};
