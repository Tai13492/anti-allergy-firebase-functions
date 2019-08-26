import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import ComputeAPI from "../api/compute.api";
import SearchAPI from "../api/search.api";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/search", SearchAPI);
  app.use("/compute", ComputeAPI);
};
