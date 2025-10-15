import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    owners: {
        type: String, 
        required: true
    }, 
    messages: [
    {
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      owner: {
        type: String,
        required: true
      }
    } ]

})

const Message = mongoose.model('Message', messageSchema)
export default Message