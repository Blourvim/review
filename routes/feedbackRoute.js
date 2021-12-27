import express from 'express';
import {createFeedback, getFeedbacks,updateFeedback,deleteFeedback} from '../controllers/feedbackControllers.js';
const feedbackRouter = express.Router()


feedbackRouter.get('/',getFeedbacks);
feedbackRouter.post('/',createFeedback);
feedbackRouter.put('/:_id',updateFeedback);
feedbackRouter.delete('/:_id',deleteFeedback);


export default feedbackRouter;