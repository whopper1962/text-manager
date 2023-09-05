import { DataSource } from "typeorm";
import { appDataSourceConfig } from "@/configs/database.config";

export const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: appDataSourceConfig.host,
  port: 5432,
  username: appDataSourceConfig.username,
  password: appDataSourceConfig.password,
  database: appDataSourceConfig.database,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  logging: ["query"],
});
