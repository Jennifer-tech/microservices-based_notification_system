import express, { Request } from 'express';
import { connectDB } from './config/db';
import { connectRabbitMQ, channel } from './config/rabbitmq';
import { User } from './models/User';

const app = express();
app.use(express.json());

app.post('/register', async (req: Request, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();

    channel.sendToQueue('notifications', Buffer.from(JSON.stringify({ email})));
    res.json({ message: "User registered and notification sent"});

})

const startServer = async () => {
    await connectDB();
    await connectRabbitMQ();
    app.listen(3001, () => console.log("User service running on port 3001"))
}

startServer();