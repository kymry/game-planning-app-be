import { Sequelize } from "sequelize";

const Database = () => {
  // TODO: Use environment variables for this later (dotenv library)
  const sequelize: Sequelize = new Sequelize(
    "postgres://admin:admin@127.0.0.1:5432/gameplanning",
  );
  return sequelize;
};

export default Database;
