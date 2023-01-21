const express = require('express');

const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

// web server
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json()); // middleware

// homepage
app.get('/', (req, res) => {
  res.send("Append URL with '/getfile' to get response");
});

// create the text file with timestamp-------------post rquest---------------------
function postReq() {
  app.post('./createfile', (req, res) => {
    // current date with time

    let timestamp = Date.now();

    const dateObject = new Date();
    var date = `0${dateObject.getDate()}`.slice(-2);
    var month = `0${dateObject.getMonth() + 1}`.slice(-2);
    var year = dateObject.getFullYear();
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();
    var seconds = dateObject.getSeconds();
    var dateTime = `${date}.${month}.${year}--${hours}.${minutes}.${seconds}`;

    fs.writeFile(`./${dateTime}.txt`, `${timestamp}`, (err) => {
      if (err) throw err;
      console.log('File has been created');
    });
    res.send(`Your text file ${dateTime}.txt is created`);
  });
}

// retrieves all text files--------------get request--------------------
var path = require('path');

function getReq() {
  app.get('./getfile', (req, res) => {
    fs.readdir('./filesystem', (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        if (path.extname(file) === '.txt') {
          console.log(`The text file is:${file}`);

          fs.readFile(file, 'utf-8', (err, data) => {
            console.log(`${file} content is: ${data}`);
          });
        }
      });
    });

    res.send(`We have retrived all the text files.`);
  });
}

app.listen(port, (err) => {
  console.log(`web server started in the port ${process.env.PORT}.`);
  postReq();
  getReq();
});


