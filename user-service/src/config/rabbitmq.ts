import amqplib from 'amqplib';
import dotenv from 'dotenv'

dotenv.config()

const RABBITMQ_URI = process.env.RABBITMQ_URI as string
const QUEUE_NAME = 'notifications'
// export let channel: amqplib.Channel;

export const connectRabbitMQ = async () => {
    try {

        if(!RABBITMQ_URI) {
            throw new Error("RABBITMQ_URI is not defined in the environment variables")
        }
        const connection = await amqplib.connect(RABBITMQ_URI);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true});

        console.log("Connected to RabbitMQ and Queue created")

        return { connection, channel };
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error);
        process.exit(1)
    }
    }