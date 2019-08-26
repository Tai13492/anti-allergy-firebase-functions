import * as express from "express";
import { compute } from "../controllers/compute.controller";

const Router = express.Router();

Router.route("/").post(compute);

export default Router;
