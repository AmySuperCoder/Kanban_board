import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  user: any;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization
  console.log(req.headers)
  if (!authHeader) {
    res.status(401).json({
      success: false, error: "NOT AUTHENTICATED"
    })
    return
  }
  try {
    const verifiedJWT = await jwt.verify(authHeader as string, process.env.JWT_SECRET_KEY!) as JwtPayload
  if (!verifiedJWT) {
    res.status(401).json({
      success: false, error: "NOT AUTHENTICATED"
    })
    return
  }
  console.log(verifiedJWT)
  req.user=verifiedJWT?.user
  next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false, error: "NOT AUTHENTICATED"
    })
    return
  } 
  
  
  // req.user=verifiedJWT?.data
 
};
