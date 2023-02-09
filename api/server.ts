import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();

// Setup CORS to allow all origins
app.use(cors());

// Setup body-parser to parse JSON from the request sent by the form
const jsonParser = bodyParser.json();

// Setup nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SENDER_EMAIL',
    pass: 'SENDER_APP_PASSWORD',
  },
});

// Setup a route to test the server
app.get('/api', (_, res: Response) => {
  res.json({ success: true, message: 'Hello World' });
});

// Setup a route to send emails
app.post('/api/sendmail', jsonParser, async (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Sending mail from: ${name} (${email}) and message: ${message}`);

  await transporter.sendMail({
    sender: name,
    from: email,
    to: 'RECEIVER_EMAIL',
    replyTo: email,
    subject: `Nytt mail från ${name}. ${name} vill dig något!`,
    text: message,
  });

  res.json({ success: true });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
