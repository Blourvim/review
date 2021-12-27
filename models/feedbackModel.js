import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
text: String,

rating:{
    type:Number, min:1, max:10,
},
createdAt: { type: Date, default: Date.now },
user: { type: mongoose.Schema.ObjectId, ref: "User" },


})

export default mongoose.model('Feedback', feedbackSchema);