import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

async function hello(_req: Request, res: Response, _next: NextFunction) {
  res.status(httpStatus.OK).json({ message: "Ok" });
}

export default { hello };
