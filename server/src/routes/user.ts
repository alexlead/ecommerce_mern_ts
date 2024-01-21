import {Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../models/user"; 
import { UserErrors } from "../errors";


export const verifyToken = ( req: Request, res: Response, next: NextFunction ) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (error)=> {
            if(error) {
                return res.sendStatus(403);
            }

            next();
        })
    }
    return res.sendStatus(401);
};


const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try{

        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({type: UserErrors.USERNAME_ALREADY_EXISTS});
        }
        
        const hashedPassword = await bcrypt.hash(password, 3);
        const newUser = new UserModel({username, password: hashedPassword});
        await newUser.save();
        
        res.json({message: "User Registered Successfully"});
    } catch(error) {
        res.status(500).json({type: error});
    }
    
});

router.post("/login", verifyToken, async (req: Request, res: Response) => {
    const {username, password } = req.body;
    try {
        const user: IUser = await UserModel.findOne({username});

        if(!user) {
            return res.status(400).json({type: UserErrors.NO_USER_FOUND});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({type: UserErrors.WRONG_CREDENTIALS});
            
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({token, userID: user._id});
        
    } catch (error) {
        res.status(500).json({type: error});
        
    }
    })



export {router as userRouter };