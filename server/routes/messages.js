import { Router } from 'express';
import MessageController from '../controllers/messages';
import verifyToken from '../middleware/auth';
import { messageValidate } from '../middleware/validations';

const router = Router();

router.get('/', verifyToken, MessageController.userMessages);
router.get('/unread', verifyToken, MessageController.unread);
router.get('/sent', verifyToken, MessageController.sentMsg);
router.get('/draft', verifyToken, MessageController.draft);
router.get('/:id', verifyToken, MessageController.message);
router.post('/reply/:messageId', verifyToken, messageValidate, MessageController.replyMessage);

router.post('/', verifyToken, messageValidate, MessageController.createMessage);
router.delete('/:messageId', verifyToken, MessageController.moveToTrash);
router.get('/unread/messages', MessageController.allUnread);
router.get('/draft/messages', MessageController.allDrafts);
router.get('/read/messages', MessageController.allRead);
router.get('/public/:id', MessageController.singlePublicMsg);

export default router;
