import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGO DB CONNECTED SUCCESSFULLY!')
    } catch (error) {
        console.log('Error connecting MONGODB', error)
        process.exit(1)
    }
}