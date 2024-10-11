import QuizModel from "../models/QuizModel.js";
import QuestionModel from "../models/QuestionModel.js";
import createError from "../utils/Error.js";
import ResultModel from "../models/ResultModel.js";


// create quiz
export const createQuiz = async (req, res, next) => {
  const { title, description, questions } = req.body;
  try {
    // validation
    if (!title) {
      return next(createError(400, "title is required"));
    }
    if (!description) {
      return next(createError(400, "description is required"));
    }
    if (!questions) {
      return next(createError(400, "questions is required"));
    }

    const newQuiz = new QuizModel({ title, description, questions });
    await newQuiz.save();
    res
      .status(201)
      .json({ success: true, message: "Quiz created successfully", newQuiz });
  } catch (err) {
    return next(createError(500, "Error in Quiz Creation"));
  }
};


// get all quizzes
export const getQuizzes = async (req, res,next) => {
    try {
        const quizzes = await QuizModel.find().populate('questions');
        res.status(200).json({
            status:true,
            message:'Getting all quizzes successfully',
            quizzes
        });
    } catch (err) {
        return next(createError(500, "Error in All Quiz Getting"));
    }
}; 

// get details of specific quiz
export const getQuizDetails = async (req, res,next) => {
    try {
        const quiz = await QuizModel.findById(req.params.quizId).populate('questions');
        if (!quiz){
            return next(createError(404,'Quiz not found'))
        }
        res.status(200).json({
            status:true,
            message:'Quiz getting successfully',
            quiz
        });
    } catch (err) {
        return next(createError(500, "Error in Quiz Getting"));
    }
};

// submit the quiz
export const submitQuiz = async (req, res,next) => {
    const quizId = req.params.id;
    const { answers } = req.body; // { answers: [{ questionId, selectedOptionIndex }] }
    try {

        if(answers.length==0){
            return next(createError(500,'Answers are required'));
        }
        
        let score = 0;
        const quiz = await QuizModel.findById(quizId).populate('questions');

        // Check each answer
        for (const answer of answers) {
            const question = await QuestionModel.findById(answer.questionId);
            if (question && (question?.correctOption === answer?.selectedOption)) {
                score++;
            }
        }

        const totalQuestions = quiz?.questions?.length;
        const result = { score, totalQuestions };
        res.status(200).json({ 
            status:true,
            message:'getting score successfully',
            result
         });
    } catch (err) {
        return next(createError(500, "Error in Submit Answers"));
    }
};

