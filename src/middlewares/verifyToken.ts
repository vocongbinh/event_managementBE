const User = require("../models/User");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers.token;
  console.log(authHeader);
  if (authHeader) {
   

    jwt.verify(authHeader, process.env.JWT_SEC, { algorithms: ['HS384'] }, async (err: any, user: any) => {
      if (err) return res.status(403).json(err);
      req.body.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyAndAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.body.user.role == "ADMIN") {
      next();
    } else {
      res.status(403).json("You are restricted from performing this operation");
    }
  });
};

module.exports = { verifyToken, verifyAndAdmin };
