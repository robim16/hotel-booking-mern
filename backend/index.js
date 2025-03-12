import express from "express"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config();

const connect = async () => {
    try {

        await mongoose.connect('mongodb://localhost/' + process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                // useCreateIndex: true,
                // useUnifiedTopology: true
            }
        );

      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
};


mongoose.connection.on("disconected", () => {
    console.log("mongoDB disconnected!")
})


//middlewares
app.use(cookieParser())
app.use(express.json())


app.use(cors());

app.use(cors({
    origin: "https://hotel-booking-frontend-sand-three.vercel.app/"//to be changed later to vercel url
}));

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)


app.use((err, req, res, next)=> {

    const errorStatus = err.status || 500
    const errorMessage = err.message || "somewhere went wrong"

   return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
   })
})

app.listen(process.env.PORT, ()=> {
    try {
        connect()
        console.log("server running in port 8080")
        
    } catch (error) {
        console.log(error);
    }
})

