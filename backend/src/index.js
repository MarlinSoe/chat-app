import express from 'express'
import usersRoutes from './routes/usersRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import cors from 'cors'

dotenv.config();

const app = express()
const PORT = 5001

// middleware
// app.use(cors({origin: 'http://localhost:5173'}));

app.use(cors({origin: 'https://chat-app-frontend-ten-taupe.vercel.app'}));
app.use(express.json())


app.use('/api/user', usersRoutes)
app.use('/api/messages', messagesRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at PORT: ${PORT}`);
    })}
)