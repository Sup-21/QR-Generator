import express from "express";
import bodyParser from "body-parser";
import qr from 'qr-image';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Initialize the text and image filenames
const textFilename = __dirname + "/public/url.txt";
const imageFilename = __dirname + "/public/qr_img.png";

// Check if the text file exists, if not, create it
if (!fs.existsSync(textFilename)) {
  fs.writeFileSync(textFilename, '');
}

app.post("/submit", (req, res) => {
  const input_text = req.body["qr-generator"];

  // Save input text to the text file
  fs.writeFile(__dirname + `/public/url.txt`, input_text, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  // Generate QR code using the input text and overwrite the existing image file
  const qr_svg = qr.image(input_text, { type: 'png' });
  qr_svg.pipe(fs.createWriteStream(imageFilename));

  res.send(`<h1>QR Generator</h1><img src="/qr_img.png" alt="QR Code">`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
