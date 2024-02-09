import sgMail from "@sendgrid/mail";
import { Template1 } from "../Custom_Templates/Template1.js";
import { Template2 } from "../Custom_Templates/Template2.js";
import { Template3 } from "../Custom_Templates/Template3.js";

//Body
// {
//   "toEmail": "soumik890@gmail.com",
//   "fromEmail": "kinneraharish09@gmail.com",
//   "subject": "Test Twilio",
//   "text": "Hello From mail seuvice",
//   "message": "Hello from Json body",
//   "receiverName": "Soumik",
//   "templatedId":1
// }

export const sendMail = async (data, callback) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const { toEmail, fromEmail, subject, text, message, templatedId } = data;

  if (
    !toEmail &&
    !fromEmail &&
    !subject &&
    !text &&
    !message &&
    !templatedId &&
    !receiverName
  )
    return callback(
      null,
      "Enter All Required Fields (receiverName, toEmail, fromEmail, subject, text, message, templatedId)*"
    );

  let TemplateOutput =
    templatedId == 1
      ? Template1(data)
      : templatedId == 2
      ? Template2(data)
      : templatedId == 3
      ? Template3(data)
      : Template1(data);

  const msg = {
    to: `${toEmail}`,
    from: `${fromEmail}`,
    subject: `${subject}`,
    text: `${text}`,
    html: TemplateOutput,
  };

  sgMail.send(msg).then(
    (res) => {
      console.log(res);
      return callback(null, `mail sent to ${data?.toEmail}`);
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }

      return callback(error);
    }
  );
};
