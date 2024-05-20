import * as express from 'express';
import * as path from 'path';
import * as bodyParser from"body-parser";
import routes from './routes/index';
import db from './routes/db';
const fs = require('fs');
const PDFParser = require('pdf-parse');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//开放静态资源
app.use(express.static(path.join(__dirname, 'upload')));

app.use(routes)





//app.set('port', process.env.PORT || 3000);
//app.get("/", (req, res) => {
//    res.sendFile(path.join(__dirname, "views", "index.html"));
//})
app.listen(8080, () => {
    console.log("http://127.0.0.1:8080");
});