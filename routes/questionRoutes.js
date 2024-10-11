import express from 'express';
import { createQuestion,getQuestion, getQuestions, updateQuestion, deleteQuestion } from "../controllers/questionController.js"
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


// Question Routes
router.post('/', verifyToken, createQuestion); 
router.get('/:questionId', getQuestion);
router.get('/questions', getQuestions);
router.put('/:questionId', verifyToken, updateQuestion); 
router.delete('/:questionId', verifyToken, deleteQuestion); 

export default router