const Message = require("../model/messageModel")
const User = require("../model/userModel");
const Chat = require("../model/chatModel");


const allMessages =async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePitchure email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
     
  }
};


const sendMessage =async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name profilePitchure")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profilePitchure email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

module.exports = { allMessages, sendMessage };