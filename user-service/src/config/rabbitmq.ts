import amqplib from 'amqplib';
import dotenv from 'dotenv'

dotenv.config()

export let channel: amqplib.Channel;

export const connectRabbitMQ = async () => {
    const connection = await amqplib.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertQueue("notifications");
    console.log("Connected to RabbitMQ")
}