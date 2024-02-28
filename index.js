import express from "express";
import bodyParser from "body-parser";
import qr from 'qr-image';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('view engine', 'ejs');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
const input_text = req.body["qr-generator"];

  // Generate QR code using the input text and overwrite the existing image file
const qr_svg = qr.svgObject(input_text,{size:"200"});
  
  console.log(qr_svg);

  res.render(__dirname + "/public/submit.ejs", {qr_svg: qr_svg});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});