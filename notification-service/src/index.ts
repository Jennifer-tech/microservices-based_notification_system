import amqp from 'amqplib';
import dotenv from 'dotenv';
import { sendEmailNotification } from './services/emailService';

dotenv.config();

const RABBITMQ_URI = process.env.RABBITMQ_URI as string;
const QUEUE_NAME = 'notifications';

const startNotificationService = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URI);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log('Listening for notifications...');

        channel.consume(QUEUE_NAME, async (msg) => {
            if(msg) {
                const notification = JSON.parse(msg.content.toString());
                console.log(`Notification: ${notification.message} sent to ${notification.email}`)

                await sendEmailNotification(notification.email, notification.message);
                channel.ack(msg);
            }
        })
    } catch (error) {
        console.error('Notification Service Error:', error)
    }
}
startNotificationService();