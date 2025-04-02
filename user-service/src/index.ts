import express, { Request } from 'express';
import { connectDB } from './config/db';
import { connectRabbitMQ } from './config/rabbitmq';
import userRoutes from "./routes/user.routes"

const app = express();
app.use(express.json());

connectDB()

app.use('api/users', userRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`User service running on port ${PORT}`))