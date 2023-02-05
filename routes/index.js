// requiring express
const express = require("express");

// import questionControllers
const questionController = require("../controllers/questionControllers");

// import optionContronllers
const optionsController = require("../controllers/optionControllers");

// router initialized
const router = express.Router();

//handling route for creating a quetions
router.post("/questions/create", questionController.createQuestion);

// To handle route for creating options
router.post("/questions/:id/options/create", optionsController.addOption);

// To Handle route for deleting an question
router.get("/questions", questionController.getQuestions);
router.get("/questions/:id/delete", questionController.deleteQuestion);

// To handle route for deleting  an options
router.get("/options/:id/delete", optionsController.deleteOption);

// To handle route for increaing the vote for an option
router.get("/options/:id/add_vote", optionsController.incrementVotes);

// adding a route for getting the details of a particular question
router.get("/questions/:id", questionController.getQuestionDetails);

// exporting router
module.exports = router;
