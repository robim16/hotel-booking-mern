import express from "express"

import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js"

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"


const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req,res,next) => {

// })

// router.get("/checkuser/:id", verifyUser, (req,res,next) => {
    
// })


// router.get("/checkuser/:id", verifyAdmin, (req,res,next) => {
    
// })


router.post("/", verifyAdmin, createUser)


router.put("/:id", verifyUser, updateUser)


router.delete("/:id", verifyUser, deleteUser)


router.get("/:id", verifyUser, getUser)


router.get("/", verifyAdmin, getUsers)


export default router