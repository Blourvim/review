import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import feedbackRoute from './routes/feedbackRoute.js';
import cors from 'cors';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
const PORT = process.env.PORT || 5000
const app = express()
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


app.get('/authorized',jwtCheck, (req, res)=> {
    res.send('Secured Resource');
});


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
    app.listen(PORT, function() {
      console.log("Server is running on Port: " + PORT);
    });
    if (process.env.NODE_ENV === 'production') {
      // Exprees will serve up production assets
      app.use(express.static('./client/build'));
    
    
    }
   
    
  });

 


app.use(cors())
  
app.use('/api/feedbacks',feedbackRoute);