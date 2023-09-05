import express, { type Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "@/router";
import { generalConfig } from "@/configs/general.config";
import { appDataSource } from "@/database/appDataSource";

export class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeDataSource();
    this.initializeMiddlewares();
    this.initializeControllers();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors(generalConfig.cors));
  }

  private initializeControllers() {
    this.app.use(router);
  }

  private async initializeDataSource() {
    try {
      await appDataSource.initialize();
      console.log("Data Source initialization succeeded!😃");
    } catch (error) {
      console.log("Data Source initialization failed!😞");
      console.log(error);
    }
  }

  public listen() {
    this.app.listen(process.env.APP_PORT, () => {
      console.log(`App listening on the port ${process.env.APP_PORT}!🦻`);
    });
  }
}
