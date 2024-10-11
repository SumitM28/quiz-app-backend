import express from 'express';
import { createQuiz, getQuizzes, getQuizDetails, submitQuiz } from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', verifyToken, createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/:quizId', getQuizDetails);
router.post('/submit/:quizId', verifyToken, submitQuiz);


export default router