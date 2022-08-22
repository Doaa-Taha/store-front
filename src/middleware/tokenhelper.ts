import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretToken = process.env.TOKEN_SECRET as string;

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(
        token as string,
        secretToken
      ) as jwt.JwtPayload;
      if (decoded) {
        next();
      }else{
        throw new Error(`Incorrect user information`)
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401);
  }
};

function sign(userId: number) {
  return jwt.sign({ user: { userId } }, secretToken);
}

export { verifyAuthToken, sign };
