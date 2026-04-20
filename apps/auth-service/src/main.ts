import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '@estore/error-handler';
import cookieParser from 'cookie-parser';
import router from './routes/auth.router';

const app = express();

app.use(
  cors(
    {
      origin: ["http://localhost:3000"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }
  ))

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API'});
});

app.use("/api", router)

app.use(errorMiddleware)

const port = process.env.PORT || 6001;
const server = app.listen(port, ()=>{
  console.log(`Auth service is running at http://localhost:${port}/api`)
})

server.on('error', (err)=>{
  console.log("Server Error:" , err);
})