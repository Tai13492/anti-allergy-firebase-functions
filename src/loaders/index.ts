import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import ComputeAPI from "../api/compute.api";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/compute", ComputeAPI);
};
