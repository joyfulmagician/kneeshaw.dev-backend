import { Request, Response, NextFunction } from "express";

function getHello(_req: Request, res: Response, _next: NextFunction) {
  res.send("Hello World!");
}

export default { getHello };
