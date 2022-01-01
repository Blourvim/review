import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express()

import mongoose from 'mongoose';
import feedbackRoute from './routes/feedbackRoute.js';
import cors from 'cors';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import guard from 'express-jwt-permissions';
const Guard = guard()
const PORT = process.env.PORT || 5000
const corsOptions =  {
  origin: 'http://localhost:3000',
};

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-w-xp6bpi.us.auth0.com/.well-known/jwks.json'
}),
audience: 'https://review-blourvim.herokuapp.com',
issuer: 'https://dev-w-xp6bpi.us.auth0.com/',
algorithms: ['RS256']
});


app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_DB_KEY,
    {
    }
    , function(error) {
console.error(error)

});
mongoose.connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
    app.listen(PORT, function() {
      console.log("Server is running on Port: " + PORT);
    });
    if (process.env.NODE_ENV === 'production') {
      // Exprees will serve up production assets
      app.use(express.static('./client/build'));
    
    
    }
   
    
  });
const testsLog = async(req,res,next)=>{
  next()

}
  app.get('/api/achivements', testsLog,jwtCheck,Guard.check(['read:achivements']),function (req, res) {
    res.send('Secured Resource');
    console.log('resource accessed')
});



app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.set(err.headers).status(err.status).json({ message: err.message });
});


  
app.use('/api/feedbacks',feedbackRoute);