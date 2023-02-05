// importing Questions Model(Schema)
const Questions = require("../models/questionModel");

// importing Option Model(Schema)
const Option = require("../models/OptionsModel");

module.exports.getQuestions = async function (req, res) {
  try {
    let ans = await Questions.find({}).populate("options");
    return res.status(200).json(ans);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

// Function To create a question Object
module.exports.createQuestion = async function (req, res) {
  try {
    // creating the questions Object for Each Question in Body
    for (let title of req.body.title) {
      await Questions.create({ title });
    }
    // returning the resoponse On successfully creating Questions
    return res.status(200).json({
      message: "Hey! question created succesfully!",
    });
  } catch (err) {
    // Return error, If the error Occurred!
    return res.status(465).json({
      message: "Sorry! Error Occurred in creating a questions",
      error: err.message,
    });
  }
};

//Function To delete a question object from database
module.exports.deleteQuestion = async function (req, res) {
  try {
    // finding the particular Question Bi Id
    const question = await Questions.findById(req.params.id);
    // Before deleting the question, Firstly, delete All related Options.
    for (let id of question.options) {
      let option = await Option.findById(id);
      // Firstly, Check if Options.votes==0
      // If Not then DOn't delete question
      // Else delete questions
      if (option.votes > 0) {
        return res.status(401).json({
          message: "Sorry! Option cannot be deleted!",
        });
      }
      // Delete the option from database
      await option.remove();
    }
    // After successfully deleting All options related to question
    // Then delete question
    await question.remove();
    // sending response
    return res.status(200).json({
      message: "Hey! question deleted succesfully!",
    });
  } catch (err) {
    // checking for error
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

// Function To get the particular question and it’s options
module.exports.getQuestionDetails = async function (req, res) {
  try {
    // finding the question and populating the question with options
    const question = await Questions.findById(req.params.id).populate(
      "options"
    );
    // returning the response
    return res.status(200).json(question);
  } catch (err) {
    // checking for the errors
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
