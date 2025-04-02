import { Request, Response } from "express";
import { User } from "../models/User";
import { connectRabbitMQ } from "../config/rabbitmq";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({ name, email });

        const { channel } = await connectRabbitMQ();
        channel.sendToQueue("notifications", Buffer.from(JSON.stringify({ email, message: `Welcome, ${name}!`})));

        res.status(201).json({ message: "User registered and notification sent", user})
    } catch (error) {
        res.status(500).json({ error: "Error registering user" })
    }
}