import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async()=>{
    mongoose.set("strictQuery",true)
    if(!process.env.MONGODB_URL) return console.log('MONGO_URL not found')
    if(isConnected) return console.log('Already connected to MongoDB');
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        
    } catch (error) {
        console.log('failed to connect')
        console.log(error)

    }
}