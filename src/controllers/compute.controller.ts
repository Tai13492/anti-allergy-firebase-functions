import { Request, Response, NextFunction } from "express";
import { computeAllergy, IComputeResponse } from "../services/compute.service";

export async function compute(req: Request, res: Response, next: NextFunction) {
  const { url } = req.body;
  try {
    const computeAllergyResponse: IComputeResponse = await computeAllergy(url);
    const { error, data } = computeAllergyResponse;
    if (error) throw error;
    const { intersection, image } = data;
    res.status(200).json({ allergies: intersection, image });
  } catch (error) {
    next(error);
  }
}
