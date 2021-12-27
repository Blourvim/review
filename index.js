import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import mongoose from 'mongoose';
import feedbackRoute from './routes/feedbackRoute.js';
import cors from 'cors';
const app = express()


app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_DB_KEY,
    {


    }
    , function(error) {
console.error(error)

});
mongoose.connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
  });

  if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('./client/build'));
  
  
  }
 const PORT = process.env.PORT || 5000
  app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
  });
  


  
app.use('/api/feedbacks',feedbackRoute);
app.use(cors())