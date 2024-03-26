import express from 'express';
import {
  createMessageAction,
  getMessageByIdAction,
  getAllMessagesAction,
  updateMessageAction,
  deleteMessageAction,
} from '@/controller/messageController';

const eventRouter = express.Router();

eventRouter.get('/messages', getAllMessagesAction);

eventRouter.get('/messages/:id', getMessageByIdAction);

eventRouter.post('/messages', createMessageAction);

eventRouter.put('/messages/:id', updateMessageAction);

eventRouter.delete('/messages/:id', deleteMessageAction);

export default eventRouter;
