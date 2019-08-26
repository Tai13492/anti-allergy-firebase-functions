import { Request, Response, NextFunction } from "express";
import { extractListOfSearchResults } from "../services/search.service";
import { IComputeResponse } from "../services/compute.service";

export async function search(req: Request, res: Response, next: NextFunction) {
  const { input } = req.body;
  try {
    const url = `https://www.skincarisma.com/search?utf8=1&q=${input}`;
    const searchResponse: IComputeResponse = await extractListOfSearchResults(
      url
    );
    const { error, data } = searchResponse;
    if (error) throw error;
    res.status(200).json({ products: data });
  } catch (error) {
    next(error);
  }
}
