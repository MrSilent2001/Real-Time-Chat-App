import express from 'express';
import dotenv from 'dotenv';
import {dbConnect} from './config/dbConnect';
import userRoutes from './routes/user.routes';
import chatRoutes from './routes/chat.routes';
import messageRoutes from './routes/message.routes';
import cors from 'cors';
import {Server} from 'socket.io';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true 
}));

// DB Connection
dbConnect();

//Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

const server = app.listen(port, () =>{
    console.log(`Server is running at port: ${port}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors:{
    origin: process.env.FRONTEND_URL,
  }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  
});
