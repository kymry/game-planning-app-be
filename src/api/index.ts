import express from "express";
import home from "./routes/home.js";
import games from "./routes/games.js";

export default (() => {
  const PORT = process.env.PORT || 3000;
  const app = express();

  home(app);
  games(app);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });

  return app;
})();
