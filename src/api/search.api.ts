import * as express from "express";
import { search } from "../controllers/search.controller";

const Router = express.Router();

Router.route("/").post(search);

export default Router;
