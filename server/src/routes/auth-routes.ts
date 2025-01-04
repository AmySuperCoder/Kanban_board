import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/auth.js';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user) {
      res.json({
        success: false, 
      })
      return 
    }
    const passwordsMatch = await bcrypt.compare(req.body.password, user?.password as string)
    if (!passwordsMatch) {
      res.json({
        success: false, 
      })
      return
    }
    const authToken = await jwt.sign({
      user: {
        id: user?.id
      }
    },
  process.env.JWT_SECRET_KEY!, 
  {expiresIn: "2m"}
  )
  res.json({
    success: true, 
    token: authToken
  })
  } catch (error) {
    console.log(error)
    res.json({
      success: false, 
    })
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    
  //   const authToken = await jwt.sign({
  //     user: {
  //       id: user?.id
  //     }
  //   },
  // process.env.JWT_SECRET_KEY!, 
  // {expiresIn: "2m"}
  // )
  res.json({
    success: true, 
    // token: authToken
  })
  } catch (error) {
    console.log(error)
    res.json({
      success: false, 
    })
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.get('/checkAuth', authenticateToken, checkAuth)

export default router;
