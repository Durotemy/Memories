import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    userId?: any;
  }
}
export const Auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization?.split(" ")[1];
    const isCustomAuth: any = token && token.length < 500;
    let decodedData: any;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
