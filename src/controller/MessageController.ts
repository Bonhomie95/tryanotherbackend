const Message = require("../database/entity/Message");

module.exports.addMessage = async (req:any, res:any, next:any) => {
  const {conversationId, message} = req.body;
  console.log(req.file)
  try {
    if(req.file=== undefined){
    const savedMessage = await Message.create({
      conversationId,
      sender: req.user.id,
      text: message,
      attachments: ""
    })
    res.status(200).json(savedMessage);
  }
  else{
    const savedMessage = await Message.create({
      conversationId,
      sender: req.user.id,
      text: message,
      attachments: req.file.originalname
    })
    res.status(200).json(savedMessage);
  }
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
}


module.exports.getMessages = async (req:any, res:any, next:any) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

