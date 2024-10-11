import QuestionModel from "../models/QuestionModel.js";
import createError from "../utils/Error.js";

// Create a new question
export const createQuestion = async (req, res, next) => {
  const { questionText, options, correctOption } = req.body;
  try {
    
    if (!questionText) {
      return next(createError(400, "question text is required"));
    }
    if (!options) {
      return next(createError(400, "options is required"));
    }
    if (!correctOption && correctOption !=0) {
      return next(createError(400, "correct option is required"));
    }

    
    const newQuestion = new QuestionModel({
      questionText,
      options,
      correctOption,
    });
    const savedQuestion = await newQuestion.save();

    console.log(savedQuestion )
    res.status(201).json({
      status: true,
      message: "Question created successfully",
      question: savedQuestion,
    });
  } catch (err) {
    return next(createError(400, "Error in create question"));
  }
};

// Get all questions for a quiz
export const getQuestion = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.questionId);
    res.status(200).json({
      status: true,
      message: "Getting questions successfully",
      question,
    });
  } catch (err) {
    return next(createError(400, "Error in get question"));
  }
};
// Get all questions for a quiz
export const getQuestions = async (req, res, next) => {
  try {
    const questions = await QuestionModel.find({})
    res.status(200).json({
      status: true,
      message: "Getting questions successfully",
      questions,
    });
  } catch (err) {
    return next(createError(400, "Error in get question"));
  }
};

// Update a question
export const updateQuestion = async (req, res, next) => {
  const { questionText, options, correctOption } = req.body;

  try {
    // Validate the input
    if (!questionText) {
      return next(createError(400, "question text is required"));
    }
    if (!options) {
      return next(createError(400, "options is required"));
    }
    if (!correctOption && correctOption !=0) {
      return next(createError(400, "correct option is required"));
    }

    // Find and update the question
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      req.params.questionId,
      { questionText, options, correctOption },
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return next(createError(404, "Question not found."));
    }

    res.status(200).json({
      status: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (err) {
    return next(createError(500, "Error in question update"));
  }
};

// Delete a question
export const deleteQuestion = async (req, res, next) => {
  try {
    await QuestionModel.findByIdAndDelete(req.params.questionId);

    res
      .status(200)
      .json({ status: true, message: "Question deleted successfully" });
  } catch (err) {
    return next(createError(400, "Error in delete question"));
  }
};
