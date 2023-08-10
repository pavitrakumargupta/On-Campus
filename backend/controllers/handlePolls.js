const Polls = require("../model/pollModel");


module.exports.createPoll = async (req, res, next) => {
    try {
      const newPoll=req.body
      let createdBy=req.user
      newPoll.createdBy=createdBy
      const createPoll=await Polls.create(newPoll)
      return res.json(createPoll);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };

  module.exports.getAllPolls = async (req, res, next) => {
    try {
      const AllPolls=await Polls.find().populate("createdBy", "name profilePitchure");
      if(AllPolls.length>0){
        return res.status(200).json(AllPolls);
      }
      return res.status(200).json(AllPolls);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };

// Assuming you have already defined 'Polls' model and other necessary dependencies

// Assuming you have already defined 'Polls' model and other necessary dependencies

// Assuming you have already defined 'Polls' model and other necessary dependencies

module.exports.editPollVotes = async (req, res) => {
  try {
    const { pollId,oldOptionId, newOptionId } = req.body;
    const userId = req.user._id;

    // Fetch the poll document from the database
    const poll = await Polls.findById(pollId);

    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }

    // Find the old and new option objects in the 'options' array
    const oldOption = oldOptionId ? poll.options.find((option) => option._id.toString() === oldOptionId) : null;
    const newOption = poll.options.find((option) => option._id.toString() === newOptionId);

    // If oldOptionId is provided, check if the user has voted for the old option
    const userVote = poll.totalVotes.find((vote) => vote.user.toString() === userId.toString());

    // if (!userVote) {
    //   return res.status(400).json({ msg: 'You have not voted for the old option' });
    // }

    // if (oldOptionId && (oldOption===null || !poll.totalVotes.some((vote) => vote.user.toString() === userId && vote.optionId === oldOptionId))) {
    //   return res.status(400).json({ msg: 'You have not voted for the Yet' });
    // }

    // If oldOptionId is provided, remove the user's vote from the old option
    if (userVote) {
      oldOption.votes -= 1;
      poll.totalVotes = poll.totalVotes.filter((vote) => !(vote.user.toString() === userId.toString()));
      let indexofOldVote;
      poll.options.find((key,index)=>{
        if(key._id.toString()===userVote.optionId){
          indexofOldVote=index;
        }
      })
      poll.options[indexofOldVote].vote-=1
    }
 
    // // Add the user's vote to the new option
    newOption.votes += 1;
    poll.totalVotes.push({ user: userId, optionId: newOptionId });

    // // Save the changes to the database
    await poll.save();

    return res.json(poll);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

  