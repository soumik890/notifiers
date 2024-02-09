import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import cors from "cors";
import { v4 } from "uuid";
import { sendMail } from "./Helpers/sendGrid.js";
import { sendMessage } from "./Helpers/twilioSMS.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

let PORT = process.env.PORT || 8000;

const conection_string = process.env.MONGO_URL;
const databaseName = process.env.DBNAME;
let database;

app.listen(PORT, () => {
  MongoClient.connect(conection_string, (error, client) => {
    database = client.db(databaseName);
    console.log("Mongo Connected and server running", PORT);
  });
});

app.get("/", (req, res) => {
  res.send("helo from express server from svelte");
});

app.post("/mail", async (req, res) => {
  console.log("mail hit");
  try {
    await database.collection(process.env.DBNAME).insertOne(
      {
        id: v4(),
        type: "email",
        toEmail: req.body.toEmail,
        fromEmail: req.body.fromEmail,
        subject: req.body.subject,
        text: req.body.text,
        message: req.body.message,
        templatedId: req.body.templatedId,
        receiverName: req.body.receiverName,
      },
      function (error, response) {
        if (error) {
          res.status("Error in Addition");
        } else {
          sendMail(req?.body, (err, result) => {
            if (err) {
              res.status(200).send([{ data: err }]);
            } else {
              console.log(result);
              res.send(result);
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(400).send("Error in adding");
  }
});

app.post("/message", async (req, res) => {
  console.log("maessage hit");
  try {
    await database.collection(process.env.DBNAME).insertOne(
      {
        id: v4(),
        type: "sms",
        fromNumber: req.body.fromNumber,
        toNumber: req.body.toNumber,
        message: req.body.message,
        receiverName: req.body.receiverName,
        messageId: req.body.messageId,
      },
      function (error, response) {
        if (error) {
          res.status("Error in Addition");
        } else {
          sendMessage(req?.body, (result) => {
            console.log(result);
            res.send(result);
          });
        }
      }
    );
  } catch (error) {
    res.status(400).send("Error in adding");
  }
});

app.get("/getAllnotifications", async (req, res) => {
  database
    .collection(process.env.DBNAME)
    .find({})
    .toArray((err, result) => {
      if (err) res.status(400).send("Error in get-All");
      res.status(201).send(result);
    });
});
app.get("/getnotification/:id", async (req, res) => {
  await database
    .collection(process.env.DBNAME)
    .find({ _id: ObjectId(req.params.id) })
    .toArray((err, result) => {
      if (err) res.status(400).send("Error in get by id");
      res.status(201).send(result);
    });
});
