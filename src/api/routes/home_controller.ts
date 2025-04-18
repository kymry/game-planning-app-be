import { Router } from "express";

export default (app: Router) => {
  const router = Router();
  app.use("/", router);

  router.get("", (_req, res) => {
    res.send({ home: "Hello from the bangtang boiiissssss" });
  });

  return app;
};
