import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    email: { type: String, required: true},
    message: { type: String, required: true},
    status: { type: String, default: "Pending"},
})

export const Notification = mongoose.model("Notification", notificationSchema);