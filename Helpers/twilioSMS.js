import twilio from "twilio";
import { Message1 } from "../Custom_Messages/Message1.js";
import { Message2 } from "../Custom_Messages/Message2.js";
import { Message3 } from "../Custom_Messages/Message3.js";

// BODY
// {
//   "fromNumber": "+14302592757",
//   "toNumber": "+919132620361",
//   "message": "Hello from Message body",
//   "receiverName": "Soumik",
//   "messageId": 1
// }

export const sendMessage = async (data, callback) => {
  const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

  const { receiverName, message, toNumber, fromNumber, messageId } = data;

  if (!toNumber && !fromNumber && !message && !messageId && !receiverName)
    return callback(
      null,
      "Enter All Required Fields (receiverName, toEmail, fromEmail, subject, text, message, templatedId)*"
    );

  let MessageOutput =
    messageId == 1
      ? Message1(data)
      : messageId == 2
      ? Message2(data)
      : messageId == 3
      ? Message3(data)
      : Message1(data);

  client.messages
    .create({
      body: MessageOutput,
      to: `${data.toNumber}`,
      from: `${data.fromNumber}`,
    })
    .then((message) => {
      console.log(message.sid);
      return callback(message);
    });
};
