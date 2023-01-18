import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app= express();
app.use(express.json());

app.use(cors());


import user from './routes/user';

app.use('/api/v1/users', user);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers)
  next();
})


//error handling
app.all('*', (req: Request, res: Response) => { 
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  })
  
})




 

const PORT = process.env.PORT || 3500;

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE_URL as string, () => { 
  try {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
    console.log('Connected to Database');
  }catch (err) {
    console.log(err);
  }
});




