// Import Option Model(Schema)
const Option = require("../models/OptionsModel");

// To Import Questions Model(Schema)
const Questions = require("../models/questionModel");

//Function to add Option to Question
module.exports.addOption = async function (req, res) {
  try {
    // Fetching the Question of particular Id from database
    const question = await Questions.findById(req.params.id);
    for (let option of req.body.options) {
      // Create the option object in database
      const currOption = await Option.create({
        text: option,
      });
      // Adding dynamic vote lik into option
      currOption.link_to_vote =
        "http://" +
        req.headers.host +
        "/options/" +
        currOption.id +
        "/add_vote";
      currOption.save();
      // After saving the option then push it to questions.ptions Array
      question.options.push(currOption.id);
      question.save();
    }
    // return the response
    return res.status(200).json({
      message: "option added succesfully",
    });
  } catch (err) {
    // checking for error
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

//Function to delete an option
module.exports.deleteOption = async function (req, res) {
  try {
    // finding the particular option by Id
    const option = await Option.findById(req.params.id);
    // checking whether it contains any vote or not
    // If vote>0 then don't delete it.
    if (option.votes > 0) {
      return res.status(401).json({
        message: "You cannot delete that vote",
      });
    }
    // finding the question by Id and updating it
    // Remove the option Id from Question
    await Questions.updateOne(
      { options: { $in: req.params.id } },
      { $pull: { options: { $eq: req.params.id } } }
    );
    // deleting the particular option
    await option.remove();
    // After successfully deleting, return the response
    return res.status(200).json({
      message: "option deleted succesfully!",
    });
  } catch (err) {
    // if error occured return
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

//Function To increment the count of votes into database
module.exports.incrementVotes = async function (req, res) {
  try {
    // finding the particular option by Id
    const option = await Option.findById(req.params.id);
    // incrementing the votes and saving it
    option.votes += 1;
    await option.save();
    // returning the response after successfully incrementing votes
    return res.status(200).json({
      message: "vote added",
      votes: option.votes,
    });
  } catch (err) {
    // returning error if Occured
    res.status(465).json({
      message: "could not increment the count: Something went Wrong!!",
      err: "internal server error",
    });
  }
};
